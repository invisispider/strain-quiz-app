This was an attempt to get data from https://en.seedfinder.eu

You will need to register your email, then go to their API page and follow the instructions to verify your host and acquire an API key.

This is all free, but there is a 30 fetch monthly limit, which they claim is not strictly enforced.

You will also need a host. I used Github Pages, verified the hosted Page as a server, and did javascript fetches in the console.

I realized halfway through that the data was infeasible and overly extensive. 

Use the cannaconnection web scrape instead for basic lineage info on common strains.

However, if you want to scrape seedfinder, this folder is an effective guide to get all their strain names and breeder information.

The next step would be to iterate through the breeders, iterate through each strain, and fetch the parents data and any other data you want.