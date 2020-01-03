const got = require('got')
const cheerio = require('cheerio')
const getTrainingDataTrulia = require('./get-training-data-trulia.js')
const fixLocation = require('./fix-location.js')
const RESULTS_PER_PAGE = 30

module.exports = truliaSearch


/*
  Purpose: to go to trulia's site and get at maximum the first 6 pages of data for a town
  param(in): town: the town we are getting data for
  param(in): state: the state we are getting for the town from
  param(out): truliaTrainingData: the data we will use to run machine learning on for rental predictions
*/
async function truliaSearch(town, state) {
  return new Promise(async(resolve, reject) => {
    // format the town and state to fit trulias url form
    let location = fixLocation(town, state)
    let url = `https://www.trulia.com/for_rent/${location}/APARTMENT,APARTMENT_COMMUNITY,APARTMENT%7CCONDO%7CTOWNHOUSE,CONDO,COOP,LOFT,SINGLE-FAMILY_HOME,TIC_type/`
    try {
      console.log(url)
      let response = await got(url)
      console.log(response.body)
      let $ = cheerio.load(response.body)
      let urlsToHit = []
      $('div[id=__next]').find('section[id=main-content]')
        .find('div[class="SearchResultsContentLayout__Container-sc-15fhfe9-1 jQhwvb"]')
        .find('div[id="resultsColumn"]')
        .find('div[class="SearchResultsList__Container-sc-183kqex-0 bjkSbC"]')
        .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
        .find('div[class="Grid__CellBox-sc-5ig2n4-0 SearchResultsList__WideCell-sc-183kqex-3 ehWeYU"]')
        .each((index, element) => {
          let endpoint = $(element).find('div').find('span').find('div')
                .find('div[class="PropertyCard__PropertyCardContainer-sc-1ush98q-2 gKJaNz Box-sc-8ox7qa-0 jIGxjA"]').find('a').attr('href')
          if(endpoint !== undefined) {
            let newUrl = `https://www.trulia.com${endpoint}`
            urlsToHit.push(newUrl)
          }
          })
        let totalResultsFull = $('div[id=__next]').find('section[id=main-content]')
                                .find('div[class="SearchResultsContentLayout__Container-sc-15fhfe9-1 jQhwvb"]')
                                .find('div[id="resultsColumn"]')
                                .find('div[class="SearchResultsPagination__Container-sc-1g9fbhd-0 bkyVoY"]')
                                .find('div[class="Text__TextBase-sc-1i9uasc-0-div Text__TextContainerBase-sc-1i9uasc-1 dDYpyB"]')
                                .text()
                                console.log(totalResultsFull)
        totalResultsFull = totalResultsFull.split(' ')
        console.log(totalResultsFull)
        // if there are more than 1000 pages, limit it to the first 
        let numResultsPages
        if (totalResultsFull[2]) {
          if (totalResultsFull[2].includes(',')) {
            numResultsPages = 5
          } else {
            numResultsPages = Math.floor(totalResultsFull[2]/RESULTS_PER_PAGE)
          }
          for(let i = 0; i < numResultsPages; i++) {
            let nextPageUrl = `${url}${2+i}_p/`
            console.log(nextPageUrl)
            try {
              let newRes = await got(nextPageUrl)
              let new$ = cheerio.load(newRes.body)
              $('div[id=__next]').find('section[id=main-content]')
                .find('div[class="SearchResultsContentLayout__Container-sc-15fhfe9-1 jQhwvb"]')
                .find('div[id="resultsColumn"]')
                .find('div[class="SearchResultsList__Container-sc-183kqex-0 bjkSbC"]')
                .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
                .find('div[class="Grid__CellBox-sc-5ig2n4-0 SearchResultsList__WideCell-sc-183kqex-3 ehWeYU"]')
                .each((index, element) => {
                  let endpoint = $(element).find('div').find('span').find('div')
                        .find('div[class="PropertyCard__PropertyCardContainer-sc-1ush98q-2 gKJaNz Box-sc-8ox7qa-0 jIGxjA"]').find('a').attr('href')
                  if(endpoint !== undefined) {
                    let newUrl = `https://www.trulia.com${endpoint}`
                    urlsToHit.push(newUrl)
                  }
                  })
            } catch (err) {
              console.log('We failed to hit this trulia page: ', nextPageUrl)
              console.log(err)
              reject(err)
            }
          }
        }
        try {
          let truliaTrainingData = await getTrainingDataTrulia(urlsToHit)
          resolve(truliaTrainingData)
        } catch (individualPageError) {
          console.log(individualPageError)
          reject(individualPageError)
        }
    } catch(e) {
      console.log('error in trulia search function')
      console.log(e)
      reject(e)
    }
  })
}