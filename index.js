const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = "mongodb+srv://superadmin:Khemika_2543@cluster0.ged9y.mongodb.net/sample_weatherdata?retryWrites=true&w=majority"

const client = new MongoClient(url, { userNewUrlParser: true, useUnifiedTopology: true})
async function connect() {
    await client.connect()
}
connect()

app.get('/data', async(req, res) =>  {
    try {
        const cuisine = req.query.cuisine
        const borough = req.query.borough
        const db = client.db('sample_weatherdata')
        const collection = db.collection('data')
        let query = {}
        if (cuisine) {
            query.cuisine = cuisine
        }
        if (borough){
            query.borough = borough
        }
        const cursor = collection.find(query).limit(10)
        let data = []
        await cursor.forEach(doc => data.push(doc.name))

        res.send(data)
        } catch(e) {
            console.error(e)
        } 
 })

app.listen(3000, console.log('Start application at port 3000'))
