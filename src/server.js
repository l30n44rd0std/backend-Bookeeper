const express = require('express')
const db = require('./db/connect');
const routers = require("./routes/index")

const app = express()
app.use(express.json());
const port = 3000

app.use(routers)


app.listen(port, async () => {
     await db.sync({force:true});
    console.log('server started');
})