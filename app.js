//require('dotenv').config()
//require('dotenv').config({ path: path.join(process.cwd(), 'environments', `${process.env.MODE}dev.env`)})
const express = require("express");
const expressFileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');
require('dotenv').config({path: path.join(process.cwd(), 'environments', `dev.env`)});

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRouter');
const {configs} = require("./configs")
const {NODE_ENV, CORS_WHITE_LIST} = require("./configs/config");
const CronRun = require("./cron");

mongoose.connect(configs.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (NODE_ENV !== 'prod') {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

//app.use(cors(_configureCors()));
app.use(expressFileUpload());
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
    console.log(`Hi my PORT ${configs.PORT}`);
    CronRun();
});

function _configureCors  () {
    const whitelist = CORS_WHITE_LIST.split(";");

    return {
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) {
               return  callback(null, true);
            } else {
                callback(new Error("Not allowed by Cors"));
            }
        }
    }
}

