//Importing the express.js and storing it in the variable
let express = require('express');
//Here I importing the mongodb from the samename package which I instaled with npm comand npm install mongodb
let mongodb = require('mongodb');
//Calling the express
let app = express();
//Here I created the variable db which is empty. This variable i use to store the conection for database. It is important taht this variable be on global scope
let db;
//Here i put the connection data from mongo db admin. Important note is that I must use the node 2.2 conncetion data this is because node 3 data for connection was throwing me  the error
let connectionString = 'mongodb://todoappuser:9ORZoTeUChWHNtvp@cluster0-shard-00-00-6hgnx.mongodb.net:27017,cluster0-shard-00-01-6hgnx.mongodb.net:27017,cluster0-shard-00-02-6hgnx.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
//Establishing connectioh with mongoDB. I call the mongodb variable wich held the monogodb package and attach on it the conncet method. Connect method must have 3 arguments. FIrst argument is a conncetion string. Connection string tels the mongo db where and what we will conect to. This is the code form mongoDB admin panel. Because the cod is to long I will store it in the variable and I only here call that varaiable. On third argument we provide the function that the conncet metod will call after it open the connection. This function have 2 parametars and that is the error and client. The second param useNewUrlParse is the mongo db object
mongodb.connect(connectionString,{useNewUrlParser: true}, function(err, client){

  if(err){
    console.error('An error occurred connecting to MongoDB: ', err);
  }else{
  //This will select my mongoDB database
  //Assignin the db to this code I will update the global scope db variable which i use to have CRUD in database
  db = client.db()
  //I calling here that node start listen the port 300 only when we have open connection to mongo db
  //Listening the por 300
  app.listen(300);
  }
});
//This configures express so the express can add input value inside the body of request
app.use(express.urlencoded({extended: false}));
//What will app do when recives the get request on the home page. When user request the homepage with get request then this code triger the anonimus function which have 2 parameters and that is request and resposne
app.get('/', function(req,res){
  //This will display the code block when someone visits our homepage. Here i put the html which will be loaded when someone visit our website. I put this html into the template literals because I want to write inside of it the js code. Here I use the bootstrap for nice UX
  res.send(` 

  <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple To-Do App</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h1 class="display-4 text-center py-1">To-Do App</h1>
    
    <div class="jumbotron p-3 shadow-sm">
      <form action="create-item" method="POST">
        <div class="d-flex align-items-center">
          <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
          <button class="btn btn-primary">Add New Item</button>
        </div>
      </form>
    </div>
    
    <ul class="list-group pb-5">
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #1</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #2</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #3</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
    </ul>
    
  </div>
  
</body>
</html>


  `);
})
//When the browser send the post request with /create-item than do this function. This create item is the action of form
app.post('/create-item', function(req, res){
  //With this req.body.item I pickup the input value and I can use it anywhere I want. "item" is the name proprety of input inside html template
  //Here I on the db variable which is the mongoDB variable put the method of collection. The collection is the row in the mongoDB. This collection method will select the collection with provided name from monogDB in my case it is the 'items' collection
  //InsertOne is the method for mongoDB which creates the new item in that collection. This method recives 2 arguments. First argument is the object and that object will be stored in database. All database itmes in monogo DB are stored as objects. In this insertOne first argument I created object with the key of text and value of the users input. This will crated new document in the database with the key and value as I specify. Secon argument is the anonimus function which will triger after the insertOne creates the item in the collection or database
  db.collection('items').insertOne({text: req.body.item}, function(){
  
    res.send("Thank you for form");
  });
   
})

