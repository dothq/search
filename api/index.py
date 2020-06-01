import requests
from bs4 import BeautifulSoup

GOOGLE_SEARCH_URL = "https://www.google.com/search?gbv=1&q="

r = requests.get(f'{GOOGLE_SEARCH_URL}google inc')

html = BeautifulSoup(r.text, features="html.parser")

main = html.find('div', id='main')

# [0] is <div>/div>
# [1] is <style></style>
# [2] is <div><!--SW_C_X--></div>
# [3] is sometimes 'Did you mean: '

i = 0
max = len(main)-3

print(max)

for item in main:
    i = i+1

    if i >= 4 and i <= max:
        print(f'{item}\n\n\n')

        # if "https://maps.google.com/maps" in item == False:
        #     title = item.find_all('span')[0].find('div').contents[0]
        #     url = item.find_all('span')[1].find('div').contents[0]
        #     # description = main[3].find_all('div')[-1].contents[0]

        #     print(title, url)