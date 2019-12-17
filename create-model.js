let MLR = require('ml-regression-multivariate-linear')

/* format of data
 inputs: [ [# of bedrooms, # of bathrooms, sqft], [# of bedrooms, # of bathrooms, sqft] ]
 output: [ [price], [price] ]
*/

module.exports = createModel

function createModel(inputs) {
  const mlr = new MLR(inputs.x, inputs.y)
  return mlr
}

// let MLR = require('ml-regression-multivariate-linear')
// // Bedrooms, Baths, SQ
// const x = [
//   [2, 2, 1145],
//   [2, 1, 1096],
//   [2, 1, 1200],
//   [3, 1.5, 1023],
//   [4, 1, 1041],
//   [4, 2, 1080],
//   [3, 1, 1092],
//   [3, 1, 1041],
//   [4, 1, 1285],
//   [3, 2, 1240],
//   [4, 2, 1518],
//   [3, 2, 1400],
//   [3, 3, 1307],
//   [4, 2, 1888],
//   [4, 2, 1509],
//   [5, 2, 1600],
//   [5, 2, 2276],
//   [4, 2.5, 1957],
//   [4, 2.5, 2112],
//   [4, 3, 2648],
//   [4, 3, 2411],
//   [5, 2, 2082],
//   [5, 2, 1480],
//   [3, 1, 1180],
//   [2, 3, 1084]
// ];
// // Y0 = X0 * 2, Y1 = X1 * 2, Y2 = X0 + X1
// const y = [
//   [1375],
//   [1395],
//   [1425],
//   [1700],
//   [1700],
//   [1700],
//   [1795],
//   [1800],
//   [1900],
//   [1950],
//   [1990],
//   [2000],
//   [2200],
//   [2200],
//   [2295],
//   [2300],
//   [2300],
//   [2400],
//   [2600],
//   [2650],
//   [2995],
//   [3000],
//   [3300],
//   [1500],
//   [1600]
// ];
// const mlr = new MLR(x, y);
// console.log(mlr)
// console.log(mlr.predict([2, 1, 1000]));