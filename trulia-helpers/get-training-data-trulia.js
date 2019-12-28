const cheerio = require('cheerio')
const got = require('got')
const fs = require('fs')

module.exports = getTrainingDataTrulia

function getTrainingDataTrulia(urlsToHit) {
  return new Promise(async (resolve, reject) => {
    console.log(urlsToHit)
    let trainingData = {
      x: [],
      y: []
    }
    const totalTimeout = urlsToHit.length * 3000
    console.log(totalTimeout)
    setInterval(async function getPropertyData() {
      if(urlsToHit.length !== 0) {
        try {
          let latestURL = urlsToHit.pop()
          console.log(latestURL)
          let eachPropertyRes = await got(latestURL)
          let $ = cheerio.load(eachPropertyRes.body)
          let bathrooms
          let bedrooms
          let sqft
          let rent
          if($('div[id=__next]').find('section[id=main-content]')
          .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
          .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
          .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
          .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
          .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
          .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
          .find('div[class="Grid__CellBox-sc-5ig2n4-0 ijAEkt"]')
          .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
          .find('div[class="Box-sc-8ox7qa-0 ftuqZc"]')
          .find('div[class="Padding-sc-1d43y5s-0 ktdObN"]')
          .find('ul[class="List__ListContainer-sc-1mezygb-0 cknFRB"]')
          .find('li[data-testid="bed"]')
          .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
          .find('div[class="MediaBlock__MediaContent-ldzu2c-1 bumWFt"]')
          .text()) {
            bedrooms = $('div[id=__next]').find('section[id=main-content]')
            .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
            .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
            .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
            .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
            .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
            .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
            .find('div[class="Grid__CellBox-sc-5ig2n4-0 ijAEkt"]')
            .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
            .find('div[class="Box-sc-8ox7qa-0 ftuqZc"]')
            .find('div[class="Padding-sc-1d43y5s-0 ktdObN"]')
            .find('ul[class="List__ListContainer-sc-1mezygb-0 cknFRB"]')
            .find('li[data-testid="bed"]')
            .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
            .find('div[class="MediaBlock__MediaContent-ldzu2c-1 bumWFt"]')
            .text()
            console.log(bedrooms)
          }
          if($('div[id=__next]').find('section[id=main-content]')
          .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
          .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
          .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
          .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
          .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
          .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
          .find('div[class="Grid__CellBox-sc-5ig2n4-0 ijAEkt"]')
          .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
          .find('div[class="Box-sc-8ox7qa-0 ftuqZc"]')
          .find('div[class="Padding-sc-1d43y5s-0 ktdObN"]')
          .find('ul[class="List__ListContainer-sc-1mezygb-0 cknFRB"]')
          .find('li[data-testid="bath"]')
          .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
          .find('div[class="MediaBlock__MediaContent-ldzu2c-1 bumWFt"]')
          .text()) {
            bathrooms = $('div[id=__next]').find('section[id=main-content]')
            .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
            .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
            .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
            .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
            .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
            .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
            .find('div[class="Grid__CellBox-sc-5ig2n4-0 ijAEkt"]')
            .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
            .find('div[class="Box-sc-8ox7qa-0 ftuqZc"]')
            .find('div[class="Padding-sc-1d43y5s-0 ktdObN"]')
            .find('ul[class="List__ListContainer-sc-1mezygb-0 cknFRB"]')
            .find('li[data-testid="bath"]')
            .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
            .find('div[class="MediaBlock__MediaContent-ldzu2c-1 bumWFt"]')
            .text()
            console.log(bathrooms)
          }
          if($('div[id=__next]').find('section[id=main-content]')
          .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
          .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
          .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
          .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
          .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
          .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
          .find('div[class="Grid__CellBox-sc-5ig2n4-0 ijAEkt"]')
          .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
          .find('div[class="Box-sc-8ox7qa-0 ftuqZc"]')
          .find('div[class="Padding-sc-1d43y5s-0 ktdObN"]')
          .find('ul[class="List__ListContainer-sc-1mezygb-0 cknFRB"]')
          .find('li[data-testid="floor"]')
          .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
          .find('div[class="MediaBlock__MediaContent-ldzu2c-1 bumWFt"]')
          .text()) {
            sqft = $('div[id=__next]').find('section[id=main-content]')
            .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
            .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
            .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
            .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
            .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
            .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
            .find('div[class="Grid__CellBox-sc-5ig2n4-0 ijAEkt"]')
            .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
            .find('div[class="Box-sc-8ox7qa-0 ftuqZc"]')
            .find('div[class="Padding-sc-1d43y5s-0 ktdObN"]')
            .find('ul[class="List__ListContainer-sc-1mezygb-0 cknFRB"]')
            .find('li[data-testid="floor"]')
            .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
            .find('div[class="MediaBlock__MediaContent-ldzu2c-1 bumWFt"]')
            .text()
            console.log('sqft')
            console.log(sqft)
          }
          if($('div[id=__next]').find('section[id=main-content]')
          .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
          .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
          .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
          .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
          .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
          .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
          .find('div[class="Grid__CellBox-sc-5ig2n4-0 eDyuFu"]')
          .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
          .find('h3')
          .find('div[class="Text__TextBase-sc-1i9uasc-0-div Text__TextContainerBase-sc-1i9uasc-1 gtxlcQ"]')
          .text()) {
            rent = $('div[id=__next]').find('section[id=main-content]')
            .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
            .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
            .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
            .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
            .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
            .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
            .find('div[class="Grid__CellBox-sc-5ig2n4-0 eDyuFu"]')
            .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
            .find('h3')
            .find('div[class="Text__TextBase-sc-1i9uasc-0-div Text__TextContainerBase-sc-1i9uasc-1 gtxlcQ"]')
            .text()
            console.log(rent)
          }
          
          if((bedrooms !== undefined && !bedrooms.includes('-')) && (bathrooms !== undefined && !bathrooms.includes('-')) && (sqft !== undefined && sqft !== '') && (rent !== undefined && !rent.includes('-'))) {
            bedrooms = bedrooms.replace(/(Beds|Bed)/gmi,'')
            bedrooms = bedrooms.replace(/\s/gmi,'')
            bedrooms = parseInt(bedrooms)
            bathrooms = bathrooms.replace(/(Baths|Bath)/gmi, '')
            bathrooms = bathrooms.replace(/\s/gmi,'')
            bathrooms = parseInt(bathrooms)
            sqft = sqft.replace(/(sqft)/gmi, '')
            sqft = sqft.replace(/[,]/gmi, '')
            sqft = sqft.replace(/\s/gmi,'')
            sqft = parseInt(sqft)
            rent = rent.replace(/[$,/]/gmi, '')
            rent = rent.replace(/(mo)/gmi, '')
            rent = parseInt(rent)
            x = [bedrooms, bathrooms, sqft]
            y = [rent]
            trainingData.x.push(x)
            trainingData.y.push(y)
            console.log(trainingData)
          }
        } catch (e) {
          console.log('this is each urls error statement')
          console.log(e)
          reject(e)
        }

      } else {
        return resolve(trainingData)
      }
    }, 3000)
    clearInterval(0)
  })
}



