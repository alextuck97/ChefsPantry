const express = require("express");
const { ObjectId } = require("mongodb");

var router = express.Router();

const MAX_INGREDIENT_QUERY = 5;

// Get recipe from mongodb id
router.get('/id/:id', function(request, response) {
    
    let id = request.params.id;
    request.dbCollection.findOne({_id : ObjectId(id)}).then((result) => {
        
        if(result === null){
            response.status(404);
        }

        response.json(result);
    })
    .catch((error) => {
        response.status(400);
        console.log(error);
    })
})

// Get recipes matching query. 
// Ex. /ingredients?ing=black pepper&ing=beef
router.get('/ingredients', function(request, response) {
    
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
        request.dbCollection.find({"recipe.ingredients" : {$all : ingredients}}).toArray()
        .then((result) => {
            if(result === null)
            {
                response.json({message : "No recipes match query",
                                query : ingredients});
            }else {
                response.json(result);
            }
        })
        .catch((error) => {
            response.status(400);
            console.log(error);
        })
    }
})




module.exports = router;