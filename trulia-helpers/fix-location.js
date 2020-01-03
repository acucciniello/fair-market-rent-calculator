const convertRegion = require('../convert-region.js')
module.exports = fixLocation

const TO_NAME = 1
const TO_ABBREVIATED = 2

/*
  Purpose: to take the given location and edit it so it matches the url form of Trulia
  param(in): town: the town where we are searching
  param(in): state: the state we are searching in
  param(out): location: a string containing the town,state in the abbreviated format
*/
function fixLocation(town, state){
  if (town.includes(' ')){
    town = town.replace(/\s/gmi, '_')
  }
  if (state.length !== 2) {
    stateAbbreviated = convertRegion(state, TO_ABBREVIATED)
  }
  let location = `${town},${stateAbbreviated}`
  return location
}