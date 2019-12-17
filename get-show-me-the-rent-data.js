const got = require('got')
const fs = require('fs')
const htmlToJson = require('html-to-json')

async function getShowMeTheRentData(zipcode) {
  let url = `https://www.showmetherent.com/listings/${zipcode}`
  const fileName = `rents.html`

  // console.log(url)
  try {
    let response = await got(url)
    console.log(response.body)
    try {
      const result = await htmlToJson.parse(response.body, {'a': function ($a){return $a.attr('href')}})
      console.log(result)
      // fs.writeFileSync(fileName, response.body)
    } catch (err) {
      console.log(err)
    }
  } catch (e) {
    console.log(e)
  }
}

getShowMeTheRentData('08618')