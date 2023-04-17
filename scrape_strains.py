import csv
import requests
import time

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
			# OBTAIN THE INFORMATION FROM THE DOM
			

	except requests.exceptions.ConnectionError as e:
		print e
		r = "No Response. Quota exceeded."
		print (r)

	time.sleep(5)



	exit()







def get_one_strain(strain_name, base_url=base_url):
	strain_url = base_url + strain_name



spreadsheet = pd.read_csv('AZZipcodes.csv').values
# zipcode_list = []
# omg = (value for value in spreadsheet.values)
# for value in omg:
# 	for v in value:
# 		zipcode_list.append(v)

zipcode_list = {[[v for v in value] for value in omg] for omg in spreadsheet}

