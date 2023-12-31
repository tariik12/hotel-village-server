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
        const services3Collection = client.db('hotel-village').collection('services3');
        const hotelServicesCollection = client.db('hotel-village').collection('hotelServicesData');
        
        app.get('/hotelServicesData',async(req,res) =>{
            const result = await hotelServicesCollection.find().toArray()
            res.send(result)
        })

        app.post('/hotelServicesData', async (req, res) => {
            const newData = req.body;
      
            try {
              const result = await hotelServicesCollection.insertOne(newData);
              res.status(201).json(result);
            } catch (err) {
              console.error('Error creating data:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
        
          app.patch('/hotelServicesData/:id', async (req, res) => {
            const Id = req.params.id;
            const updatedTaskData = req.body;
            try {
              const result = await hotelServicesCollection.updateOne(
                { _id: new ObjectId(Id) },
                { $set: updatedTaskData }
              );
      
              if (result.matchedCount === 0) {
                res.status(404).json({ error: 'Task not found' });
              } else {
                res.json({ message: 'Task updated successfully' });
              }
            } catch (err) {
              console.error('Error updating task:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          }); 

          app.delete('/hotelServicesData/:id', async (req, res) => {
            const Id = req.params.id;
      
            try {
              const result = await hotelServicesCollection.deleteOne({
                _id: ObjectId(Id),
              });
              if (result.deletedCount === 0) {
                res.status(404).json({ error: 'data not found' });
              } else {
                res.json({ message: 'data deleted successfully' });
              }
            } catch (err) {
              console.error('Error deleting data:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
      
  
        app.get('/allProducts',async(req,res) =>{
            const result = await roomBooksCollection.find().toArray()
            res.send(result)
        })

        app.get('/services3',async(req,res) =>{
            const result = await services3Collection.find().toArray()
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