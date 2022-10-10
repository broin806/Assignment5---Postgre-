/************************************************************************* * 
 * BTI325– Assignment 2 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part * of this assignment has been copied manually or electronically from any other source * 
 * (including 3rd party web sites) or distributed to other students. * * Name: Broinson Jeyarajah Student ID: 
101501229 Date:  * 2020-10-09 * Your app’s URL (from Cyclic) : 
*************************************************************************/

//required module/path to access the data in the server.js file 
var DATA_SERVICE = require("./data-service.js")

//express.js module
var express = require("express");
var app = express(); //express is a function

var path = require("path"); // include moduel path to use __dirname, and function path.join()

//Server listens on this PORT 
var HTTP_PORT = process.env.PORT || 8080;  

// function which triggers the http server to listen for requests 
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

//"static" middleware for css/site.css 
app.use(express.static('public'));


//HOME AND ABOUT ROUTE 

 // directs to the home route
app.get("/", function (req, res){ //function is represented as the home page
    res.sendFile(path.join(__dirname,"/views/home.html")); //takes the address to home.html
});

//route that returns the about page 
app.get("/about", function(req,res){ //function is represented as the about page 
    res.sendFile(path.join(__dirname,"/views/about.html")); //takes the address to about.html
  }); 



  //ADDITIONAL ROUTES 

//responds to employees page's get requests
app.get("/employees", function(req,res){ //function is represented as the employees page
  res.sendFile(path.join(__dirname,"./data/employees.json"));
  DATA_SERVICE.getAllEmployees().then(function(data){ //Makes the call to the respective get() method to fetch data
    res.json(data);//access the data from the function and send response back to client. 
})
.catch(function(err){//if any methods are intended to become unsuccessful
  res.json({"message" : err});
})

})




  //responds to departments page's get requests
app.get("/departments", function(req,res){ //function is represented as the departments page
    res.sendFile(path.join(__dirname,"./data/departments.json"));
    DATA_SERVICE.getDepartments().then(function(data){ //Makes the call to the respective get() method to fetch data
      res.json(data);//access the data from the function and send response back to client. 
  })
  .catch(function(err){ //if any methods are intended to become unsuccessful
    res.json({"message" : err});
  })

})


 //responds to managers page's get requests
app.get("/managers", function(req,res){ //function is represented as the managers page
    res.sendFile(path.join(__dirname,"./data/managers.json"));
    DATA_SERVICE.getManagers().then(function(data){ //Makes the call to the respective get() method to fetch data
      res.json(data); //access the data from the function and send response back to client. 
  })
  .catch(function(err){ //if any methods are intended to become unsuccessful
    res.json({"message" : err});
  })

})



//setup http server to listen on HTTP_PORT

DATA_SERVICE.initialize().then(function(data){ //call app.listen() and the initialize function is successful. 
app.listen(HTTP_PORT, onHttpStart);

let err = "There is no data to fetch!"; 

}).catch(function(err){// display the catch function as initialize method invoked reject method
  console.log(err);
}) 
















