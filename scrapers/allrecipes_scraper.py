from base_scraper import BaseScraper, BeautifulSoup, requests
import string, re


def recipe_parser(soup):

    recipe_dict = {}
    recipe_dict["recipe"] = {}

    recipe_content_class = "recipe-content two-col-content karma-main-column"
    recipe_title_class = "headline heading-content"
    recipe_summary_class = "recipe-summary margin-8-bottom"

    recipe_meta_class = "recipe-meta-container two-subcol-content clearfix"
    recipe_meta_item = "recipe-meta-item"

    ingredient_class = "ingredients-item-name"

    recipe = soup.find(class_=recipe_content_class)

    try:
        title = recipe.find(class_=recipe_title_class).string
    except AttributeError:
        title = " NULL "
    recipe_dict['recipe']['title'] = title

    try:
        summary = recipe.find(class_=recipe_summary_class).find(class_="margin-0-auto").string
    except AttributeError:
        summary = ""
    recipe_dict['recipe']['description'] = summary

    # Should be total time
    try:
        total_time = recipe.find(class_=recipe_meta_class).find_all(class_=recipe_meta_item)[2]
        total_time = total_time.find(class_="recipe-meta-item-body").string.strip()
        total_time = total_time.split()
        if len(total_time) == 4:
            recipe_dict['recipe']['hours'] = total_time[0]
            recipe_dict['recipe']['minutes'] = total_time[2]
        else:
            recipe_dict['recipe']['hours'] = '0'
            recipe_dict['recipe']['minutes'] = total_time[0]
    except:
        recipe_dict['recipe']['hours'] = '0'
        recipe_dict['recipe']['minutes'] = '0'

    ingredients = recipe.find_all(class_=ingredient_class)

    ingredient_list = []
    for i in ingredients:

        try:
            ing = i.string.strip()
            ing = re.sub("[\(\[].*?[\)\]]", "", ing)
            ing = " ".join(ing.split())
        except:
            ing = ""
        ingredient_list.append(ing.lower())

    recipe_dict['recipe']['ingredients'] = ingredient_list

    return recipe_dict

if __name__ == "__main__":
    url = "https://www.allrecipes.com/recipes/14862/everyday-cooking/cooking-for-two/lunch/?internalSource=hub%20nav&referringId=476&referringContentType=Recipe%20Hub&linkName=hub%20nav%20daughter&clickId=hub%20nav%202&page="
    recipe_link_class = "fixed-recipe-card__title-link"

    for i in range(2,15):
        print("Scraping " + url + str(i))
        scraper = BaseScraper(url + str(i), recipe_link_class, recipe_parser, "Allrecipes", recipe_link_tag="a")
        scraper.scrape("scraped_jsons/allrecipes/allrecipes_quarantinecooking_" + str(i) + ".txt")