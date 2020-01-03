const got = require('got')
const fs = require('fs')
const cheerio = require('cheerio')
const getPropertyUrlsShowMe = require('./get-property-urls-show-me')
const getTrainingDataShowMe = require('./get-training-data-show-me')

module.exports = getShowMeTheRentData

/*
  Purpose: to hit the search page for a zip code on show me the rent 
  param(in): zipCode: the zipcode to search for
  param(out): showMeTheRentTrainingData: the data to be used for predicting
*/
async function getShowMeTheRentData(zipCode) {
  return new Promise(async(resolve, reject) => {
    let url = `https://www.showmetherent.com/listings/${zipCode}`
    try {
      let allPages = []
      let response = await got(url)
      const pageOne = cheerio.load(response.body)
      allPages.push(pageOne)
      // get the total listings so you can crawl each page
      let totalListings = pageOne('div[id="rl-statusbar"]').find('div[id="search-totalresults"]').find('strong').html()
      if (totalListings > 20) {
        // we need to scrape the other pages for their information too
        let totalPages = Math.floor(totalListings/20)
        for (let i = 0; i < totalPages; i++) {
          let pageStart = 20 * (1 + i)
          let newPageUrl = `https://www.showmetherent.com/listings/${zipCode}/start:${pageStart}`
          try {
            let res = await got(newPageUrl)
            const newPage = cheerio.load(res.body)
            allPages.push(newPage)
          } catch (error) {
            console.log(error)
            reject(error)
          }
        }
      }
      let list = getPropertyUrlsShowMe(allPages, zipCode)
      console.log(list)
      try { 
        let showMeTrainingData = await getTrainingDataShowMe(list)
        resolve(showMeTrainingData)
      } catch (errors) {
        console.log(errors)
        reject(errors)
      }
      // TODO: scrape each individual page and then store the information
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })
}