const cheerio = require('cheerio')
const got = require('got')
const getValueFromTruliaHtml = require('./get-value-from-trulia-html')

module.exports = getTrainingDataTrulia

/*
  Purpose: to get the training data by scraping the trulia pages at a certain interval
  param(in): urlsToHit: an array of urls to scrape for property rental data
  param(out): truliaTrainingData: the data used from trulia for machine learning
*/
function getTrainingDataTrulia(urlsToHit) {
  return new Promise(async (resolve, reject) => {
    // the object that will contain all the inputs and outputs from trulia
    let trainingData = {
      x: [],
      y: []
    }
    setInterval(async function getPropertyData() {
      // keep running if we have more URLs of properties to hit
      if(urlsToHit.length !== 0) {
        try {
          // take the latest property
          let latestURL = urlsToHit.pop()
          let eachPropertyRes = await got(latestURL)
          let $ = cheerio.load(eachPropertyRes.body)
          let bathrooms
          let bedrooms
          let sqft
          let rent
          if(getValueFromTruliaHtml($, 'bedrooms')){
            bedrooms = getValueFromTruliaHtml($, 'bedrooms')
          }
          if(getValueFromTruliaHtml($, 'bathrooms')){
            bathrooms = getValueFromTruliaHtml($, 'bathrooms')
          }
          if(getValueFromTruliaHtml($, 'sqft')){
            sqft = getValueFromTruliaHtml($, 'sqft')
          }
          if(getValueFromTruliaHtml($, 'rent')){
            rent = getValueFromTruliaHtml($, 'rent')
          }
          if((bedrooms !== undefined && !bedrooms.includes('-')) && (bathrooms !== undefined && !bathrooms.includes('-')) && (sqft !== undefined && sqft !== '') && (rent !== undefined && !rent.includes('-'))) {
            // remove the spaces and the extra words or symbols, then convert to numbers (float for bathroom, int for everything else)
            bedrooms = bedrooms.replace(/(Beds|Bed)/gmi,'')
            bedrooms = bedrooms.replace(/\s/gmi,'')
            bedrooms = parseInt(bedrooms)
            bathrooms = bathrooms.replace(/(Baths|Bath)/gmi, '')
            bathrooms = bathrooms.replace(/\s/gmi,'')
            bathrooms = parseFloat(bathrooms)
            sqft = sqft.replace(/(sqft)/gmi, '')
            sqft = sqft.replace(/[,]/gmi, '')
            sqft = sqft.replace(/\s/gmi,'')
            sqft = parseInt(sqft)
            rent = rent.replace(/[$,/]/gmi, '')
            rent = rent.replace(/(mo)/gmi, '')
            rent = parseInt(rent)
            // remove any bad rental values - THIS COULD BE IMPROVED TO A BETTER WAY
            if (rent <= 10000) {
              x = [bedrooms, bathrooms, sqft]
              y = [rent]
              trainingData.x.push(x)
              trainingData.y.push(y)
            }
          }
        } catch (e) {
          console.log('We failed to get property data for this URL')
          console.log(e)
          reject(e)
        }

      } else {
        return resolve(trainingData)
      }
    }, 3000)
    clearInterval(0)
  })
}
