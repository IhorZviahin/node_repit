const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require('./routes/userRoutes')

mongoose.connect('mongodb://localhost:27017/dec-2021');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRoutes);

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        });
});

app.listen(5000, () => {
    console.log("Hi");
})

