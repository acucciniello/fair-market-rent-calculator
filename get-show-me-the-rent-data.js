const got = require('got')
const fs = require('fs')
const cheerio = require('cheerio')
const getPropertyUrlsShowMe = require('./get-property-urls-show-me')

async function getShowMeTheRentData(zipCode) {
  let url = `https://www.showmetherent.com/listings/${zipCode}`
  try {
    let allPages = []
    let response = await got(url)
    console.log(response.body)
    const pageOne = cheerio.load(response.body)
    allPages.push(pageOne)
    // get the total listings so you can crawl each page
    let totalListings = pageOne('div[id="rl-statusbar"]').find('div[id="search-totalresults"]').find('strong').html()
    console.log(totalListings)
    if (totalListings > 20) {
      // we need to scrape the other pages for their information too
      let totalPages = Math.floor(totalListings/20)
      console.log(totalPages)
      for (let i = 0; i < totalPages; i++) {
        let pageStart = 20 * (1 + i)
        let newPageUrl = `https://www.showmetherent.com/listings/${zipCode}/start:${pageStart}`
        try {
          let res = await got(newPageUrl)
          const newPage = cheerio.load(res.body)
          allPages.push(newPage)
        } catch (error) {
          console.log(error)
        }
      }
    }
    let list = getPropertyUrlsShowMe(allPages, zipCode)
    console.log(list)
    // TODO: scrape each individual page and then store the information
  } catch (e) {
    console.log(e)
  }
}

getShowMeTheRentData('07728')