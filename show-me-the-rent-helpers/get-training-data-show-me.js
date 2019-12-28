module.exports = getTrainingDataShowMe
const fs = require('fs')
const cheerio = require('cheerio')
const got = require('got')

function getTrainingDataShowMe(listOfUrls) {
  return new Promise (async (resolve, reject) => {
    let trainingData = {
      x: [],
      y: []
    }
    for (let i = 0; i < listOfUrls.length; i++) {
      let url = `https://www.showmetherent.com/${listOfUrls[i]}`
      try {
        let res = await got(url)
        const $ = cheerio.load(res.body)
        let rent = $('div[id="unit_list"]').find('div[class="unit-list-detail bedroom_apart "]').find('div[class="property-unit-header"]').find('h2').find('span[class=property-unit-rent]').text()
        rent = rent.replace(/\s/gmi,'')
        rent = rent.replace(/[$,]/gmi, '')
        rent = parseInt(rent)
        console.log(rent)
        // pull out the details
        let details = $('div[id="unit_list"]').find('div[class="unit-list-detail bedroom_apart "]').find('div[class="bedroom_apart_cont"]').find('p[class="property-unit-details"]').text()
        if (!details.includes('-')){
          details = details.replace(/\s/gmi,'')
          details = details.replace(/[,]/gmi,'')
          details = details.replace(/(bedrooms|bedroom|bathrooms|bathroom|sq.ft.)/g,' ')
          if (details.includes('studio')) {
            details.replace('studio', '1 ')
          }
          let detailsArray = details.split(' ')
          // console.log(detailsArray)
          if (detailsArray[0] && detailsArray[1] && detailsArray[2]) {
            let bedrooms = detailsArray[0]
            let bathrooms = detailsArray[1]
            let sqft = detailsArray[2]
            bedrooms = parseInt(bedrooms)
            bathrooms = parseInt(bathrooms)
            sqft = parseInt(sqft)
            let x = [bedrooms, bathrooms, sqft]
            let y = [rent]
            trainingData.x.push(x)
            trainingData.y.push(y)
            // console.log(trainingData)
          }
        }
      } catch (e) {
        console.log(e)
        reject('We could not get information from the individual property pages')
      }
    }
    resolve(trainingData)
  })
}