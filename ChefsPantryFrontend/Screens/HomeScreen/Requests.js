
const url = "http://10.0.2.2:3000/recipes/ingredients?";

async function queryRecipe(ingredients) {

    let queryString = "";
    console.log(ingredients);
    ingredients.forEach(element => {
        queryString += "ing=" + element + "&";
    });

    return fetch(url + queryString).then((response) => response.json())
    .catch((error) => {
        console.log(error);
    });


}



export default queryRecipe;