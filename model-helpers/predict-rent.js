module.exports = predictRent

function predictRent(model, beds, baths, sqft) {
  let predictedRent = model.predict([beds, baths, sqft])
  // return something that makes sense to the user
  return predictedRent
}