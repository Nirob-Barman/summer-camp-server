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


        
        // const usersCollection = client.db("campDb").collection("users");
        // const classesCollection = client.db("campDb").collection("classes");
        // const bookingsCollection = client.db("campDb").collection("bookings");


        // // create a collection of users



        // app.put("/users/:email", async (req, res) => {
        //     const email = req.params.email;
        //     const user = req.body;
        //     const query = { email: email };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: user,
        //     };

        //     try {
        //         const result = await usersCollection.updateOne(query, updateDoc, options);
        //         console.log(result);
        //         res.send(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error updating user");
        //     }
        // });




        // app.get("/users/:email", async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email: email };

        //     try {
        //         const result = await usersCollection.findOne(query);
        //         console.log(result);
        //         res.send(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error fetching user");
        //     }
        // });




        // app.get("/users", async (req, res) => {
        //     try {
        //         const users = await usersCollection.find().toArray();
        //         res.send(users);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error fetching users");
        //     }
        // });







        // // create a collection with classes


        // app.get("/classes", async (req, res) => {
        //     try {
        //         const classes = await classesCollection.find().toArray();
        //         res.send(classes);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error fetching classes");
        //     }
        // });




        // app.delete("/classes/:id", async (req, res) => {
        //     try {
        //         const id = req.params.id;
        //         const query = { _id: new ObjectId(id) };
        //         const result = await classesCollection.deleteOne(query);
        //         res.send(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error deleting class");
        //     }
        // });




        // app.get("/classes/:email", async (req, res) => {
        //     try {
        //         const email = req.params.email;
        //         const query = { instructorEmail: email };
        //         const result = await classesCollection.find(query).toArray();

        //         res.send(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error retrieving classes");
        //     }
        // });




        // app.get("/classes/:id", async (req, res) => {
        //     try {
        //         const id = req.params.id;
        //         const filter = { _id: new ObjectId(id) };
        //         const data = await classesCollection.findOne(filter);
        //         res.send(data);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error retrieving class");
        //     }
        // });




        // app.patch("/classes/:id", async (req, res) => {
        //     const id = req.params.id;
        //     // console.log(id);
        //     const user = req.body;
        //     const filter = { _id: new ObjectId(id) };
        //     const updateDoc = {
        //         $set: user,
        //     };

        //     const result = await classesCollection.updateOne(filter, updateDoc);
        //     res.send(result);
        // });



        // app.post("/classes", async (req, res) => {
        //     const classData = req.body;
        //     console.log(classData);
        //     const result = await classesCollection.insertOne(classData);
        //     res.send(result);
        // });




        // // create a collection with bookings

        // app.get("/bookings", async (req, res) => {
        //     try {
        //         const result = await bookingsCollection.find({}).toArray();
        //         res.send(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error retrieving bookings");
        //     }
        // });



        // app.get("/bookings/:email", async (req, res) => {
        //     try {
        //         const email = req.params.email;
        //         const query = { studentEmail: email };

        //         const result = await bookingsCollection.find(query).toArray();
        //         res.send(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Error retrieving bookings");
        //     }
        // });



        // app.patch("/bookings/:id", async (req, res) => {
        //     const id = req.params.id;
        //     // console.log(id);
        //     const user = req.body;
        //     const filter = { _id: new ObjectId(id) };
        //     const updateDoc = {
        //         $set: user,
        //     };

        //     const result = await bookingsCollection.updateOne(filter, updateDoc);
        //     res.send(result);
        // });


        // app.post("/bookings", async (req, res) => {
        //     const booking = req.body;
        //     console.log(booking);
        //     const result = await bookingsCollection.insertOne(booking);
        //     res.send(result);
        // });



        // app.get("/bookings/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: new ObjectId(id) };
        //     const data = await bookingsCollection.findOne(filter);
        //     res.send(data);
        // });



        // app.delete("/bookings/:id", async (req, res) => {
        //     try {
        //         const id = req.params.id;
        //         const query = { _id: new ObjectId(id) };
        //         const result = await bookingsCollection.deleteOne(query);
        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error deleting booking:", error);
        //         res.status(500).send("Error deleting booking");
        //         // Handle the error here
        //         // You can customize the error response or perform any necessary actions to handle the error.
        //     }
        // });



        const usersCollection = client.db("smcDb").collection("users");
        const classCollection = client.db("smcDb").collection("classes");
        const selectedClassCollection = client.db("smcDb").collection("selectedClasses");



        // user collection
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        app.get('/users/role', async (req, res) => {
            try {
                const email = req.query.email;

                const user = await usersCollection.findOne({ email });

                if (!user) { return res.status(404).json({ error: 'User not found' }); }

                const role = user.role;
                // console.log('Server role: ' + role);
                res.json(role);
                // res.send(role);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        // Define the route to handle role updates for users
        app.patch('/users/:id', async (req, res) => {
            try {

                const { id } = req.params;
                const { role } = req.body;

                // Validate the role to prevent unauthorized role changes (optional)
                const validRoles = ['student', 'instructor', 'admin'];
                if (!validRoles.includes(role)) {
                    return res.status(400).json({ error: 'Invalid role' });
                }

                // Assuming usersCollection is a valid MongoDB collection reference
                const updatedUser = await usersCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { role } },
                    { returnOriginal: false } // Return the updated document
                );

                if (!updatedUser.value) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.json(updatedUser.value);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log('User: ', user);

            const query = { email: user.email }
            const existingUser = await usersCollection.findOne(query);
            // console.log('Existing user: ', existingUser);
            // google or another social login
            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        })













        // class collection

        // GET endpoint for retrieving classes
        app.get('/classes', async (req, res) => {
            try {
                const classes = await classCollection.find().toArray();
                res.send(classes);
            }
            catch (error) {
                console.error('Error retrieving classes:', error)
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        // GET endpoint for retrieving user classes by email
        app.get('/classes/instructor', async (req, res) => {
            try {
                // console.log(req.body);
                // console.log(req.query);
                const { email } = req.query;
                // const email = req.query.email;

                console.log("Server Email: ", email);
                // const userClasses = await classCollection.find({ email }).toArray();
                // res.send(userClasses);
                const classes = await classCollection.find({ email: email }).toArray();
                res.json(classes);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        app.post('/classes', async (req, res) => {
            try {
                const addedClass = req.body;
                const result = await classCollection.insertOne(addedClass);
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        // Implement the endpoint to update the class status
        // PATCH endpoint to update the class status
        app.patch('/classes/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { status } = req.body;

                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid class ID' });
                }

                const updatedClass = await classCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { status } },
                    { returnOriginal: false }
                );

                if (!updatedClass.value) {
                    return res.status(404).json({ error: 'Class not found' });
                }

                res.json(updatedClass.value);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // GET endpoint for retrieving feedback for a specific class
        app.get('/classes/:id/feedback', async (req, res) => {
            try {
                const { id } = req.params;

                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid class ID' });
                }

                // const classCollection = client.db(dbName).collection('classes');
                const classData = await classCollection.findOne({ _id: new ObjectId(id) });

                if (!classData) {
                    return res.status(404).json({ error: 'Class not found' });
                }

                const feedback = classData.feedback || 'No feedback available';
                res.json({ feedback });
            } catch (error) {
                console.error('Error retrieving class feedback:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // POST endpoint to update the class feedback
        app.post('/classes/:id/feedback', async (req, res) => {
            try {
                const { id } = req.params;
                const { feedback } = req.body;
                console.log(feedback);

                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid class ID' });
                }

                const classCollection = client.db("smcDb").collection("classes");
                const updatedClass = await classCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { feedback } },
                    { returnOriginal: false }
                );

                if (!updatedClass.value) {
                    return res.status(404).json({ error: 'Class not found' });
                }

                res.json(updatedClass.value);
            } catch (error) {
                console.error('Error handling feedback:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


















        // Enrolled classes

        // const selectedClassCollection = client.db("smcDb").collection("selectedClasses");

        // Create a new class
        app.post('/selectClasses', async (req, res) => {
            try {
                const classData = req.body; // Class data received from the client
                // Omit the _id field to let MongoDB generate a unique identifier
                // delete classData._id;

                const result = await selectedClassCollection.insertOne(classData);

                res.send(classData);

            } catch (error) {
                console.error('Error creating class:', error);
                res.status(500).json({ error: 'Server error' });
            }
        });


        app.get('/selectClasses/:email', async (req, res) => {
            try {
                // const userEmail = req.query.email; // Get the user's email from the query parameter

                const email = req.params.email;
                const query = { enrolledEmail: email };

                // Fetch the classes selected by the user based on their email
                const selectedClasses = await selectedClassCollection.find(query).toArray();

                res.status(200).json(selectedClasses);
            } catch (error) {
                console.error('Error fetching selected classes:', error);
                res.status(500).json({ error: 'Server error' });
            }
        });


        // app.delete('/selectClasses/:classId', async (req, res) => {
        //     try {
        //         const classId = req.params.classId;
        //         const query = { _id: new ObjectId(id) };

        //         // Delete the selected class by classId and userEmail
        //         const result = await selectedClassCollection.deleteOne(query);

        //         if (result.deletedCount === 1) {
        //             res.status(200).json({ message: 'Class deleted successfully' });
        //         } else {
        //             res.status(404).json({ error: 'Class not found or unauthorized' });
        //         }
        //     } catch (error) {
        //         console.error('Error deleting class:', error);
        //         res.status(500).json({ error: 'Server error' });
        //     }
        // });

        app.put('/selectClasses/:classId', async (req, res) => {
            try {
                const classId = req.params.classId;
                const { paymentStatus } = req.body;

                // Update the selected class by classId
                const result = await selectedClassCollection.updateOne(
                    { _id: new ObjectId(classId) },
                    { $set: { paymentStatus } }
                );

                if (result.matchedCount === 1 && result.modifiedCount === 1) {
                    res.status(200).json({ message: 'Payment status updated successfully' });
                } else {
                    res.status(404).json({ error: 'Class not found or unauthorized' });
                }
            } catch (error) {
                console.error('Error updating payment status:', error);
                res.status(500).json({ error: 'Server error' });
            }
        });

        app.delete('/selectClasses/:classId', async (req, res) => {
            try {
                const classId = req.params.classId;
                const query = { _id: new ObjectId(classId) }; // Use ObjectId to create a new instance

                // Delete the selected class by classId
                const result = await selectedClassCollection.deleteOne(query);

                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Class deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Class not found or unauthorized' });
                }
            } catch (error) {
                console.error('Error deleting class:', error);
                res.status(500).json({ error: 'Server error' });
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
