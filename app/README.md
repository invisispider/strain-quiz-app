# STRAIN QUIZ APP

This is the app source in Python Kivy. 

#### Python Environment: if you want to edit. 

`python3 venv myenv`

`source venv/bin/activate`

`pip install -r requirements.txt`

#### Editing the App

It was written with the Kivy GUI framework, which includes a `main.py` file for the logic and `quiz.kv` for the Kivy layout. 

`straindata.csv` is being used as a database. The scraped data was filtered and edited.

### Building the App

I used Buildozer, which packages a Kivy app for Android.

It takes a lot of work (at least on my Arch Linux system) to configure Buildozer.

First, follow the instructions on Buildozer's web site to install dependencies and learn how to set it up with the `.spec` file.

You will need specific versions of Python, Cython, Java, Gradle, and Android SDK, and you will have to figure out how to find where they are and add them to your path, if the defaults don't work.

Check out the "NOTES" comments in the `buildozer.spec` for configuration hints that may work on your system.

The `build` folder contains the completed app file you can install on your Android device.