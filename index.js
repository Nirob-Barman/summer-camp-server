const express = require('express');
const app = express();
const cors = require('cors');
// const jwt = require('jsonwebtoken');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xceqs5c.mongodb.net/?retryWrites=true&w=majority`;


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
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const usersCollection = client.db("campDb").collection("users");
        const classesCollection = client.db("campDb").collection("classes");
        const bookingsCollection = client.db("campDb").collection("bookings");


        // create a collection with users

        // Save user data and role in the Database
        app.put("/users/:email", async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const query = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await usersCollection.updateOne(query, updateDoc, options);
            console.log(result);
            res.send(result);
        });

        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            console.log(result);
            res.send(result);
        });

        // app.get('/users', async (req, res) => {
        //     const result = await usersCollection.find().toArray();
        //     res.send(result);
        // });

        app.get('/users', async (req, res) => {
            try {
                const result = await usersCollection.find().toArray();
                res.send(result);
            } catch (err) {
                console.error('Error retrieving users:', err);
                res.status(500).send('Internal Server Error');
            }
        });


        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const query = { email: user.email }
            const existingUser = await usersCollection.findOne(query);

            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });




        // create a collection with classes

        app.get('/classes', async (req, res) => {
            const result = await classesCollection.find().toArray()
            res.send(result)
        })


        app.delete('/classes/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await classesCollection.deleteOne(query)
            res.send(result)
        })

        app.get("/classes/:email", async (req, res) => {
            const email = req.params.email;
            const query = { instructorEmail: email };
            const result = await classesCollection.find(query).toArray();

            console.log(result);
            res.send(result);
        });

        app.get("/classes/:id", async (req, res) => {
            const id = req.params.id;

            const filter = { _id: new ObjectId(id) };

            const data = await classesCollection.findOne(filter);

            res.send(data);
        });

        app.patch('/classes/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: 'approved'
                },
            };

            const result = await classesCollection.updateOne(filter, updateDoc);
            res.send(result);

        })

        // Save a class in the database
        app.post('/classes', async (req, res) => {
            const classData = req.body
            console.log(classData)
            const result = await classesCollection.insertOne(classData)
            res.send(result)
        })




        // create a collection with bookings

        app.get("/bookings", async (req, res) => {
            const result = await bookingsCollection.find({}).toArray();
            res.send(result);
        });

        
        app.get("/bookings/:email", async (req, res) => {
            const email = req.params.email;
            const query = { studentEmail: email };

            const result = await bookingsCollection.find(query).toArray();
            res.send(result);
        });

        
        app.post("/bookings", async (req, res) => {
            const booking = req.body;
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        

        app.delete("/bookings/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bookingsCollection.deleteOne(query);
            res.send(result);
        });



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Camp is a family experience company')
})

app.listen(port, () => {
    console.log(`Camp is experiencing on port ${port}`);
})
