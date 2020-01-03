module.exports = createEmail

function createEmail(predictedRentData, email, numBedrooms, numBathrooms, sqft, zipCode) {
  let emailData = {}
  emailData.email = email
  emailData.subject = `Investarters | Your Rental Prediction: ${numBedrooms} bd ${numBathrooms} ba ${sqft} sqft unit in ${zipCode}`
  emailData.emailText = `Hey Investor!
  For a ${numBedrooms} bed ${numBathrooms} bath unit with ${sqft} square feet in ${zipCode} the predicted rent is ${predictedRentData} per month.
  Now, what? Follow these steps:

    1. The number represents what the rental income would be for that property monthly.
    2. Subtract the costs of the property (mortgage, taxes, interest, insurance, management, repairs etc)
    3. Whatever is leftover is your profit on a property. AKA your CASHFLOW
    4. If that number is greater than zero, make sure it meets your goals for what you want in a rental property
    5. Call up the listing agent
    6. Go see the property
    7. If you have seen it and still think its a good deal, then offer on it!
  
  This is SO important to know.  Without this you will not be able to accurately determine the rent on a rental property you plan on buying.
     My goal is to help you buy your first investment property with clear, personal and actionable advice.
    
     https://www.patreon.com/investarters Support me to make more tools like this!
  
     https://www.youtube.com/channel/UCW_ya0_tg51lnj7VVvfJuXw?sub_confirmation=1 Subscribe to Investarters for More!

  Best,
  Antonio Cucciniello from Investarters`

  emailData.emailHTML = `<p>Hey Investor!</p>
  <p>For a ${numBedrooms} bed ${numBathrooms} bath unit with ${sqft} square feet in ${zipCode} the predicted rent is <b>${predictedRentData} per month.</b></p>
  <p><b>Now, what? Follow these steps:</b></p>
  <ol>
    <li> The number represents what the rental income would be for that property monthly.</li>
    <li> Subtract the costs of the property (mortgage, taxes, interest, insurance, management, repairs etc)</li>
    <li> Whatever is leftover is your profit on a property. AKA your CASHFLOW</li>
    <li> If that number is greater than zero, make sure it meets your goals for what you want in a rental property</li>
    <li> Call up the listing agent</li>
    <li> Go see the property</li>
    <li> If you have seen it and still think its a good deal, then offer on it!</li>
  </ol>
  <p>This is SO important to know.  Without this you will not be able to accurately determine the rent on a rental property you plan on buying.</p>
  <p>My goal is to help you buy your first investment property with clear, personal, actionable advice.</p>
  <br>
  <a href="https://www.patreon.com/investarters"><b>Support me to make more tools like this!</b></a>
  <br>
  <a href="https://www.youtube.com/channel/UCW_ya0_tg51lnj7VVvfJuXw?sub_confirmation=1"><b>Subscribe to Investarters for More!</b></a>
  <br>
  <p>Best, </p>
  <p>Antonio Cucciniello from Investarters</p>`
  return emailData
} 