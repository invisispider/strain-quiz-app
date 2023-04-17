import csv
import requests
import time

# import requests
# import string
# import csv
from bs4 import BeautifulSoup
# import re

file = open('full_strain_list.csv', 'r')
data = list(csv.reader(file, delimiter=","))
file.close()
data = data.pop()

# ITERATE THROUGH STRAINS FROM CSV AND GATHER DATA
for strain in data:
	try:
		r = requests.get('https://www.cannaconnection.com/strains/' + strain)
		# CHECK FOR BAD URLS
		if r.status_code == 404:
			print('fail strain:', strain)
		else:
			# OBTAIN STRAIN INFORMATION FROM THE DOM
			soup = BeautifulSoup(r.text, features="html.parser")

			# GET GENETICS, PARENTS, THC, CBD
			strain_data_titles = soup.select('div.extraProductFeatures > .data-sheet > .feature-wrapper > .feature-title')
			strain_data_data = soup.select('div.extraProductFeatures > .data-sheet > .feature-wrapper > .feature-value')
			res = {strain_data_titles[i].text.strip(): strain_data_data[i].text.strip() for i in range(len(strain_data_titles))}
			# print(str(res))

			# GET FLAVOR AND EFFECT
			strain_data_multis = soup.select('div.extraProductFeatures > .data-sheet > .multifeature-wrapper')
			for strain_multi_container in strain_data_multis:
				strain_multi_title = strain_multi_container.select('.feature-title')
				# print('TITLE', strain_multi_title[0].text.strip())
							# .replace('&amp', '&'))
				strain_multi_datas = strain_multi_container.select('.feature-value')			
				multi_data_list = []
				for datum in strain_multi_datas:
					multi_data_list.append(datum.text.strip())
				# print('DATA', multi_data_list)
				res[strain_multi_title[0].text.strip()] = multi_data_list
			
			print(str(res))
			exit()

	except requests.exceptions.ConnectionError as e:
		print(e)
		r = "No Response. Quota exceeded."
		print(r)

	time.sleep(5)


	# INSTEAD OF EXITING AFTER FIRST ITERATION...
	# NOTE: NEED TO GRAB MULTIPLE FIELDS FROM THE PARENTS SECTION.
	# WE WANT TO ADD TO A PANDAS DATAFRAME ? AND NOT DESTROY
	# IT IF FAILS.
	# STEPS:
	# CREATE APP FOLDER FOR THE KIVU APP/GUI
	# CREATE SQLITE DB IN APP FOLDER
	# AS DATA COMES IN, CHECK IF ALREADY IN DB
	# POPULATE ALL DATA TO DB AND GIVE MESSAGE WHEN SUCCESS
	# CREATE BUILD FOLDER IN APP FOLDER FOR THE FINISHED APP
	exit()


# 1. div.extraProductFeatures > div.data-sheet > 
		# div.feature-wrapper ... 
		# div.mutifeature-wrapper ...

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