// function getTrainingDataTrulia(searchHTML) {
//   return new Promise (async (resolve, reject) => {
//     let trainingData = []
//     let $ = cheerio.load(searchHTML)
//     $('div[id=__next]').find('section[id=main-content]')
//       .find('div[class="SearchResultsContentLayout__Container-sc-15fhfe9-1 jQhwvb"]')
//       .find('div[id="resultsColumn"]')
//       .find('div[class="SearchResultsList__Container-sc-183kqex-0 bjkSbC"]')
//       .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
//       .find('div[class="Grid__CellBox-sc-5ig2n4-0 SearchResultsList__WideCell-sc-183kqex-3 ehWeYU"]')
//       .each(async (index, element) => {
//         let rent = $(element).find('div').find('span').find('div')
//                     .find('div[class="PropertyCard__PropertyCardContainer-sc-1ush98q-2 gKJaNz Box-sc-8ox7qa-0 jIGxjA"]')
//                     .find('div[class="Box-sc-8ox7qa-0 jIGxjA"]').find('div[class="Padding-sc-1d43y5s-0 faAZJU"]')
//                     .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
//                     .find('div[class="MediaBlock__MediaContent-ldzu2c-1 eMnXuJ"]')
//                     .find('div[class="Text__TextBase-sc-1i9uasc-0-div Text__TextContainerBase-sc-1i9uasc-1 kNBbhi"]')
//                     .text()
//         console.log(rent)
//         if (!rent.includes('-')) {
//           let rentalDetails = $(element).find('div').find('span').find('div')
//             .find('div[class="PropertyCard__PropertyCardContainer-sc-1ush98q-2 gKJaNz Box-sc-8ox7qa-0 jIGxjA"]')
//             .find('div[class="Box-sc-8ox7qa-0 jIGxjA"]').find('div[class="Padding-sc-1d43y5s-0 faAZJU"]')
//             .find('div[class="FlexContainers__Columns-sc-1ezkc0e-2 fkwbDs"]')
//             .find('div[class="Padding-sc-1d43y5s-0 dCeMHc"]')
//             .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
//             .find('div[class="MediaBlock__MediaContent-ldzu2c-1 MLLJw"]')
//             .find('div[class="Text__TextBase-sc-1i9uasc-0-div Text__TextContainerBase-sc-1i9uasc-1 lcNNgu"]')
//             .text()
//             console.log(rentalDetails)
//             if (!rentalDetails.includes('sqft')) {
//               let endpoint = $(element).find('div').find('span').find('div')
//               .find('div[class="PropertyCard__PropertyCardContainer-sc-1ush98q-2 gKJaNz Box-sc-8ox7qa-0 jIGxjA"]').find('a').attr('href')
//               console.log(endpoint)
//               let url = `https://www.trulia.com${endpoint}`
//               console.log(url)
//               try {
//                 let response = await got(url)
//                 console.log(`response for ${url}`)
//                 let moreRentDetailsHTML = cheerio.load(response.body)
//                 rentalDetails = moreRentDetailsHTML('div[id=__next]').find('section[id=main-content]')
//                 .find('div[class="BasicPageLayout__BasicPageLayoutContainer-sc-7vcr4x-0 gMTacw"]')
//                 .find('div[class="BasicPageLayout__BasicPageContent-sc-7vcr4x-1 lhjvlp"]')
//                 .find('div[class="HomeDetailsContentOverview__ContentWithLeadFormGrid-sc-1lql7o5-0 bHYvJo Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
//                 .find('div[class="Grid__CellBox-sc-5ig2n4-0 gzuBBk"]')
//                 .find('div[class="StyledSectionContainer__Container-qnx9kh-0 dYwMwi"]').find('div')
//                 .find('div[class="Grid__GridContainer-sc-5ig2n4-1 coXJy"]')
//                 .find('div[class="Grid__CellBox-sc-5ig2n4-0 ijAEkt"]')
//                 .find('div[class="Box-sc-8ox7qa-0 iITnWe"]')
//                 .find('div[class="Box-sc-8ox7qa-0 ftuqZc"]')
//                 .find('div[class="Padding-sc-1d43y5s-0 ktdObN"]')
//                 .find('ul[class="List__ListContainer-sc-1mezygb-0 cknFRB"]')
//                 .find('li[data-testid="floor"]')
//                 .find('div[class="MediaBlock__MediaContainer-ldzu2c-0 faqTnc"]')
//                 .find('div[class="MediaBlock__MediaContent-ldzu2c-1 bumWFt"]')
//                 .text()
//                 console.log(rentalDetails)
//                 // fs.writeFileSync('./rent-details-output.html', response.body)
//               } catch (error) {
//                 console.log('we are in first error: ', index)
//                 console.log(error)
//                 reject(error)
//               }
//             }
//             rentalDetails = rentalDetails.replace(/\s/gmi,'')
//             rentalDetails = rentalDetails.replace(/(bd|ba|sqft)/g,' ')
//             console.log(rentalDetails)
//             // console.log(bathrooms)
//         }
//       })
//     // resolve()
//     // iterate over every returned property
//   })
// }