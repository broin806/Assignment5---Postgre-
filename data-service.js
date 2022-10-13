//Declared globally and file reading operation
var fs = require("fs");
var departments = []; 
var employees = [];   
var managers = [];


//exported initialize() function
exports.initialize = () => {//ES6 snytax
    return new Promise((resolve, reject) => { //returns a promise that passes the respective data with 'resolve method'  
      fs.readFile("./data/employees.json", (err, data) => { //reads employees.json within "data" directory on server
        if(err){
          reject("Failure to read file employees.json!");
        }
      else{
        employees = JSON.parse(data); //parsed object 
        fs.readFile("./data/departments.json", (err, data) => { //reads department.json within "data" directory on server
          if(err){
            reject("Failure to read file departments.json!");
          }
        else{
          departments = JSON.parse(data); //parsed object 
          resolve("FILES WAS A SUCCESS"); //only if both operations were successful, invoke resolve method to have promise communicate back to server.js
        
        }
      });
    }
  });
});
} 

//exported getAllEmployees() function
exports.getAllEmployees = () => {

  return new Promise(function(resolve,reject){
    if(employees.length > 0){  //returns full array of employee objects and uses resolve method
    resolve(employees);  //resolve method 
    }
    else{
    reject("No results has been returned.");
    }
});
}


  //exported getManagers() function
  exports.getManagers = () => {

    return new Promise(function(resolve, reject){

    if (employees.length > 0)  //employee array does not equal to 0 
        { 
          for(let e = 0; e < employees.length; i++){ //loop through the employee's dataset 
            if (employees[e].isManager){ //checking to see "employee" object exists in Manager dataset 
            managers.push(employees[e]) //returns the new length of array in the employee set 
            }
          //end of resolve method
            }
            resolve(managers); //resolve method
    }

    else{
        reject("No results returned");
    }
    });

  }

//exported getDepartments() function
exports.getDepartments = () => {

  return new Promise(function(resolve,reject){
    if(departments.length > 0){ //returns full array of department objects and uses resolve method
    resolve(departments); //resolve method 
    }
    else{
    reject("No results has been returned.");
    }
});
}




    