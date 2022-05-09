const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// const { initializeApp, applicationDefault, cert } = require('firebase-admin');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const db = getFirestore();

const app = express();
const main = express()
main.use('/app', app)

app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.send(`url: ${req.url} does not exist`)
})

app.post('/getUserInfo', async function (req, res) {
    let { sub } = req.headers
  try {
    let userInfo = db.collection("users").doc(sub).collection("classes")
    let classes = await userInfo.get();
    classes = classes.docs.map(doc => doc.data())
    res.json(classes)
  } catch (error) {
    res.json({error})
  }
});

app.post('/submit', async (req, res) => {
    let payload = req.body
    let { sub } = req.headers
    let classCode = payload.classCode.replace(' ', '').toUpperCase()
    let index = classCode.search(/\d/)
    let area = classCode.substring(0, index)
    let code = classCode.substring(index)

    let classInfo = {
        name: payload.name,
        preReqs: payload.preReqs || [],
        code,
        area,
        description: payload.description || '',
        color: payload.color || '',
        rank: payload.rank || '',
        completed: payload.completed || false,
        id: area + code
    }

    await findUserClass({ payload: classInfo, sub}).set(classInfo)

    res.json()
});

app.post('/delete', (req, res) => {
    let payload = req.body
    let { sub } = req.headers

    findUserClass({ payload, sub }).delete()

    res.json()
});

app.post('/update', async (req, res) => {

    let payload = req.body;
    let classCode = classInfo.area + classInfo.code

    let classInfo = {
        name: payload.name,
        preReqs: payload.preReqs || [],
        code: payload.number,
        area: payload.code,
        description: payload.description,
        color: payload.color,
        rank: payload.rank,
        completed: payload.completed,
        id: classCode
    }

    await db.collection("allClasses").doc(classCode).set(classInfo)
}); 

app.get('/universaldb', async (req, res) => {

    let collection = await db.collection("allClasses").get();
    res.json(collection)
});

function findUserClass({ sub, payload }) {
    // this function will get the ref of a classItem that exists or it will create one
    let { area, code } = payload
    try {
        let data = db.collection("users").doc(sub).collection("classes").doc(area + code)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

exports.app = functions.https.onRequest(main);
