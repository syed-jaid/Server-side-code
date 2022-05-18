const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PROT || 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
})
