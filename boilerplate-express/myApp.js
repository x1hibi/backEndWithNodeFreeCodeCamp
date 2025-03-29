let express = require('express');
let app = express();
require('dotenv').config()
let bodyParser=require('body-parser');

let public_path = __dirname+'/public'

// Call in all request body parser to parse request data hidden in http body
app.use(bodyParser.urlencoded({extended: false}))

function middlewarePostData(request,response) {
    response.json({
        name:request.body.first+" "+request.body.last
    })
}
// Return data post parsing data from http body
app.post('/name',middlewarePostData)

let middlewareStatic = express.static(public_path)

function middlewareFunction(request,response,next) {
    let httpMethod = request.method
    let requestPath = request.path
    let requestIP = request.ip
    console.log(`${httpMethod} ${requestPath} - ${requestIP}`)
    next()
}   

// Call midleware in all request 
app.use(middlewareFunction)

function middlewareGetTime(request,response,next) {
    request.time = new Date().toString()
    next()
}

function middlewareReturnTime(request,response) {
    response.json({
        "time":request.time
    })
}

// Return a server time in /now 
app.get('/now',middlewareGetTime,middlewareReturnTime)

function middlewareEco(request,response) {
    response.json({
        "echo":request.params.word
    })
}
// Get a route parameters from URL
app.get('/:word/echo',middlewareEco)


function middlewareQueryParameters(request,response) {
    console.log(request.query)
    response.json({
        "name":request.query.first+" "+request.query.last
    })
}

// Get query parameters from URL
app.get("/name",middlewareQueryParameters)

// Set assets avalible in public 
app.use('/public',middlewareStatic)

console.log("Hello world")

// Return a string to root route
function getHandlerString(request,response){
    response.send('Hello Express')
}

// Return a file in handler get
function getHandlerFile(request,response){
    // Define a absolute route for file
    let indexPath = __dirname+'/views/index.html'
    response.sendFile(indexPath)
}

// Return a JSON in handler get
function getHandlerJSON(request,response){
    // Get variable from env file
    let message = ""
    if (process.env.MESSAGE_STYLE == "uppercase"){
        message = "Hello json".toUpperCase()
    }else{
        message = "Hello json"
    }
    
    let jsonObject = {
        "message":message
    }
    response.json(jsonObject)
}

// Call a get method in express app object to return a getHandler function
app.get('/',getHandlerFile)

// Call a get method in express app object to return a getHandler function
app.get('/json',getHandlerJSON)
























 module.exports = app;
