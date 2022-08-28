const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const passport = require('passport');


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//     const user = new User({
//         handle: "demo",
//         email: "demo@demo.com",
//         password: "demopassword"
//     })
//     user.save()
//     res.send("Hello World!");
// });

app.get("/", (req, res) => res.send("Hello World!!"));


app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/tweets", tweets);


const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is running on port ${port}`));

