let MLR = require('ml-regression-multivariate-linear')

/* format of data
 trainingData: [ [# of bedrooms, # of bathrooms, sqft], [# of bedrooms, # of bathrooms, sqft] ]
 output: [ [price], [price] ]
*/

module.exports = createModel

/*
  Purpose: to create a prediction model using multivariate linear regression and the input data from websites previously
  param(im): trainingData: an array of rent prices with the bedrooms, bathrooms, square footage of a property in the area you are searching in, this is used for machine learning
  param(out): mlr: the model to predict the rents
  */
function createModel(trainingData) {
  console.log(trainingData.x)
  console.log(trainingData.y)
  const mlr = new MLR(trainingData.x, trainingData.y)
  console.log(mlr)
  return mlr
}