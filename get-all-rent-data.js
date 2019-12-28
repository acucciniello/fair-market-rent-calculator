const getShowMeTheRentData = require('./show-me-the-rent-helpers/get-show-me-the-rent-data.js')
const truliaSearch = require('./trulia-helpers/trulia-search.js')
const predictRent = require('./predict-rent')
const createModel = require('./create-model.js')

module.exports = getAllRentalData

async function getAllRentalData(numBedrooms, numBathrooms, sqft, address, city, state, zipCode) {
  let showMeTheRentTrainingData = await getShowMeTheRentData(zipCode)
  let truliaTrainingData = await truliaSearch(city, state)
  truliaTrainingData.x = truliaTrainingData.x.concat(showMeTheRentTrainingData.x)
  truliaTrainingData.y = truliaTrainingData.y.concat(showMeTheRentTrainingData.y)
  console.log('finsihed heres the data')
  console.log(truliaTrainingData)
  let model = createModel(truliaTrainingData)
  let predictedRent = predictRent(model, parseInt(numBedrooms), parseInt(numBathrooms), parseInt(sqft))
  console.log('final predicted rent')
  console.log(predictedRent)
  process.exit(0)
}

getAllRentalData('3', '2', '1300', '1100 Prospect Street', 'Ewing', 'New Jersey', '08618')