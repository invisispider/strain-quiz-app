import requests
import string
import csv
from bs4 import BeautifulSoup
import re

# USE STRING MODULE TO GET ALPHABET
alphabet = list(string.ascii_lowercase)

# ADD NUMBERS TO LIST
alphabet.append('0-9')

# CONCAT ALPHABET AND 0-9 TO BASE URL 
base_url = 'https://www.cannaconnection.com/strains?show_char='

def format_url_string(url_string):
	url_string = url_string.lower().replace('2.0','2').replace(' - ', '-')
	url_string = re.sub(r"\s|'|‘|’", "-", url_string)
	url_string = re.sub(r"\.|\(|\)", "", url_string)
	# MANUAL REPLACE BAD URLS FROM SCRAPE OUTPUT 404s
	url_string = url_string.replace('auto-mazar', 'automazar') \
		.replace('auto-new-york-city','auto-new-york-diesel')   \
		.replace('-+','').replace('+','-plus') \
		.replace('crockett-s','crocketts').replace('--','-') \
		.replace('gsc','girl-scout-cookies').replace('a1', 'a-1') \

	return url_string

full_strain_list = []

# GO TO EACH PAGE OF THE ALPHABET AND GET STRAIN NAMES
for character in alphabet:
	page_url = base_url + character
	r = requests.get(page_url)
	soup = BeautifulSoup(r.text, features="html.parser")
	strains_list = soup.find('ul', class_="strains-list")
	li_items = strains_list.find_all('li')
	strain_list_of_character = []
	for li in li_items:
		a_tag = li.find('a')
		strain_string = a_tag.text
		if not 'autoflower' in strain_string.lower():
			formatted_url_string = format_url_string(strain_string)
			if formatted_url_string != '':
				strain_list_of_character.append(formatted_url_string)
	full_strain_list.extend(strain_list_of_character)

# WRITE STRAIN LIST TO CSV FILE
with open('full_strain_list.csv', 'w', newline='') as my_file:
	wr = csv.writer(my_file, quoting=csv.QUOTE_ALL)
	wr.writerow(full_strain_list)
