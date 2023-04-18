import csv
import requests
import time
import requests
from bs4 import BeautifulSoup
import pandas as pd
import os


# WRITE HEADERS TO CSV IF HASN'T BEEN CREATED YET
filename = "strain_parents_database.csv"
header = ['UrlName', 'Name', 'Genetics', 'Parents', 'THC', 'CBD', 'Smell & flavour', 'Effect']
if not os.path.exists(filename):
	with open(filename, 'w', encoding='UTF8', newline='') as file:
		writer = csv.writer(file)
		writer.writerow(header)

# READ STRAINS LIST CSV (FROM SCRAPE)
with open('full_strain_list.csv', 'r') as file:
	strain_list_data = list(csv.reader(file))
	strain_list_data = strain_list_data.pop()


def strain_already_exists(strain, filename=filename):
	with open(filename, 'r') as file:
	    csvreader = csv.reader(file)
	    for row in csvreader:
	        if strain in row[0]:
	            return True
	return False

def write_strain_to_csv(data_dict, filename=filename, header=header):
	with open(filename, 'a') as file:
		writer = csv.DictWriter(file, fieldnames=header)
		print(data_dict)
		writer.writerow(data_dict)

# ITERATE THROUGH STRAINS FROM CSV AND GATHER DATA
for strain in strain_list_data:

	if strain_already_exists(strain):
		continue

	try:
		r = requests.get('https://www.cannaconnection.com/strains/' + strain)
		# CHECK FOR BAD URLS
		if r.status_code == 404:
			print('fail strain:', strain)
		
		else:
			data_dict = {}
			data_dict['UrlName'] = strain
			# OBTAIN STRAIN INFORMATION FROM THE DOM
			soup = BeautifulSoup(r.text, features="html.parser")
	
			# GET STRAIN NAME FROM H1
			strain_name = soup.select('h1').pop().text.strip()
			
			data_dict['Name'] = strain_name
		
			# GET GENETICS, PARENTS, THC, CBD IN A DOM DATA SHEET
			strain_data_sheet = soup.select('div.extraProductFeatures > .data-sheet')

			# ITERATE THROUGH ALL DATA SHEETS OF STRAIN
			for data_sheet in strain_data_sheet:
				res = {}
				# ITERATE THROUGH ALL DATA CATEGORIES
				for feature_wrapper in data_sheet.select('.feature-wrapper'):
					title = feature_wrapper.select('.feature-title').pop().text.strip()
					if ',' in title:
						continue
					value = feature_wrapper.select('.feature-value').pop().text.strip()
					res[title] = value
				for multi_feature_wrapper in data_sheet.select('.multifeature-wrapper'):
					title = multi_feature_wrapper.select('.feature-title').pop().text.strip()
					if ',' in title:
						continue
					value = []
					for val in multi_feature_wrapper.select('.feature-value'):
						anchor = val.select('a')
						if anchor:
							value.append(anchor.pop().text.strip())
						else:	
							value.append(val.text.strip())
					res[title] = value
				data_dict.update(res)

			# ADD STRAIN TO CSV
			write_strain_to_csv(data_dict)

	except requests.exceptions.ConnectionError as e:
		print(e)
		r = "No Response. Quota exceeded."
		print(r)

	# WAIT AFTER EACH FETCH SO AS NOT TO OVERLOAD THE SERVER
	time.sleep(5)

exit('Success! All strains scraped')

# EXAMPLE OF DOM LAYOUT:

# <div class="data-sheet">
	# <div class="feature-wrapper">
		# <div class="feature-title">Genetics</div>
		# <div class="feature-value">
			# Indica/sativa (50/50)
		# </div>
	# </div>
	# <div class="feature-wrapper">
		# <div class="feature-title">Parents</div>
		# <div class="feature-value">
			# <a href="/en/strains/white-widow" title="White Widow">
				# White Widow
			# </a>
		# </div>
	# </div>
	# <div class="feature-wrapper">
		# <div class="feature-title">THC</div>
		# <div class="feature-value">
			# High
		# </div>
	# </div>
	# <div class="feature-wrapper">
		# <div class="feature-title">CBD</div>
		# <div class="feature-value">
			# Unknown
		# </div>
	# </div>
	# <div class="multifeature-wrapper">
		# <div class="multi-feature-start feature-title">Smell &amp; flavour</div>
		# <div class="multi-feature feature-value first">
			# Pungent
		# </div>
		# <div class="multi-feature feature-value">
			# Sweet
		# </div>
		# <div class="multi-feature feature-value last">
			# Fruity
		# </div>
	# </div>
	# <div class="multifeature-wrapper">
		# <div class="multi-feature-start feature-title">Effect</div>
		# <div class="multi-feature feature-value first">
			# Talkative
		# </div>
		# <div class="multi-feature feature-value">
			# Energetic
		# </div>
		# <div class="multi-feature feature-value">
			# Euphoric
		# </div>
		# <div class="multi-feature feature-value">
			# Uplifting
		# </div>
		# <div class="multi-feature feature-value last">
			# Relaxed
		# </div>
	# </div>
# </div>



