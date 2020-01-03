module.exports = toDollarAmount

/*
  Purpose: to convert the predict rent value to a dollar amount for the email to the user
  param(in): predictedRent: the mean value of rent for the given paramters
  param(out): dollarAmount: the predicted rent converted to a dollar amount
*/

function toDollarAmount(predictedRent) {
  let dollarAmount = predictedRent.toFixed(3)
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  dollarAmount = formatter.format(predictedRent)
  console.log(dollarAmount)
  return dollarAmount
}