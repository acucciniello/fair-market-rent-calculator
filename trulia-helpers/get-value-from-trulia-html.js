module.exports = getValueFromTruliaHtml

/*
  Purpose: to get the values of the rent, bathrooms, bedrooms, and sqft foot from each property page
  param(in): $: cheerio object that allows us to parse through the html for that page
  param(in): type: either can be 'bedrooms' 'bathrooms' 'sqft' 'rent' determines what value to pull out
  param(out): value: the value of the type taken from the html
*/
function getValueFromTruliaHtml($, type) {
  let value
  if ((type === 'bedrooms') && ($('div[id=__next]').find('section[id=main-content]')
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
    .text())) {
    value = $('div[id=__next]').find('section[id=main-content]')
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
  }
  if ((type === 'bathrooms') && ($('div[id=__next]').find('section[id=main-content]')
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
    .text())) {
    value = $('div[id=__next]').find('section[id=main-content]')
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
  }
  if ((type === 'sqft') && ($('div[id=__next]').find('section[id=main-content]')
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
    .text())) {
    value = $('div[id=__next]').find('section[id=main-content]')
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
  }
  if ((type === 'rent') && ($('div[id=__next]').find('section[id=main-content]')
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
    .text())) {
    value = $('div[id=__next]').find('section[id=main-content]')
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
  }
  return value
}