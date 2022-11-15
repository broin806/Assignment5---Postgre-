/************************************************************************* * 
 * BTI325– Assignment 4 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part * of this assignment has been copied manually or electronically from any other source * 
 * (including 3rd party web sites) or distributed to other students. * * Name: Broinson Jeyarajah 
 * Student ID: 101501229 Date:  * 2020-11-13 * Your app’s URL (from Heroku) : https://hidden-spire-63494.herokuapp.com/
 * 
*************************************************************************/

//REFERENCES 
//https://stackoverflow.com/questions/33355528/filtering-an-array-with-a-function-that-returns-a-promise
//https://www.folkstalk.com/2022/07/how-to-filter-array-objesct-in-express-node-js-with-code-examples-3.html
//https://stackoverflow.com/questions/10987452/handlebars-js-each-data-nested-in-if-data and WEEK 6 NOTES 


var data_service  = require('./data-service.js')
var express = require("express");
var app = express(); //express is a function
var path = require('path'); 
var fs = require('fs');
var HTTP_PORT = process.env.PORT || 8080;  
var multer = require('multer'); //required module
const bodyParser = require("body-parser"); 
var exphbs = require('express-handlebars');


app.engine('.hbs',exphbs.engine({ extname:'.hbs', defaultLayout:'main', 
//Handlebars custom "helper"
helpers:{ navLink:function(url, options){
  return '<li' + ((url==app.locals.activeRoute)? ' class="active"':'')
  +'><a href="'+url+'">'+options.fn(this)+'</a></li>'
},
//Handlebars custom "helper"
equal:function(lvalue, rvalue, options){
    if(arguments.length<3)
        throw new Error("Handlerbars Helper equal needs 2 parameters");
    if(lvalue != rvalue){
        return options.inverse(this);
    }else{
        return options.fn(this);
    }
}
}
}));



app.set('view engine', '.hbs'); 


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


//Fixing the Navigation Bar to Show the correct "active" item
app.use(function(req,res,next){
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
  next();
  });




//HOME AND ABOUT ROUTE 

 // directs to the home route
app.get("/", (req, res)=>{ 
    res.render("home");
   // res.sendFile(path.join(__dirname,"/views/home.html")); //takes the address to home.html
});


// app.get("/home", (req, res)=>{ 
//   res.render(path.join(__dirname,"/views/home.hbs")); //takes the address to home.hbs
// });

//route that returns the about page 
app.get("/about", (req,res)=>{ 
    res.render("about");
    //res.sendFile(path.join(__dirname,"/views/about.html")); //takes the address to about.html
  }); 



  //-----------ADDITIONAL ROUTES 
//Part 4: Adding New Routes to query "Employees"
//responds to employees page's get requests
app.get("/employees", (req,res)=>{ 

  if(req.query.status){ //if query string is for status info
  ///employees?status=value
  data_service.getEmployeesByStatus(req.query.status).then((data)=>{ 
    res.render("employees", {employees:data});//access the data from the function and send response back to client. *JSON String*
      }).catch(()=>{ 
      res.render({message : "no results"});
        //console.log(err);
    });
  }
  
  else if (req.query.department){ //if query string is for department info
    ////employees?department=value
    data_service.getEmployeesByDepartment(req.query.department).then((data)=>{ 
      res.render("employees", {employees:data});//access the data from the function and send response back to client. *JSON String*
        }).catch(()=>{ 
          res.render({message : "no results"});
          //console.log(err);
      })
    }
    
  
    else if (req.query.manager){ //if query string is for managers info
      ////employees?manager=value
      data_service.getEmployeesByManager(req.query.manager).then((data)=>{ 
        res.render("employees", {employees:data});//access the data from the function and send response back to client. *JSON String*
          }).catch(()=>{ 
            res.render({message : "no results"});
            //console.log(err);
        })
  
    }else{ //REQUEST DOESNT CONTAIN STRING and return(s) all employees without filters using *JSON String*
        data_service.getAllEmployees().then((data)=>{ 
          res.render("employees", {employees:data});//access the data from the function and send response back to client. 
            }).catch(()=>{ 
              res.render({message : "no results"});
              //console.log(err);
     });
    }
  })


  app.get("/employee/:empNum",(req,res)=>{
    data_service.getEmployeesByNum(req.params.empNum).then((data)=>{
      res.render("employee", { employee: data });
    }).catch(()=>{ 
      res.render({message : "no results"});
     
    });
  }
)
  

//  //responds to managers page's get requests
//  app.get("/managers", (req,res)=>{ 
//   data_service.getManagers().then((data)=>{ //Makes the call to the respective get() method to fetch data
//       res.json(data); //access the data from the function and send response back to client. 
//   })
//   .catch((err)=>{ 
//     res.json({"message" : err});
//       //console.log(err);

//   })

// }) 

  //responds to departments page's get requests
  app.get("/departments", (req,res) => { 
    data_service.getDepartments().then((data)=>{ //Makes the call to the respective get() method to fetch data
      res.render("departments", {departments: data});//access the data from the function and send response back to client. 
      }).catch(()=>{ 
        res.render({message : "no results"});
        //console.log(err);
  
    })
  
  }) 

  
  


//responds to addEmployees get requests
app.get("/employees/add", (req,res)=>{ 
  res.render("addEmployee");  
  //res.sendFile(path.join(__dirname,"/views/addEmployee.html"));
});

//responds to addImages get requests
app.get("/images/add", (req,res)=>{  
  res.render("addImage");
  // res.sendFile(path.join(__dirname,"/views/addImage.html"));
}); 


 
 //Adding the "Post" route
 app.post("/images/add", upload.single("imageFile"), function(req, res){
   res.redirect("/images") //redirects to route "/image"
 });



 //Adding "Get" route /images using the "fs" module
app.get("/images", (req,res) => {
  fs.readdir("./public/images/uploaded", function(err, items){ //fs.readdir method (display array of images)
   // res.json(items); 
   res.render("images", {data: items, title: "Images"}); 
 })
 })


//route makes a call to the (promise-driven) function from the data-service.js module
app.post("/employees/add", function(req,res){
 //redirects to /employees
 data_service.addEmployee(req.body)
 res.redirect('/employees');
});


app.post("/employee/update", function(req, res){ //Post Route
  console.log(req.body); 
  res.redirect("/employees"); 
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

}).catch(()=>{// display the catch function as initialize method invoked reject method
  console.log("Cannot open files!");
}) 


