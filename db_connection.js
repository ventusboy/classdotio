var mysql = require('mysql');
const express=require('express');
//const http = require("http");
const bodyParser=require('body-parser');
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
  con.query("SELECT * FROM classdotiodata1", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    answer=JSON.stringify(result);
    //console.log(answer);
    res.send(answer);
    
    
  });
  
  

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
  //});
});

app.post('/delete',(req,res)=>{

  console.log('deleting '+req.body.id);
  console.log(req.body);
  let sql="DELETE FROM classdotiodata1 WHERE id="+req.body.id+';';
  con.query(sql,function(err,result){
    if(err) throw err;
    console.log('1 record deleted');
  });
});



