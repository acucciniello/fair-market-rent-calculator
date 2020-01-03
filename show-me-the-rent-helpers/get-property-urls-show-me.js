module.exports = getPropertyUrlsShowMe

/*
  Purpose: to to get the individual urls from show me the rent
  param(in): allPages: an array with the html of all the pages?
  param(in): zipCode: zipcode to search for properties
  param(out): list: array of urls to hit
*/
function getPropertyUrlsShowMe(allPages, zipCode) {
  let list = []
  for(let page = 0; page < allPages.length; page++) {
    allPages[page]('div[class=listing-table]').find('a[class=listing-tile-mobile]').each(function (index, element) {
      if(allPages[page](element).attr('href').includes(zipCode)) {
        list.push(allPages[page](element).attr('href'))
      }
    })
  }
  return list
}