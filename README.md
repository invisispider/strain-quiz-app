# Python Android Quiz App

#### Test your knowledge of cannabis genetics with this

android app created with Python Kivy.

## SCRAPING THE DATABASE

### Installing the Scrape Environment

This is just a basic python virtual environment set up.
We will use this script to get strain data from www.cannaconnection.com.
If you want to skip this step, just use the data provided in `strain_data.csv`.

`cd` into your scraper project folder and create a virtual environment:
`python3 -m venv ./`

activate the environment: 
`source bin/activate`

Install the required python libraries:
`pip3 install -r requirements.txt`

### Scraping the Strain Data
Use `python3 get_strain_list.py` to the urls for all strains in a csv file which parses the strain names to the proper urls. There are some inconsistencies in their url scheme, so a few of them will be skipped because I didn't care to manually check every strain name. Note: I also avoided autoflowering strains.

Run `python3 scrape_strains.py` to go to each
strain url and add strain data to a pandas dataframe.
The scrape will try not to overload the server and
get connection refused error, but I'm only guessing. 
If succesful, it will
create the database that will serve as the source
for the quiz app.

