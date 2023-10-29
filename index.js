require("dotenv").config()
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('hotel village')
})


const uri = `mongodb+srv://${process.env.PRO_NAME}:${process.env.PRO_PASS}@cluster0.nlw4swl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    try {
        const roomBooksCollection = client.db('hotel-village').collection('hotel');

        app.get('/allProducts',async(req,res) =>{
            const result = await roomBooksCollection.find().toArray()
            res.send(result)
        })
       
        
     
        
      
        
        client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('port console is running')
})