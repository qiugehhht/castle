const puppeteer = require('puppeteer');
const Timeout = require('await-timeout');
const fs = require('fs');

let browser = [];
let page = [];
/* Constants */
const michelin ={

    getMichelin: async (link) => {

    console.log(`Going to the Product Page... { ${link}}`);
browser = await puppeteer.launch({
    headless: false,
})

page = await browser.newPage();


await page.setRequestInterception(true);

page.on('request', (request) => {
    if(['image', 'stylesheet', 'font'].includes(request.resourceType())) {
    request.abort();
} else {
    request.continue();
}
})

await page.goto(link);
await page.waitFor('div.ds-1col a');
let details = await page.evaluate(() => {
    let whole = [];
let hrefs = [];
let names = [];
let michelinArray = document.querySelectorAll('div.ds-1col.node.node--poi.view-mode-poi_card a');
for(let michelinElement of michelinArray){
    let href = michelinElement.getAttribute('href');
    hrefs.push(href);
}
let nameArray = document.querySelectorAll('div.poi_card-display-title');
for(let nameEle of nameArray){
    let name = nameEle.innerText;
    names.push(name);
}
for(let i = 0;i <names.length;i++){
    whole.push({
        name: names[i],
        href: `https://restaurant.michelin.fr${hrefs[i]}`
    });
};
return whole;
});
console.log(details[0].href);
await page.close();

for( let detail of details){
    let pageMichelin= await browser.newPage();
    await pageMichelin.setRequestInterception(true);

    pageMichelin.on('request', (request) => {
        if(['image', 'stylesheet', 'font'].includes(request.resourceType())) {
        request.abort();
    } else {
        request.continue();
    }
})

    await pageMichelin.goto(detail.href);
    let timer = new Timeout();
    timer.set(5000).then(async() =>{
        console.log('*******Reloading******')
    await pageMichelin.goto(detail.href);
    await pageMichelin.waitFor(5000);
}).continue;
    await pageMichelin.waitFor(1000);
    let data = await pageMichelin.evaluate(() => {
        let match = [];
    let rating = document.querySelector('meta[itemprop="ratingValue"]').getAttribute('content');
    let price = document.querySelector('div.poi_intro-display-prices').innerText;
    match.push({
        price,
        rating
    })
    return match;
});
    detail.price = data[0].price;
    detail.rating = data[0].rating
    console.log(detail);
    timer.clear();
};


console.log(details);
return details;
},
end: async() => {
    console.log('Stopping the scraper...');

    await browser.close();
}

}

let get = (async () => {
    let pages = [];
var linkMichelin = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
let page = await michelin.getMichelin(linkMichelin);
pages.push(page);
debugger;
await michelin.end();

fs.writeFileSync('./data.json',JSON.stringify(pages,null,'/t'), 'utf-8');
debugger;
console.log(pages);
})()

module.exports = get;