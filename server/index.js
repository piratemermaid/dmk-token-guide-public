// process.env.DEBUG = "*";

const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const accountRouter = require("./routes/account");
const userDataRouter = require("./routes/userData");
const appDataRouter = require("./routes/appData");

const app = express();

// app.use(cors({ origin: "http://localhost:8080" }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/account", accountRouter);
app.use("/api/user", userDataRouter);
app.use("/api/app", appDataRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: "error",
        message: err.message
    });
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
