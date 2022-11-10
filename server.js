/************************************************************************* * 
 * BTI325– Assignment 3 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part * of this assignment has been copied manually or electronically from any other source * 
 * (including 3rd party web sites) or distributed to other students. * * Name: Broinson Jeyarajah 
 * Student ID: 101501229 Date:  * 2020-10-09 * Your app’s URL (from Heroku) : https://frightful-warlock-49079.herokuapp.com/
 * 
*************************************************************************/

//REFERENCES 
//https://stackoverflow.com/questions/33355528/filtering-an-array-with-a-function-that-returns-a-promise
//https://www.folkstalk.com/2022/07/how-to-filter-array-objesct-in-express-node-js-with-code-examples-3.html

var data_service  = require('./data-service.js')
var express = require("express");
var app = express(); //express is a function
var path = require('path'); 
var fs = require('fs');
var HTTP_PORT = process.env.PORT || 8080;  
var multer = require('multer'); //required module
const bodyParser = require("body-parser"); 


// const HTTP_PORT = process.env.PORT || 8080;

//"static" middleware for css/site.css 
app.use(express.static('public'));



// function which triggers the http server to listen for requests 
function onHttpStart(){
  console.log("Express http server listening on: " + HTTP_PORT);
}




//defining a storage variable using "multer.diskStorage"
var storage = multer.diskStorage({
  destination: "./public/images/uploaded",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
}); 

// //body-parser
// //handle form data without file upload.
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));


//Define an "upload" variable as multer({ storage: storage });
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({extended:true}));


//HOME AND ABOUT ROUTE 

 // directs to the home route
app.get("/", (req, res)=>{ 
    res.sendFile(path.join(__dirname,"/views/home.html")); //takes the address to home.html
});

//route that returns the about page 
app.get("/about", (req,res)=>{ 
    res.sendFile(path.join(__dirname,"/views/about.html")); //takes the address to about.html
  }); 



  //-----------ADDITIONAL ROUTES 
//Part 4: Adding New Routes to query "Employees"
//responds to employees page's get requests
app.get("/employees", (req,res)=>{ 

  if(req.query.status){ //if query string is for status info
  ///employees?status=value
  data_service.getEmployeesByStatus(req.query.status).then((data)=>{ 
    res.json(data);//access the data from the function and send response back to client. *JSON String*
      }).catch((err)=>{ 
      res.json({message : err});
        //console.log(err);
    });
  }
  
  else if (req.query.department){ //if query string is for department info
    ////employees?department=value
    data_service.getEmployeesByDepartment(req.query.department).then((data)=>{ 
      res.json(data);//access the data from the function and send response back to client. *JSON String*
        }).catch((err)=>{ 
        res.json({message : err});
          //console.log(err);
      })
    }
    
  
    else if (req.query.manager){ //if query string is for managers info
      ////employees?manager=value
      data_service.getEmployeesByManager(req.query.manager).then((data)=>{ 
        res.json(data);//access the data from the function and send response back to client. *JSON String*
          }).catch((err)=>{ 
          res.json({message : err});
            //console.log(err);
        })
  
    }else{ //REQUEST DOESNT CONTAIN STRING and return(s) all employees without filters using *JSON String*
        data_service.getAllEmployees().then((data)=>{ 
          res.json(data);//access the data from the function and send response back to client. 
            }).catch((err)=>{ 
            res.json({message : err});
              //console.log(err);
     });
    }
  })
    


     app.get("/employee/:empNum",(req,res)=>{
      data_service.getEmployeeByNum(req.params.empNum).then((data)=>{
          res.json(data);
      }).catch((err)=>res.json({message: err}));
  })


   //responds to managers page's get requests
app.get("/managers", (req,res)=>{ 
  data_service.getManagers().then((data)=>{ //Makes the call to the respective get() method to fetch data
      res.json(data); //access the data from the function and send response back to client. 
  })
  .catch((err)=>{ 
    res.json({"message" : err});
      //console.log(err);

  })

}) 

  //responds to departments page's get requests
  app.get("/departments", (req,res) => { 
    data_service.getDepartments().then((data)=>{ //Makes the call to the respective get() method to fetch data
        res.json(data);//access the data from the function and send response back to client. 
      }).catch((err)=>{ 
      res.json({"message" : err});
        //console.log(err);
  
    })
  
  })




//responds to addEmployees get requests
app.get("/employees/add", (req,res)=>{   
  res.sendFile(path.join(__dirname,"/views/addEmployee.html"));
});

//responds to addImages get requests
app.get("/images/add", (req,res)=>{  
  res.sendFile(path.join(__dirname,"/views/addImage.html"));
}); 


 
 //Adding the "Post" route
 app.post("/images/add", upload.single("imageFile"), function(req, res){
   res.redirect("/images") //redirects to route "/image"
 });



 //Adding "Get" route /images using the "fs" module
app.get("/images", (req,res) => {
  fs.readdir("./public/images/uploaded", function(err, items){ //fs.readdir method
    res.json({images:items}); 
    
 })
 })


//route makes a call to the (promise-driven) function from the data-service.js module
app.post("/employees/add", (req,res)=>{
  //redirects to /employees
  data_service.addEmployee(req.body)
    res.redirect('/employees');
});




  


  // data_service.getAllEmployees().then((data)=>{ //Makes the call to the respective get() method to fetch data
  //   res.json(data);//access the data from the function and send response back to client. 

  // }).catch((err)=>{
  // res.json({"message" : err});
  // //console.log(err);







app.use((req,res)=>{ //404 error message
  res.status(404).send("Page Not Found");
});

//setup http server to listen on HTTP_PORT

data_service.initialize().then(()=>{ //call app.listen() and the initialize function is successful. 
app.listen(HTTP_PORT, onHttpStart); //listen on HTTP_PORT 
}).catch(()=>{
  console.log("Cannot open files.");
});





