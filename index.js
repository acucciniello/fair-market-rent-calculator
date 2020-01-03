const getAllRentData = require('./get-all-rent-data.js')
const createEmail = require('./email-helpers/create-email')
const sendEmail = require('./email-helpers/send-email')
const toDollarAmount = require('./to-dollar-amount.js')

/*
  Purpose: lambda function that gets executed when SQS message gets sent to it
  param(in): event: the values given from the google form from the user
  param(out): response: showing the email being sent to them
*/
exports.handler = async function index(event) {
  console.log(event)
    try {
      let whatToPredictData = JSON.parse(event.Records[0].body)
      let predictedRent = await getAllRentData(whatToPredictData.numBedrooms, whatToPredictData.numBathrooms, whatToPredictData.sqft, whatToPredictData.email, whatToPredictData.city, whatToPredictData.state, whatToPredictData.zipCode)
      console.log('predicted RENT IS HERE')
      console.log(predictedRent[0])
      let dollarAmount = toDollarAmount(predictedRent[0])
      let emailData =  createEmail(dollarAmount, whatToPredictData.email, whatToPredictData.numBedrooms, whatToPredictData.numBathrooms, whatToPredictData.sqft, whatToPredictData.zipCode)
      let res = await sendEmail(emailData)
      return res
      process.exit(0)
    } catch (e) {
      let error = {
        status: '400',
        body: {
          errorMsg: e
        }
      }
      return error
      process.exit(0)
    }
}