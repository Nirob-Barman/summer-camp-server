const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


        // create a collection of users



        app.put("/users/:email", async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const query = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };

            try {
                const result = await usersCollection.updateOne(query, updateDoc, options);
                console.log(result);
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error updating user");
            }
        });




        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };

            try {
                const result = await usersCollection.findOne(query);
                console.log(result);
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error fetching user");
            }
        });




        app.get("/users", async (req, res) => {
            try {
                const users = await usersCollection.find().toArray();
                res.send(users);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error fetching users");
            }
        });







        // create a collection with classes


        app.get("/classes", async (req, res) => {
            try {
                const classes = await classesCollection.find().toArray();
                res.send(classes);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error fetching classes");
            }
        });




        app.delete("/classes/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await classesCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error deleting class");
            }
        });




        app.get("/classes/:email", async (req, res) => {
            try {
                const email = req.params.email;
                const query = { instructorEmail: email };
                const result = await classesCollection.find(query).toArray();

                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error retrieving classes");
            }
        });




        app.get("/classes/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const data = await classesCollection.findOne(filter);
                res.send(data);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error retrieving class");
            }
        });




        app.patch("/classes/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const user = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: user,
            };

            const result = await classesCollection.updateOne(filter, updateDoc);
            res.send(result);
        });



        app.post("/classes", async (req, res) => {
            const classData = req.body;
            console.log(classData);
            const result = await classesCollection.insertOne(classData);
            res.send(result);
        });




        // create a collection with bookings

        app.get("/bookings", async (req, res) => {
            try {
                const result = await bookingsCollection.find({}).toArray();
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error retrieving bookings");
            }
        });



        app.get("/bookings/:email", async (req, res) => {
            try {
                const email = req.params.email;
                const query = { studentEmail: email };

                const result = await bookingsCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send("Error retrieving bookings");
            }
        });



        app.patch("/bookings/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const user = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: user,
            };

            const result = await bookingsCollection.updateOne(filter, updateDoc);
            res.send(result);
        });


        app.post("/bookings", async (req, res) => {
            const booking = req.body;
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });



        app.get("/bookings/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const data = await bookingsCollection.findOne(filter);
            res.send(data);
        });



        app.delete("/bookings/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await bookingsCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                console.error("Error deleting booking:", error);
                res.status(500).send("Error deleting booking");
                // Handle the error here
                // You can customize the error response or perform any necessary actions to handle the error.
            }
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
