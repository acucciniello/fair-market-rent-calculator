module.exports = getPropertyUrlsShowMe

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