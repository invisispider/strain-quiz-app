## SCRAPING cannaconnection.com

### Installing the Scrape Environment

Since the scrape has already been performed, you do not need to complete this step.

This is just a basic python virtual environment set up.
We will use this script to get strain data from www.cannaconnection.com.

`cd` into your scraper project folder and create a virtual environment:
`python3 -m venv ./`

activate the environment: 
`source bin/activate`

Install the required python libraries:
`pip3 install -r requirements.txt`

### Scraping All Strain Names

This step is already completed. Follow this procedure to refresh the strain names with updated data.

Use `python3 get_strain_list.py` to get the proper urls for all strains into `full_strain_list.csv`. 

Note: There are some inconsistencies in their url scheme, so a few of them will be skipped because I didn't care to manually check every strain name. 

Note: I also avoided autoflowering strains.

### Scraping Each Strain For Parentage Data

This step is already completed. Follow this procedure to refresh the parents data.

Run `python3 scrape_strains.py` to go to each strain url and add strain data to `strain_parents_database.csv`.

The scrape will try not to overload the server and get connection refused error, but I'm only guessing the server quotas, so it may have to be run repeatedly until the Python script outputs "Scrape completed". 

After succesfully scraping all the data, our csv file will serve as a database source for the quiz app.

### We Have Now Scraped Or Updated the Quiz App Data. Star this repo.