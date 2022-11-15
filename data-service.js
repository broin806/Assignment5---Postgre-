//Declared globally and file reading operation
var departments = []; 
var employees = [];
const fs = require('fs');


exports.initialize = function() //read the corrresponding file 
{
  return new Promise((resolve, reject)=>{
     
      fs.readFile('./data/employees.json',(err,data)=>{ //read employees data
          if (err) reject("Failure to read file employees.json!");
          employees = JSON.parse(data);
      
      fs.readFile('./data/departments.json',(err,data)=>{ //read departments data
          if (err) reject("Failure to read file department.json!");
          departments = JSON.parse(data);
         // both employees and departments read successfully
         resolve();
      });
    })
  }); 
}

//exported getAllEmployees() function
exports.getAllEmployees = function(){
  return new Promise((resolve,reject)=>{
      if (employees.length > 0)
        resolve(employees);
      else
          reject("No results returned.");
  });
}


  //exported getManagers() function
  exports.getManagers = function() {
    return new Promise(function(resolve, reject){
      let managers = [];

      employees.forEach(function (employee) {
        if (employee.isManager) {
            managers.push(employee);
        }
    });
    
if (managers.length>0)
    resolve(managers);
else
    reject("No results returned.");
});
}

//exported getDepartments() function
exports.getDepartments = function(){

  return new Promise(function(resolve,reject){
    if(departments.length > 0){ //returns full array of department objects and uses resolve method
    resolve(departments); //resolve method 
    }
    else {
    reject("No results has been returned.")
    }
})
} 


//Adding "addEmployee" function within data-service.js with export property
exports.addEmployee = function(employeeData){ //function
      return new Promise(function(resolve,reject){
      if(!employeeData.isManager) { //If employeeData.isManager is undefined
            employeeData.isManager = false;
      }
      else{ //else set it to true
        employeeData.isManager = true;
      }
      // set the employeeNum property of data to be the length of the "employees" array plus one (1).
      employeeData.employeeNum = employees.length + 1;  
      //Push the updated employeeData object onto the "employees" array
      employees.push(employeeData); 
      resolve();
    }); 
  }
  

        



//PART 5: Updating "data-service.js" to support the new "Employees" routes


//getEmployeesByStatus(status) - returns a promise 

exports.getEmployeesByStatus = function(emp_status){
  return new Promise((resolve, reject) => {
    //array of employee objects
      let Employee_Filters = employees.filter(employees => employees.status == emp_status);

      //resolve method of filtered array 
      resolve(Employee_Filters);

      if(Employee_Filters.length == 0) //if 0 in set, function is invoked with reject method
      reject("no results returned");
  });
} 



//getEmployeesByDepartment(department) - returns a promise 

exports.getEmployeesByDepartments = function(department){
  return new Promise((resolve, reject) => {
    //array of employee objects
      let Department_Filters = departments.filter(employees => employees.department == department);

      //resolve method of filtered array 
      resolve(Department_Filters);

      if(Department_Filters.length == 0) //if 0 in set, function is invoked with reject method
      reject("no results returned");
  });
}

//getEmployeesByManagers(managers) - returns a promise 

exports.getEmployeesByManager = function(manager){
  return new Promise((resolve, reject) => {
    //array of employee objects
      let Managers_Filters = employees.filter(employees => employees.employeeManagerNum == manager);

      //resolve method of filtered array 
      resolve(Managers_Filters);

      if(Managers_Filters.length == 0) //if 0 in set, function is invoked with reject method
      reject("no results returned");
  });
}


//getEmployeeByNum(num) - returns a promise 

exports.getEmployeesByNum = function(num){
  return new Promise((resolve, reject) => {
    //one single "employee object" -- atches employeeNum property with num parameter
      let Num_Filters = employees.filter(employees => employees.employeeNum == num);

      //resolve method of filtered one single object
      resolve(Num_Filters);

      if(Num_Filters.length == 0) //if 0 in set, function is invoked with reject method
      reject("no results returned");
  }); 
  
<<<<<<< HEAD
}


// Search through the "employees" array for an employee with an employeeNum
exports.updateEmployee = function(employeeData){
  return new Promise((resolve, reject) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise((resolve, reject) => {
      employees.forEach(employee => { //for each employee set 
        if (employee.employeeNum == employeeData.employeeNum) {
          //  splice() method 
               //overwrite with new employee passed in the function
              employees.splice(employeeData.employeeNum - 1, 1, employeeData);
          }
      });
      resolve(); //invoked method
  });
});
};

=======
} 
>>>>>>> 719af9506e5a214b076ca5fb0e63260a7d1b7a10
