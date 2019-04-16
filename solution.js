const puppeteer = require('puppeteer');
const fs = require('fs');

const scraper = async () => {
  // open page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://f2e-test.herokuapp.com/login', { waitUntil: 'networkidle2' });
  await page.waitFor('input[name=password]');

  // fill submit login form
  await page.$eval('input[name=username]', el => (el.value = 'f2e-candidate'));
  await page.$eval('input[name=password]', el => (el.value = 'P@ssw0rd'));
  await page.click('button[type=submit]');

  // wait to load
  await page.waitFor('.dataList');

  const data = await page.evaluate(async () => {
    const response = await fetch('/api/products?offset=0&limit=1000', {
      credentials: 'same-origin'
    });
    const { data } = await response.json();
    return JSON.stringify(data);
  });

  // check if there's data
  if (!data) return console.log(`Couldn't get data`);

  // write result into json
  fs.writeFileSync('data.json', data, function(err) {
    if (err) {
      console.log(err);
    }
  });
};

scraper()
  .then(() => {
    console.log('finished');
    process.exit();
  })
  .catch(err => {
    console.log(`There was an error ${err}`);
    process.exit();
  });
