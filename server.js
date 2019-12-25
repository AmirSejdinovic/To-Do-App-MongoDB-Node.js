//Importing the express.js and storing it in the variable
let express = require('express');
//Calling the express
let app = express();
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
   console.log(req.body.item);
   res.send("Thank you for form");
})

//Listening the por 300
app.listen(300);