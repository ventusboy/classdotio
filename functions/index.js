const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const result = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const { auth } = require("express-openid-connect");
const session = require("express-session");
const path = require('path');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();
// const uri = "mongodb+srv://dbUser:" + process.env.DBPASSWORD + "@cluster0-8ixoa.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect((err) => { if (err) console.log(err) });

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
    let { email } = req.body

    let userClasses = db.collection("users").doc(email).get();
    userClasses.classes.toArray((err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send({ result });
    });
});

app.post('/submit', (req, res) => {
    // console.log('it worked');
    // console.log(req.body);
    let payload = req.body
    let classCode = classInfo.field + classInfo.number

    let classInfo = {
        preReqs: payload.preReqs || [],
        number: payload.number,
        code: payload.code,
        description: payload.description,
        color: payload.color,
        rank: payload.rank,
        completed: payload.completed,
    }
    // console.log(json.name);

    //mongodb test
    // let userClasses = db.collection("users").doc(email).collection("classes")
    // console.log(json);

    // userClasses.doc(classCode).set(json)
    await findUserClass(payload).set(classInfo)
    /*, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
  
    }); */

    if (!await db.collection("allClasses").get(classCode)) {
        await db.collection("allClasses").doc(classCode).set(classInfo)
    }
    // let universalClasses = db.collection("classes").doc().set();
    // console.log(json);

    /*collection2.find({ area: json.area, code: json.code }).toArray((err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        collection2.insertOne(json, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted in univeral db");
  
        });
      }
    });*/

    // perform actions on the collection object

    // console.log('db_updated!');

});

app.post('/delete', (req, res) => {
    // db.collection("users").doc(email).collection("classes").doc(classCode).delete()
    let payload = req.body
    await findUserClass(payload).delete()
    /*let json = req.body;
  
    let query = { area: json.area, code: json.code, email: json.email };
  
    let collection = client.db("classdotiodb").collection("classdotiodata");
    collection.deleteOne(query, (err, obj) => {
      if (err) throw err;
      console.log('deleted and yeeted');
  
    })*/
});

app.post('/update', (req, res) => {

    console.log('updating');
    let payload = req.body;
    let classCode = classInfo.field + classInfo.number

    let classInfo = {
        preReqs: payload.preReqs || [],
        number: payload.number,
        code: payload.code,
        description: payload.description,
        color: payload.color,
        rank: payload.rank,
        completed: payload.completed,
    }

    await db.collection("allClasses").doc(classCode).set(classInfo)
    /*
    console.log(json._id);
    // let collection = client.db("classdotiodb").collection("classdotiodata");
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
*/
}); 

app.get('/universaldb', function (req, res) {

    let collection = await db.collection("allClasses");
    collection.find({}).toArray((err, result) => {
        if (err) throw err;

        let payload = JSON.stringify(result);

        console.log('payload is ', payload);
        //console.log();

        res.send(payload);
    });
});
function findUserClass({ email, code, number }) {
    // this function will get the ref of a classItem that exists or it will create one
    try {
        return db.collection("users").doc(email).collection("classes").doc(code + number)
    } catch (error) {
        console.log(error)
        return null
    }
}

//module.exports.handler= serverless(app);
exports.app = functions.https.onRequest(app);





