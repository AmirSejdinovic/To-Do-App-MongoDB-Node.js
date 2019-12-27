
//Creating the function which will hendl the li template for ux
function itemTemplate(item){
 return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
 <span class="item-text"> ${item.text} </span>
 <div>
   <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
   <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
 </div>
</li>`;
}

//Initail Page Load Render
//Here I create the map method on array items which I stored in server.js in thml 
let ourHTML = items.map(function(item){
  return itemTemplate(item);
}).join('');
 document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML);
//Create feature
//Creating the variable with value of selector of element
let createField = document.getElementById("create-field");
//Selecting form and adding ti a addeventlistener. And preventig it from defaul behaviou an it is a reloadin a page
document.getElementById("create-form").addEventListener("submit", function(e){
  e.preventDefault();
   //Creating axios post req which will be sennding ghe info from input value
  axios.post('/create-item', {text: createField.value }).then(function(resposne){
     //Create the html for a new item
     //Adding a new item in the ul list
     document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(resposne.data));
     //Reseting the input filed
     createField.value = "";
     //Geting foocus on input field
     createField.focus();
  }).catch();

});


//Here I setup the addEventListener to the document
document.addEventListener("click", function(e){
  //DELETE FEATURE
  if(e.target.classList.contains("delete-me")){
     if(confirm("Do you really want to delete this item permanently?")){
        axios.post('/delete-item', {id: e.target.getAttribute("data-id") }).then(function(){
          e.target.parentElement.parentElement.remove();
        }).catch();
     }
  }
  
  
  //UPDATE
  //Here I check if the click is happend on the element which contains the class "edit-me", than do the code. Every function in the addEventListener have parametar which contains all sorts of values one of them is the target
  if(e.target.classList.contains("edit-me")){
    //This is the default browser method where user can type the text
    //I saving the user input in the variable
    let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
    //Calling the axios, which I import as cdn inside the server.js file in the html temlate.
    //The post have two arguments first argument is the url where we want to send the request. On the second argument we include JS object inside the object we put the data which will the requiest recive
    //Inisde the then method we put the function which will activated only when the requiest is proceed
    //
  if(userInput){
    axios.post('/update-item',{text: userInput, id: e.target.getAttribute("data-id")}).then(function(){
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
    }).catch(function(){
      console.log("Please try again later");
    })
  }
  }
  
})