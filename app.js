const express = require("express");

const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRoutes);

app.use("*",(req, res)=>{
    res.status(404).json("Route not found");
})

app.listen(5000, () => {
    console.log("Hi");
})

