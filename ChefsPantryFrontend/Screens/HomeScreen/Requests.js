

const url = "https://lncs6vy774.execute-api.us-east-1.amazonaws.com/dev"
const ing_url = "/recipes/ingredients?";

const id_url = "/recipes/id/";

function queryRecipe(ingredients) {

    let queryString = "";
    
    ingredients.forEach(element => {
        queryString += "ing=" + element + "&";
    });

    return fetch(url + ing_url + queryString).then((response) => response.json())
    .catch((error) => {
        console.log(error);
    });


}


function queryById(recipeId) {
    return fetch(url + id_url + recipeId)
    .then(response => {
        if(response.status === 200)
        {
            return response.json();
        }else {
            return { recipe : {
                            title: "Oops!",
                            description : " Something went wrong when looking up the recipe."
                        },
                     sitetitle : `Response status ${response.status}`
                    }
        }
    })
    .catch(error => console.log(error));
}



export default { queryRecipe, queryById };