const express = require('express')
const app = express()
const cors = require('cors')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const PORT = 8000
const fs = require('fs')

app.use(cors())

let minerals = {
    'UNKNOWN': {
        'formula': 'none'
    }
}


fs.readFile("./minerals.json", 'utf8', (err, data) => {
    if (err) {
        console.error(err)
    }

    try {
        const mineralData = JSON.parse(data)
        Object.assign(minerals, mineralData)
    } catch (err) {
        console.error(err)
    }
})


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/minerals', (request, response) => {
    // const mineralName = request.params.name.toLowerCase()
    // if (minerals[mineralName]) {
    response.json(minerals)
})


app.get('/api/:name', (request, response) => {
    const mineralName = request.params.name.toLowerCase()
    if (minerals[mineralName]) {
        response.json(minerals[mineralName])
    }
    else {
        response.json(minerals['UNKNOWN'])
    }
})



function start() {
    // await fetchMineralList()

    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on port ${PORT}!!`)
    })
}


start()

