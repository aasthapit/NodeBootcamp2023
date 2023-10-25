const fs = require('fs')
const http = require('http')
const path = require('path/posix')
const url = require('url')

const slugify = require('slugify')

const replaceTemplate = require('./starter/modules/replaceTemplate')

//////////////////////
//SERVER

//As thie file is being run once, we are able to run this syncronously to handle data. While it is blocking, since it runs once, this is okay
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}))
console.log(slugs)

const server = http.createServer((req,res) => {
    const {query, pathname} = url.parse(req.url, true)
    //Overview Page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-Type' : 'text/html'})

        // for each el in dataObj, replace all placeholders as specified in replaceTemplate. As this returns as an array of values, to get a single string on HTML, join all elements in result array with null string
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')

        // replace placeholder of PRODUCTCARDS with resulting HTML string
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output)
    } 
    //Product page
    else if (pathname === '/product'){
        res.writeHead(200, { 'Content-Type' : 'text/html'})
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)
    } 
    //API
    else if (pathname === '/api'){
        res.writeHead(200, { 'Content-Type' : 'application/json'})
        res.end(data)
    } 
    //Not found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end('<h1>Page not found!</h1>')
    }
})

server.listen(8000, '127.0.0.1' , () => {
    console.log('Listening to requests on port 8000')
})

