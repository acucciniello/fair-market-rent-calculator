const getShowMeTheRentData = require('./show-me-the-rent-helpers/get-show-me-the-rent-data.js')
const truliaSearch = require('./trulia-helpers/trulia-search.js')
const predictRent = require('./model-helpers/predict-rent')
const createModel = require('./model-helpers/create-model.js')

module.exports = getAllRentalData

/*
  Purpose: to get the rental data from various soucres
  param(in): numBedrooms: the number of bedrooms from lambda
  param(in): numBathrooms: the number of bathrooms from lambda
  param(in): sqft: the number of sqft from lambda
  param(in): email: the email to send the email to
  param(in): city: the city to search for rentals in
  param(in): state: the state to search for rentals in
  param(in): zipCode: the zip code to search for rentals in
  param(out): predictedRent: a promise that contains the predicted rent in an array
*/
async function getAllRentalData(numBedrooms, numBathrooms, sqft, email, city, state, zipCode) {
  return new Promise(async(resolve, reject) => {
    let showMeTheRentTrainingData = await getShowMeTheRentData(zipCode)
    let truliaTrainingData = await truliaSearch(city, state)
    truliaTrainingData.x = truliaTrainingData.x.concat(showMeTheRentTrainingData.x)
    truliaTrainingData.y = truliaTrainingData.y.concat(showMeTheRentTrainingData.y)
    console.log(truliaTrainingData)
    let model = createModel(truliaTrainingData)
    let predictedRent = predictRent(model, parseInt(numBedrooms), parseFloat(numBathrooms), parseInt(sqft))
    console.log('final predicted rent')
    console.log(predictedRent)
    return resolve(predictedRent)
  })
}