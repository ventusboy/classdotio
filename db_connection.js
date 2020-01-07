require('dotenv').config();
//var mysql = require('mysql');

//const serverless = require('serverless-http');
const express=require('express');
const bodyParser=require('body-parser');
//const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const uri = "mongodb+srv://dbUser:"+process.env.DBPASSWORD+"@cluster0-8ixoa.mongodb.net/classdotiodb";
const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true});
client.connect((err)=>{if (err) console.log(err)});


app=express();
//app.set('view engine', 'ejs');
//app.set('views', './views');
app.use(express.static(path.join(__dirname,'public')));

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "classdotiodb"
  //password: "12345"
});*/




//app.listen(3000, function() {
  //console.log('Example app listening on port 3000!');
//});

app.use(express.static('src'));
app.use(bodyParser.json());

/*con.connect(function(err) {
  if (err) throw err;
  
});
*/
app.get('/payload',function(req,res){
  var answer;

  let collection=client.db("classdotiodb").collection("classdotiodata");
  collection.find({}).toArray((err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

/*
app.get('/',function(req,res){
    //res.writeHead(200,"")
    res.render('index');
    console.log('rendered!');
    
});
*/


app.post('/submit',(req,res)=>{
  console.log('it worked');
  console.log(req.body);
  let json=req.body;
  console.log(json.name);

  //mongodb test
  let collection = client.db("classdotiodb").collection("classdotiodata");
  console.log(json);

  collection.insertOne(json, function(err, res){
    if (err) throw err;
    console.log("1 document inserted");
    
  });

  let collection2 = client.db("classdotiodb").collection("universaldb");
  console.log(json);

  collection2.find({area: json.area, code: json.code }).toArray((err,result)=>{
    if (err) throw err;
    if(result.length==0){
      collection2.insertOne(json, function(err, res){
        if (err) throw err;
        console.log("1 document inserted in univeral db");
        
      });
    }
  });

  // perform actions on the collection object

  console.log('db_updated!');

});

app.post('/delete',(req,res)=>{
  let json=req.body;

  let query={area: json.area, code: json.code};

  let collection=client.db("classdotiodb").collection("classdotiodata");
  collection.deleteOne(query,(err, obj)=>{
    if(err) throw err;
    console.log('deleted and yeeted');

  })
});

app.post('/update', (req,res)=>{

  console.log('updating');
  let json=req.body;

  
  console.log(json._id);
  let collection = client.db("classdotiodb").collection("classdotiodata");
  let query={area: json.area, code: json.code};

  let newvals={ $set: {
    name: json.name,
    completed: json.completed,
    pre: JSON.stringify(json.pre),
    color: json.color,
    rank: json.rank
  }};

  collection.updateOne(query,newvals,function(err, res){
    if (err) throw err;
    console.log(newvals);
    console.log("1 document updated");
    
  });

  let collection2 = client.db("classdotiodb").collection("universaldb");
  console.log(json);

  collection2.updateOne(query,newvals,(err,result)=>{
    if (err) throw err;
    if(result.length==0){
      collection2.insertOne(json, function(err, res){
        if (err) throw err;
        console.log("1 document inserted in univeral db");
        
      });
    }
  });
    // perform actions on the collection object

    console.log('db_updated!');
});

app.get('/universaldb',function(req,res){

  let collection=client.db("classdotiodb").collection("universaldb");
  collection.find({}).toArray((err, result)=>{
    if (err) throw err;
    
    let payload=JSON.stringify(result);

    console.log('payload is');
    console.log(payload);

    res.send(payload);
  });
});

//module.exports.handler= serverless(app);
app.listen(8080);



