const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://uvaups9yrgncznnemavn:zsok8BVyIYJXxZsFQgtG@bztbnxskekqbxeh-mongodb.services.clever-cloud.com:27017/bztbnxskekqbxeh";
const DATABASE_NAME = "bztbnxskekqbxeh";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var database, customer_collection, order_collection;

app.get('/api/customers', (req, res) => {
    customer_collection.find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
})

app.get('/api/orders/customer/:customer_id', (req, res) => {
    var customer_id = req.params.customer_id;
    order_collection.find({"customer_id": customer_id}).toArray((error, result) => {

        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });   
})

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        customer_collection = database.collection("customers");
        order_collection = database.collection("orders");
        console.log("Connected to `" + DATABASE_NAME + "`!");
        console.log('Listening on localhost:5000');
      });
  });