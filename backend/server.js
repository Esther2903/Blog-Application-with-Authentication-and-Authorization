const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./src/routers/UserRouter');
const articleRouter = require('./src/routers/ArticlesRouter')

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000
const uri = process.env.MONGODB_URI

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);


mongoose
    .connect(uri)
    .then(()=>console.log(`Connected to MongoDB`))
    .catch((err)=>console.log(err))

app.get("/", (req, res) => {
        res.send("Welcome to my web server, this is my blog application");
});

app.listen(PORT, () => console.log(`Listening on: ${PORT}`))