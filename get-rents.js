const got = require('got')
require('dotenv').config()

let API_TOKEN = process.env.API_TOKEN
let format = 'JSON'
let query = 'state:New Jersey'
let num_records = 1
let download = false
let url = `https://api.datafiniti.co/v4/properties/search`
let options = {
  json: {
    'query': query,
    'format': format,
    'num_records': num_records,
    'download': download
  },
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
}

async function getRents() {
  try {
    let response = await got.post(url, options)
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}
getRents()
