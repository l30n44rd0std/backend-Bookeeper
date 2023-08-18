const express = require('express')
const db = require('./db/connect');
const routers = require("./routes/index")

const app = express()


app.use(express.json());
const port = 3005

app.use(routers)


app.listen(port, async () => {
     await db.sync({force:false});
    console.log('server started');
})