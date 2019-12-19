const getShowMeTheRentData = require('./show-me-the-rent-helpers/get-show-me-the-rent-data.js')

module.exports = getAllRentalData

async function getAllRentalData(numBedrooms, numBathrooms, sqft, zipCode) {
  let showMeTheRentTrainingData = await getShowMeTheRentData(zipCode)
  console.log(showMeTheRentTrainingData)
}

getAllRentalData('3', '2', '1300', '08618')