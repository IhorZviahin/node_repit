const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({path: path.join(process.cwd(), "environments", `${process.env.MODE}.env`)})

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRouter');
const { configs } = require("./configs")

mongoose.connect(configs.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRoutes);
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

app.listen(configs.PORT, () => {
    console.log("Hi");
})

