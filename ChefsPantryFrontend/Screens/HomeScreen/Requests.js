
const ing_url = "http://10.0.2.2:3000/recipes/ingredients?";

const id_url = "http://10.0.2.2:3000/recipes/id/";

function queryRecipe(ingredients) {

    let queryString = "";
    
    ingredients.forEach(element => {
        queryString += "ing=" + element + "&";
    });

    return fetch(ing_url + queryString).then((response) => response.json())
    .catch((error) => {
        console.log(error);
    });


}


function queryById(recipeId) {
    return fetch(id_url + recipeId).then(response => response.json())
    .catch(error => console.log(error));
}



export default { queryRecipe, queryById };