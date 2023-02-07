const model = require("./model");
const mongoose = require('mongoose');
var tech = require("express");
const bodyParser = require("body-parser");
var app = tech();
const PORT = 4000;

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

mongoose.set('strictQuery', false);

app.use(bodyParser.json());

app.delete('/delete/:_id', async (req, res) => {
    let users = await model.deleteOne({ _id: req.params._id });
    res.send(users);
})

app.patch("/update/:_id", function (req, res) {
    model.findOneAndUpdate({ _id: req.params._id }, { $set: req.body })
        .then((a) => res.json(a))
        .catch((err) => res.status(400).json("Error: " + err));
})

app.get("/show", async (req, res) => {
    let users = await model.find({});
    res.send(users);
})

app.post("/create", (req, res) => {
    let user = new model(req.body);
    user.save().then((a) => { res.send(a) });
});

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
    useNewUrlParser: true
})

mongoose.connection.once("open", () => {
    console.log("Connected to Mongoose");
})

app.listen(PORT, () => {
    console.log("port is connected")
})