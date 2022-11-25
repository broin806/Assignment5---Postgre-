//Declared globally and file reading operation
var departments = []; 
var employees = [];
//const fs = require('fs');


const Sequelize = require('sequelize');

var sequelize = new Sequelize('ivcsrfpt', 'ivcsrfpt', 'bztlT6fY-q4Jt4xgRUnsb7ucVtD9X6nv', {
  host: 'peanut.db.elephantsql.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
  ssl: true
  },
  query:{raw: true} 
}); 

sequelize.authenticate().then(()=> console.log('Connection success.')) 

.catch((err)=>console.log("Unable to connect to DB.", err));


exports.initialize = function() //read the corrresponding file 
{
  return new Promise((resolve, reject)=>{
            reject()
      });
}

//exported getAllEmployees() function
exports.getAllEmployees = function(){
  return new Promise((resolve, reject)=>{
            reject()
      });
}


  //exported getManagers() function
  exports.getManagers = function() {
    return new Promise((resolve, reject)=>{
              reject()
        });
  }

//exported getDepartments() function
exports.getDepartments = function(){
  return new Promise((resolve, reject)=>{
            reject()
      });
}


//Adding "addEmployee" function within data-service.js with export property
exports.addEmployee = function(employeeData){
  return new Promise((resolve, reject)=>{
            reject()
      });
}
        



//PART 5: Updating "data-service.js" to support the new "Employees" routes


//getEmployeesByStatus(status) - returns a promise 

exports.getEmployeesByStatus = function(){
  return new Promise((resolve, reject)=>{
            reject()
      });
}


//getEmployeesByDepartment(department) - returns a promise 

exports.getEmployeesByDepartments = function(){
  return new Promise((resolve, reject)=>{
            reject()
      });
}

//getEmployeesByManagers(managers) - returns a promise 

exports.getEmployeesByManager = function(){
  return new Promise((resolve, reject)=>{
            reject()
      });
}


//getEmployeeByNum(num) - returns a promise 

exports.getEmployeesByNum = function()
{
  return new Promise((resolve, reject)=>{
            reject()
      });
}

// Search through the "employees" array for an employee with an employeeNum
exports.updateEmployee = function(){
  return new Promise((resolve, reject)=>{
            reject()
      });
}
