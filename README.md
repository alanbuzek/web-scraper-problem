# Web scrapping assignment

My solution to the problem specified here: https://gist.github.com/wahengchang/9993edd25c8a5cedebdb80bbf9ac592a

## Solution

Using Node's Puppeteer web scraping library, the login url is opened (headless Chromium browser), login formed filled with given credentials and submitted. Thereafter, GET request is sent from the context of the page containing necessary credentials (cookie). The result is parsed and outputted into solution/result.json.
