const result = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { auth } = require("express-openid-connect");
const session = require("express-session");
const path = require('path');

const uri = "mongodb+srv://dbUser:" + process.env.DBPASSWORD + "@cluster0-8ixoa.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => { if (err) console.log(err) });

const PORT = process.env.PORT || 5000;

app = express();
//app.set('view engine', 'ejs');
//app.set('views', './views');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static('src'));
app.use(bodyParser.json());


/*
app.use(
  session({
    secret: process.env.APP_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true
    }
  })
)
//app.listen(3000, function() {
  //console.log('Example app listening on port 3000!');
//});

app.use(
  auth({
    required: req => req.originalUrl !== "/"
  })
)
*/
//app.use("/api", require("./api"))


app.post('/payload', function (req, res) {
  var answer;

  console.log(req.body)

  let collection = client.db("classdotiodb").collection("classdotiodata");
  collection.find({ email: req.body.email }).toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ result });
  });
});

/*
app.get('/',function(req,res){
    //res.writeHead(200,"")
    res.render('index');
    console.log('rendered!');
    
});
*/

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post('/submit', (req, res) => {
  console.log('it worked');
  console.log(req.body);
  let json = req.body;
  console.log(json.name);

  //mongodb test
  let collection = client.db("classdotiodb").collection("classdotiodata");
  console.log(json);

  collection.insertOne(json, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");

  });

  let collection2 = client.db("classdotiodb").collection("universaldb");
  console.log(json);

  collection2.find({ area: json.area, code: json.code }).toArray((err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      collection2.insertOne(json, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted in univeral db");

      });
    }
  });

  // perform actions on the collection object

  console.log('db_updated!');

});

app.post('/delete', (req, res) => {
  let json = req.body;

  let query = { area: json.area, code: json.code, email: json.email };

  let collection = client.db("classdotiodb").collection("classdotiodata");
  collection.deleteOne(query, (err, obj) => {
    if (err) throw err;
    console.log('deleted and yeeted');

  })
});

app.post('/update', (req, res) => {

  console.log('updating');
  let json = req.body;


  console.log(json._id);
  let collection = client.db("classdotiodb").collection("classdotiodata");
  let query = { area: json.area, code: json.code, email: json.email };

  let newvals = {
    $set: {
      name: json.name,
      completed: json.completed,
      pre: JSON.stringify(json.pre),
      color: json.color,
      rank: json.rank,
      //email: json.email
    }
  };

  collection.updateOne(query, newvals, function (err, res) {
    if (err) throw err;
    console.log(newvals);
    console.log("1 document updated");

  });

  let collection2 = client.db("classdotiodb").collection("universaldb");
  console.log(json);

  collection2.updateOne(query, newvals, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      collection2.insertOne(json, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted in univeral db");

      });
    }
  });
  // perform actions on the collection object

  console.log('db_updated!');
});

app.get('/universaldb', function (req, res) {

  let collection = client.db("classdotiodb").collection("universaldb");
  collection.find({}).toArray((err, result) => {
    if (err) throw err;

    let payload = JSON.stringify(result);

    console.log('payload is ', payload);
    //console.log();

    res.send(payload);
  });
});

//module.exports.handler= serverless(app);
app.listen(PORT);



