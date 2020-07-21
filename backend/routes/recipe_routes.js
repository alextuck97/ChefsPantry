const express = require("express");
const { ObjectId } = require("mongodb");

var router = express.Router();

const MAX_INGREDIENT_QUERY = 5;

// Get recipe from mongodb id
router.get('/id/:id', async function(request, response) {
    
    let id;
    try {
        id = ObjectId(request.params.id);
        
        request.dbCollection.findOne({_id : id}).then((result) => {
            
            if(result === null){
                response.json({error : `${request.params.id} not found`});
            }else{
                response.json(result);
            }

            
        })
        .catch((error) => {
            response.status(400);
            response.json({name : error.name, error : error.message});
            console.log(error);
        })
    } catch (error) {
        response.status(400);
        response.json({name : error.name, error : error.message});
        console.log(error.name + " " + error.message);
    }
    


    
})

// Get recipes matching query. 
// Ex. /ingredients?ing=black pepper&ing=beef
// Returns an object with recipe _ids as keys. 
// Each key contains the recipe title and the number
// of matched ingredients.
// {
//    "id.a" : { count : 2, title : "Mac and cheese"},
//    "id.b" : { count : 1, title : "Grilled cheese"}
//}

router.get('/ingredients', async function(request, response) {
    
    let ingredients = request.query.ing;
    
	if(typeof(ingredients) === "string"){
		ingredients = [ingredients];
	}
	
    if(ingredients === undefined){
        response.status(400);
        response.json({message : "[ERROR] : No ingredients passed"});
    }
    else if(ingredients.length > MAX_INGREDIENT_QUERY)
    {
        response.status(400);
        response.json({message : "[ERROR] : Pass 5 or less ingredients as query"});
    }
    else{
        try {
            //Start a request for each ingredient
            let queries = [];
            
            ingredients.forEach((value, index) => {
                queries[index] = request.dbCollection.find({"recipe.ingredients" : value.toLowerCase()})
                        .project({_id : 1, sitetitle : 1, "recipe.title" : 1}).toArray();
            })

            //Await all ingredient requests
            let results = await Promise.all(queries);

            let matchCounts = {};
            results.forEach((result, i) => {
                result.forEach((recipe, j) => {
                    if(matchCounts[recipe._id] === undefined){
                        matchCounts[recipe._id] = { count : 0, title : recipe.recipe.title, _id : recipe._id};
                    }
                    matchCounts[recipe._id].count += 1;
                })
            })
            
            let counts = Object.values(matchCounts);
            counts.sort((a, b) => b.count - a.count);
            response.json(counts);
        }
        catch(e) {
            response.status(400);
            console.log(e);
        }
    }
})




module.exports = router;