const craigslist = require('node-craigslist')

module.exports = getCraigslistListings

let APARTMENT_CATEGORY = 'apa'
// from the main craiglist site, you can get all the invidual craiglist sites 
// then I need to map each one to an individual site
async function getCraigslistListings (city) {
  let client = new craigslist.Client({
    baseHost: 'craigslist.org'
  })
  try {
    // I need to convert their city information to their informat
    let listings = await client.list({city: city, category: APARTMENT_CATEGORY})
    for (let i = 0; i < listings.length; i++) {
      try {
        let listingInfo = await client.details(listings[i])
        console.log(listingInfo)
      } catch (err) {
        console.log(err)
      }
    }
    // console.log(response)
  } catch (e) {
    console.log(e)
  }
}


getCraigslistListings('ewing nj')
