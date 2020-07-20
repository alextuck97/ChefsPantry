from base_scraper import BaseScraper, BeautifulSoup, requests
import string, re




def recipe_parser(soup):

    recipe_dict = {}
    recipe_dict["recipe"] = {}

    recipe_container = "wprm-recipe-container" 
    recipe_name = "wprm-recipe-name"
    recipe_summary = "wprm-recipe-summary"
    recipe_total_minutes = "wprm-recipe-total_time-minutes"
    recipe_total_hours = "wprm-recipe-total_time-hours"
    
    recipe_ingredient = "wprm-recipe-ingredient"
    recipe_ingredient_amount = "wprm-recipe-ingredient-amount"
    recipe_ingredient_unit = "wprm-recipe-ingredient-unit"
    recipe_ingredient_name = "wprm-recipe-ingredient-name"

    recipe = soup.find(class_=recipe_container)
    recipe_dict["recipe"]["title"] = recipe.find(class_=recipe_name).string

    if recipe.find(class_=recipe_summary).find("span"):
        recipe_dict["recipe"]["description"] = recipe.find(class_=recipe_summary).find("span").string
    else:
        recipe_dict["recipe"]["description"] = recipe.find(class_=recipe_summary).string
    
    try:
        recipe_dict["recipe"]["minutes"] = recipe.find(class_=recipe_total_minutes).string
    except AttributeError:
        recipe_dict["recipe"]["minutes"] = "0"

    try:
        recipe_dict["recipe"]["hours"] = recipe.find(class_=recipe_total_hours).string
    except AttributeError:
        recipe_dict["recipe"]["hours"] = "0"

    ingredients = recipe.find_all(class_=recipe_ingredient)
    recipe_dict["recipe"]["ingredients"] = []

    for i in ingredients:
        try:
            amount = i.find(class_=recipe_ingredient_amount).string
        except AttributeError:
            amount = ""
        try:
            unit = i.find(class_=recipe_ingredient_unit).string
        except AttributeError:
            unit = ""
        try:
            ing = i.find(class_=recipe_ingredient_name).string
        except AttributeError:
            ing = ""
        
        entry = amount + " " + unit + " " + ing
        entry = re.sub("[\(\[].*?[\)\]]", "", entry)
        entry = " ".join(entry.split())
        recipe_dict["recipe"]["ingredients"].append(entry.lower())
    
    return recipe_dict
    
if __name__ == "__main__":
    # page = requests.get("https://www.thewholesomedish.com/creamy-crock-pot-pork-chops-potatoes-onions/")
    # soup = BeautifulSoup(page.content, "html.parser")
    # d = recipe_parser(soup)
    # print(d)

    url = "https://www.thewholesomedish.com/category/"
    recipe_link_class = "entry-title-link"

    for i in range(1, 6):
        u = url + "entree/page/" + str(i)
        print("Scraping " + u)
        scraper = BaseScraper(u, recipe_link_class, recipe_parser, "The Wholesome Dish")
        scraper.scrape("scraped_jsons/wholesomedish_entree" + str(i) + ".txt")
    
    for i in range(1, 4):
        u = url + "breakfast/page/" + str(i)
        print("Scraping " + u)
        scraper = BaseScraper(u, recipe_link_class, recipe_parser, "The Wholesome Dish")
        scraper.scrape("scraped_jsons/wholesomedish_breakfast" + str(i) + ".txt")
    
    for i in range(1, 3):
        u = url + "side-dish/page/" + str(i)
        print("Scraping " + u)
        scraper = BaseScraper(u, recipe_link_class, recipe_parser, "The Wholesome Dish")
        scraper.scrape("scraped_jsons/wholesomedish_side-dish" + str(i) + ".txt")

    for i in range(1, 2):
        u = url + "dessert/page/" + str(i)
        print("Scraping " + u)
        scraper = BaseScraper(u, recipe_link_class, recipe_parser, "The Wholesome Dish")
        scraper.scrape("scraped_jsons/wholesomedish_soup" + str(i) + ".txt")

    for i in range(1, 3):
        u = url + "dessert/page/" + str(i)
        print("Scraping " + u)
        scraper = BaseScraper(u, recipe_link_class, recipe_parser, "The Wholesome Dish")
        scraper.scrape("scraped_jsons/wholesomedish_dessert" + str(i) + ".txt")