from base_scraper import BaseScraper, BeautifulSoup, requests

url = "https://www.thewholesomedish.com/category/entree/page/2/"
recipe_link_class = "entry-title-link"



def recipe_parser(soup):

    recipe_dict = {}
    recipe_dict["recipe"] = {}

    recipe_container = "wprm-recipe-container" 
    recipe_name = "wprm-recipe-name"
    recipe_summary = "wprm-recipe-summary"
    recipe_total_minutes = "wprm-recipe-total_time-minutes"
    recipe_total_hours = "wprm-recipe-total_time-hours"
    recipe_ingredients = "wprm-recipe-ingredient-name"

    recipe = soup.find(class_=recipe_container)
    recipe_dict["recipe"]["title"] = recipe.find(class_=recipe_name).string

    if recipe.find(class_=recipe_summary).find("span"):
        recipe_dict["recipe"]["description"] = recipe.find(class_=recipe_summary).find("span").string
    else:
        recipe_dict["recipe"]["description"] = recipe.find(class_=recipe_summary).string
    
    recipe_dict["recipe"]["minutes"] = recipe.find(class_=recipe_total_minutes).string
    
    try:
        recipe_dict["recipe"]["hours"] = recipe.find(class_=recipe_total_hours).string
    except AttributeError:
        recipe_dict["recipe"]["hours"] = "0"

    ingredients = recipe.find_all(class_=recipe_ingredients)
    recipe_dict["recipe"]["ingredients"] = []

    for i in ingredients:
        recipe_dict["recipe"]["ingredients"].append(i.string.lower())
    
    return recipe_dict
    
if __name__ == "__main__":
    # page = requests.get("https://www.thewholesomedish.com/creamy-crock-pot-pork-chops-potatoes-onions/")
    # soup = BeautifulSoup(page.content, "html.parser")
    # d = recipe_parser(soup)
    # print(d)
    scraper = BaseScraper(url, recipe_link_class, recipe_parser, "The Wholesome Dish")
    scraper.scrape("recipe_jsons/wholesomedish.txt")
