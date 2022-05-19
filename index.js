const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.BD_NAME}:${process.env.BD_PASS}@finalproject.4pehg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const TASK_Collection = client.db('TASK').collection('Data')

        // posting the user task data
        app.post('/Task', async (req, res) => {
            const UserTask = req.body;
            const result = await TASK_Collection.insertOne(UserTask);
            res.send(result);
        })

        // getting the user task data
        app.get('/Task', async (req, res) => {
            const email = req.query.email;
            console.log(email)
            const query = { email: email };
            const result = await TASK_Collection.find(query).toArray();
            res.send(result);
        })

        // updateing the user task data
        app.put('/Task/:id', async (req, res) => {
            const id = req.params
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    done: `done`
                },
            };
            const result = await TASK_Collection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
        // deleteing the user task data
        app.delete('/Task/:id', async (req, res) => {
            const id = req.params
            const query = { _id: ObjectId(id) };
            const result = await TASK_Collection.deleteOne(query);
            res.send(result);
        })

    } finally {
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World From Add Task !!!!!!!!!!!!!!')
})

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})
