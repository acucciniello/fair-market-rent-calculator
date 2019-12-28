const got = require('got')
const cheerio = require('cheerio')
const fs = require('fs')

async function getAllCraigslistUrls() {
  let url = 'https://www.craigslist.org/about/sites'
  try {
    let response = await got(url)
    const $ = cheerio.load(response.body)
    $('article[class=page-container]').find('section[class=body]').find('h1').find('div[class=colmask]').find('div[class="box box_1]').find('h4')
    console.log(response.body)
    fs.writeFileSync('./craiglist-sites.html', response.body)
  } catch (e) {
    console.log(e)
  }
}

getAllCraigslistUrls()