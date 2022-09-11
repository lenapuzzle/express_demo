const port = 8000
const express = require("express")
const app = express()
app.use(express.json());

// // simple get request 
// // using a callback function
// const indexCallBack = (req, res) => {
//     return res.send("This should also work")
// }
// app.get('/', indexCallBack)

// // or shorter way
// app.get('/', (req, res) => {
//     return res.send('Hello from express')
// })

// ... returning json 
app.get('/api', (req, res) => {
    return res.json({hello: 'world'})
})

// retrieving data - get ALL
// get request with mock data (since we don't have a database yet)
app.get('/api/cities', (req, res) => {
    const cities = [
        {
            id: 1,
            name: 'Hiroshima',
            population: 570000,
        },
        {
            id: 2,
            name: 'Boston',
            population: 1300000,
        },
        {
            id: 3,
            name: 'Seattle',
            population: 800000,
        },
    ]
    return res.json(cities)
})

// retrieving data - get ONE city
app.get('/api/city/:id', (req, res) => {
    const {id} = req.params
    const cities = [
        {
            id: 1,
            name: 'Hiroshima',
            population: 570000,
        },
        {
            id: 2,
            name: 'Boston',
            population: 1300000,
        },
        {
            id: 3,
            name: 'Seattle',
            population: 800000,
        },
    ]
    const getOneCity = cities.filter((city) => {
        // console.log(city.id === id);
        if (city.id == id) {
            return city
        }
    })
    return res.json({
        status: "success",
        city: getOneCity
    })

})

// adding data
// post request could be the same route as get request
app.post('/api/cities', (req, res) => {
    console.log(req.body);
    // return res.json(req.body)
    // more descriptive way
    return res.json({
        status: "success",
        city: req.body})
})

// updating data by id
app.put('/api/cities/:id', (req, res) => {
    console.log(req.body, req.params)
    return res.json({
        status: "success",
        message: `Updated city id: ${req.params.id}`,
        updatedCity: req.body
    })
})

// deleting data by id
app.delete('/api/cities/:id', (req, res) => {
    // we can look what we get in our parameters: outcome - {id: '4'}
    console.log(req.params)

    // or this way - destructuring: outcome - 4
    const {id} = req.params;
    console.log(id)

    return res.json({
        status: "success",
        message: `Deleted city id: ${id}`
    })

})



/* This is at the bottom because the server is not ready 
for requests until the routes have been set up */
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})