from base_scraper import BaseScraper, BeautifulSoup, requests
import string, re

def recipe_parser_mv(soup):

    recipe_dict = {}
    recipe_dict["recipe"] = {}

    recipe_container = "mv-create-wrapper" 
    recipe_name = "mv-create-title mv-create-title-primary"
    recipe_summary = "mv-create-description"
    recipe_total_minutes = "mv-time-minutes"
    recipe_total_hours = "mv-time-hours"
    
    ingredient_container = "mv-create-ingredients"

    recipe = soup.find(class_=recipe_container)
    recipe_dict["recipe"]["title"] = recipe.find(class_=recipe_name).string

    summary = recipe.find(class_=recipe_summary).find_all('p')
    # handle case of nested objects in description
    summary = " ".join([" ".join([c.string for c in p.contents]) for p in summary])
    recipe_dict["recipe"]["description"] = summary
    
    try:
        minutes = recipe.find(class_=recipe_total_minutes).string
        recipe_dict["recipe"]["minutes"] = minutes.split()[0]
    except AttributeError:
        recipe_dict["recipe"]["minutes"] = "0"

    try:
        hours = recipe.find(class_=recipe_total_hours).string
        recipe_dict["recipe"]["hours"] = hours.split()[0]
    except AttributeError:
        recipe_dict["recipe"]["hours"] = "0"

    ingredients = recipe.find(class_=ingredient_container)
    recipe_dict["recipe"]["ingredients"] = []

    prev_header = ""
    for i in ingredients:
        
        if i.name == 'ul' and prev_header != 'Equipment':
            ing = i.find_all('li')
            
            for s in ing:
                entry = s.string.strip()
                entry = re.sub("[\(\[].*?[\)\]]", "", entry)
                entry = " ".join(entry.split())
                recipe_dict["recipe"]["ingredients"].append(entry.lower())

        elif i.name == 'h4':
            prev_header = i.string
        
    return recipe_dict

def recipe_parser_tasty(soup):

    recipe_dict = {}
    recipe_dict["recipe"] = {}

    recipe_container = "tasty-recipes" 
    recipe_name = "tasty-recipes-title"
    recipe_summary = "tasty-recipes-description"
    recipe_total_time = "tasty-recipes-total-time"
    
    ingredient_container = "tasty-recipe-ingredients"

    recipe = soup.find(class_=recipe_container)
    recipe_dict["recipe"]["title"] = recipe.find(class_=recipe_name).string

    summary = recipe.find(class_=recipe_summary).get_text()
    recipe_dict["recipe"]["description"] = summary.strip()

    time = recipe.find(class_=recipe_total_time).get_text().strip()
    time = time.split()

    if len(time) == 4:
        recipe_dict["recipe"]["minutes"] = time[2]
        recipe_dict["recipe"]["hours"] = time[0]
    elif time[1] == "hours":
        recipe_dict["recipe"]["minutes"] = "0"
        recipe_dict["recipe"]["hours"] = time[0]
    elif time[1] == "minutes":
        recipe_dict["recipe"]["minutes"] = time[0]
        recipe_dict["recipe"]["hours"] = "0"
    else:
        recipe_dict["recipe"]["hours"] = "0"
        recipe_dict["recipe"]["minutes"] = "0"


    ingredients = recipe.find(class_=ingredient_container)
    recipe_dict["recipe"]["ingredients"] = []

    prev_header = ""
    for i in ingredients.contents:
        
        if i.name == 'ul' and prev_header != 'Equipment':
            ing = i.find_all('li')
            
            for s in ing:
                entry = s.get_text().strip()
                entry = re.sub("[\(\[].*?[\)\]]", "", entry)
                entry = " ".join(entry.split())
                recipe_dict["recipe"]["ingredients"].append(entry.lower())

        elif i.name is not None:
            prev_header = i.get_text()
    
    return recipe_dict
    
if __name__ == "__main__":
    # page = requests.get("https://healthynibblesandbits.com/pineapple-buns/")
    # soup = BeautifulSoup(page.content, "html.parser")
    # d = recipe_parser_tasty(soup)
    # print(d)

    

    def return_url(page):
        return "https://healthynibblesandbits.com/page/" + str(page) + "/?s=+"
    
    recipe_link_class = "entry-title-link"

    
    for i in range(1, 25):
        print("Scraping " + return_url(i))
        scraper = BaseScraper(return_url(i), recipe_link_class, recipe_parser_tasty, "Healthy Nibbles")
        scraper.scrape("scraped_jsons/healthynibbles/healthynibbles_" + str(i) + ".txt")
    