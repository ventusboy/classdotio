require('dotenv').config();

var mysql = require('mysql');
const express=require('express');
const bodyParser=require('body-parser');
//const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://dbUser:"+process.env.DBPASSWORD+"@cluster0-8ixoa.mongodb.net/classdotiodb";
const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true});
client.connect((err)=>{if (err) console.log(err)});

//console.log(process.env.DBPASSWORD);
/*const client = new MongoClient;/*(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true });
  client.connect(err => {
  const collection = client.db("classdotiodb").collection("classdotiodata");
  // perform actions on the collection object
  console.log('db_created!');
  client.close();
});*/



app=express();
app.set('view engine', 'ejs');
app.set('views', './views');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "classdotiodb"
  //password: "12345"
});




app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

app.use(express.static('public'));
app.use(bodyParser.json());

con.connect(function(err) {
  if (err) throw err;
  
});

app.get('/payload',function(req,res){
  var answer;

  /*
  con.query("SELECT * FROM classdotiodata1", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    answer=JSON.stringify(result);
    //console.log(answer);
    res.send(answer);
    
    
  });
  */

  
    //if(err) throw err;

    let collection=client.db("classdotiodb").collection("classdotiodata");
    collection.find({}).toArray((err, result)=>{
      if(err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
      //client.close();
    });
 // });
  

});


app.get('/',function(req,res){
    //res.writeHead(200,"")
    res.render('index');
    console.log('rendered!');
    
});



app.post('/submit',(req,res)=>{
  console.log('it worked');
  console.log(req.body);
  let json=req.body;
  console.log(json.name);

  //mongodb test
  /*const client = new MongoClient(uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
  });*/

 

 // client.connect(err => {
    //if (err) throw err;
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
    //client.close();

  //});
  

  /*
  //end test
  //var item=JSON.parse(req.body);
  var values=[[json.name,json.code,json.area,json.completed,JSON.stringify(json.pre),json.color,json.rank]];

  //con.connect(function(err) {
    //if (err) throw err;
    console.log("Connected!");
    let sql = "INSERT INTO classdotiodata1 (name, code, area, completed, pre, color, rank) VALUES ?";
    con.query(sql,[values],function(err,result){
      if(err) throw err;
      console.log("1 record inserted");
    });
    let vals2=[[json.name,json.code,json.area,JSON.stringify(json.pre),json.area+json.code]];
    let sql2="INSERT INTO allclasses (name, code, area, pre, universalid) VALUES ?"
    con.query(sql2, [vals2],function(err,result){
      if(err) throw err;
      console.log('1 record inserted into universal DB');

    });
  //});
  */
});

app.post('/delete',(req,res)=>{
  let json=req.body;

  let query={area: json.area, code: json.code};

  let collection=client.db("classdotiodb").collection("classdotiodata");
  collection.deleteOne(query,(err, obj)=>{
    if(err) throw err;
    console.log('deleted and yeeted');

  })
  /*
  console.log('deleting '+req.body._id);
  console.log(req.body);
  let sql="DELETE FROM classdotiodata1 WHERE id="+req.body._id+';';
  con.query(sql,function(err,result){
    if(err) throw err;
    console.log('1 record deleted');
  });*/
});

app.post('/update', (req,res)=>{

  console.log('updating');
  let json=req.body;

  //client.connect(err => {
    //if (err) throw err;
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
    //client.close();

  //});
  /*console.log(req.body);
  let json=req.body;
  
  let data= [json.name, json.completed, JSON.stringify(json.pre), json.color, json.rank, json._id];
  let sql="UPDATE classdotiodata1 SET name = ? , completed = ? , pre = ? , color = ? , rank = ? WHERE id = ? ; ";
  con.query(sql,data,function(err,result, fields){
    if(err) throw err;
    console.log('updated:');
    console.log(result);
  });

  /*let data2=[json.name,json.code,json.area,JSON.stringify(json.pre),json.area+json.code]
  con.query(sql2, [vals2],function(err,result){
    if(err) throw err;
    console.log('1 record inserted into universal DB');

  });*/
});

app.get('/universaldb',function(req,res){

  let collection=client.db("classdotiodb").collection("universaldb");
  collection.find({}).toArray((err, result)=>{
    if (err) throw err;
    
    let payload=JSON.stringify(result);

    res.send(payload);
  });

  /*
  let sql='SELECT * FROM allclasses';
  con.query(sql,(err, result)=>{
    if(err) throw err;

    let payload=JSON.stringify(result);
    console.log(payload);
    res.send(payload);
  })*/
})



