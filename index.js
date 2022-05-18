const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PROT || 5000

app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.BD_NAME}:${process.env.BD_PASS}@finalproject.4pehg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const TASK_Collection = client.db('TASK').collection('Data')

        app.post('/addTask', async (req, res) => {
            const UserTask = req.body;
            const result = await TASK_Collection.insertOne(UserTask);
            console.log(result)
            res.send(result);
        })

    } finally {
        //   await client.close();
    }



}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World From Add Task!')
})

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})
