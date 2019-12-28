const got = require('got')
const cheerio = require('cheerio')
const convertRegion = require('../convert-region.js')
const getTrainingDataTrulia = require('./get-training-data-trulia.js')

const fs = require('fs')

const TO_NAME = 1
const TO_ABBREVIATED = 2
const RESULTS_PER_PAGE = 30

module.exports = truliaSearch

async function truliaSearch(town, state) {
  return new Promise(async(resolve, reject) => {
    console.log('hi')
    if (town.includes(' ')){
      town = town.replace(/\s/gmi, '_')
    }
    if (state.length !== 2) {
      stateAbbreviated = convertRegion(state, TO_ABBREVIATED)
    }
    let location = `${town},${stateAbbreviated}`
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
        // THE TIMING IS OFF IN HERE, it takes the first pages URLS to hit then must wait till we get the rest of them before calling the inside f
        let totalResultsFull = $('div[id=__next]').find('section[id=main-content]')
                                .find('div[class="SearchResultsContentLayout__Container-sc-15fhfe9-1 jQhwvb"]')
                                .find('div[id="resultsColumn"]')
                                .find('div[class="SearchResultsPagination__Container-sc-1g9fbhd-0 bkyVoY"]')
                                .find('div[class="Text__TextBase-sc-1i9uasc-0-div Text__TextContainerBase-sc-1i9uasc-1 dDYpyB"]')
                                .text()
                                console.log(totalResultsFull)
        totalResultsFull = totalResultsFull.split(' ')
        console.log(totalResultsFull)
        if (totalResultsFull[2]) {
          let numResultsPages = Math.floor(totalResultsFull[2]/RESULTS_PER_PAGE)
          console.log(numResultsPages)
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
              console.log('we struggled to hit extra pages: ', index)
              console.log(err)
              reject(err)
            }
          }
        }
        try {
          console.log('urlsToHit')
          console.log(urlsToHit)
          let truliaTrainingData = await getTrainingDataTrulia(urlsToHit)
          console.log(truliaTrainingData)
          resolve(truliaTrainingData)
        } catch (individualPageError) {
          console.log(individualPageError)
          reject(individualPageError)
        }
    } catch(e) {
      console.log('error')
      console.log('in main function error')
      console.log(e)
      reject(e)
    }
  })
  
}

// truliaSearch('Ewing', 'New Jersey')