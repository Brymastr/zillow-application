### Zillow/Retsly coding challenge

# Running
    $ tail -f <text file name> | node monitor [options]

The node shebang line is present in the monitor file but I wrote this in windows and couldn't use it. 
If running this in a linux distro you can probably omit `node` from the command.
  
Options:

    -h, --help          show this help text  
    --verbose           show extra information in reports  
    --interval=[+]NUM   interval at which to write reports to stdout in milliseconds (default 1000)

Example: read text from `log.txt` and write summaries every 2 seconds to the console

    $ tail -f log.txt | node monitor -v --interval=2000

I also wrote a script to simulate an active log file  
It generates random text at a random interval (max 900ms) and writes it to `log.txt`  

Run it with:

    node buildLog

# Testing
    node test
I wrote a test that writes five lines of text to the duplex and on `data` asserts that the resultant summary object matches the expected object.

# Contributing
Just kidding. But you can contact me at `dorsay@live.ca`