//Here I setup the addEventListener to the document
document.addEventListener("click", function(e){
  //Here I check if the click is happend on the element which contains the class "edit-me", than do the code. Every function in the addEventListener have parametar which contains all sorts of values one of them is the target
  if(e.target.classList.contains("edit-me")){
    //This is the default browser method where user can type the text
    //I saving the user input in the variable
    let userInput = prompt("Enter your desired new text");
    //Calling the axios, which I import as cdn inside the server.js file in the html temlate.
    //The post have two arguments first argument is the url where we want to send the request. On the second argument we include JS object inside the object we put the data which will the requiest recive
    //Inisde the then method we put the function which will activated only when the requiest is proceed
    //
   axios.post('/update-item',{text: userInput}).then(function(){
     //do somethin interesting here
   }).catch(function(){
     console.log("Please try again later");
   })
  }
  
})