from bs4 import BeautifulSoup
import requests
import json

class BaseScraper:
    '''
    A plug-and-play class for all scrapers to base themselves
    on.
    '''
    def __init__(self, base_url, recipe_link_class, recipe_parser, site_title, recipe_link_tag=""):
        '''
        base_url: the page to be scraped
        recipe_link_class: the css class that marks links to recipes
            on the page
        recipe_parser: function that returns a recipe dictionary from
            a recipe page
        '''
        self.base_url = base_url
        self.recipe_link_class = recipe_link_class
        self.recipe_parser = recipe_parser
        self.recipe_link_tag = recipe_link_tag
        self.site_title = site_title

    def __get_recipe_urls(self, base_url, recipe_link_class, recipe_link_tag):
        '''
        Get a list of all recipe urls on the pag
        '''
        page = requests.get(base_url)
        soup = BeautifulSoup(page.content, 'html.parser')

        results = soup.find_all(recipe_link_tag, class_=recipe_link_class)

        urls = []

        for r in results:
            urls.append(r.get("href"))
        
        return urls
    
    def scrape(self, file_name):
        recipe_urls = self.__get_recipe_urls(self.base_url, self.recipe_link_class, self.recipe_link_tag)

        WINDOWS_LINE_ENDING = b'\r\n'
        UNIX_LINE_ENDING = b'\n'

        with open(file_name, "w") as f:
            for recipe_url in recipe_urls:
                page = requests.get(recipe_url)
                soup = BeautifulSoup(page.content, 'html.parser')
                
                try:
                    recipe_dict = self.recipe_parser(soup)
                    recipe_dict["url"] = recipe_url
                    recipe_dict["sitetitle"] = self.site_title
                    recipe_json = json.dumps(recipe_dict)
                    f.write(recipe_json + "\n")
                except Exception as e: 
                    print("UNCAUGHT EXCEPTION for", recipe_url)
                    print(e)
                
        
        with open(file_name, 'rb') as open_file:
            content = open_file.read()
        
        content = content.replace(WINDOWS_LINE_ENDING, UNIX_LINE_ENDING)

        with open(file_name, 'wb') as open_file:
            open_file.write(content)