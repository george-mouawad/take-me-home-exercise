
//This file contains methods that perform CRUD operations on Employee object
var mongoose = require('mongoose');
var log4js = require('log4js'); //Uses log4js library
var logger = log4js.getLogger();
var myEmployee = mongoose.model('Employee');
var utils= require('../helpers/dateUtils');

//Retrieves employees from Mongo DB in HTML and JSON formats
exports.getEmployees = function (req, res, next) {
    //If size and page parameters are specified, employees will be filtered accordingly
    var page = parseInt(req.query.page),
        size = parseInt(req.query.size),
        skip = page > 0 ? ((page - 1) * size) : 0;
    myEmployee.find(null, null, {
        skip: skip,
        limit: size
    }, function (err, employees) {
        if (err) {
            return logger.error(err);
        } else {
            res.format({
                //HTML response will render the index.jade file in the views/employees folder.
                html: function () {
                    res.render('employees/index', {
                        title: 'List of Employees',
                        "employees": employees
                    });
                },
                //JSON response will show all employees in JSON format
                json: function () {
                    res.json(employees);
                }
            });
        }
    });
};

//Creates new employee and returns it in HTML and JSON formats
exports.createEmployee = function (req, res) {
    /* Get values from POST request. 
    The create operation can be performed from form or REST call. 
    The fields below rely on the form attributes*/
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var department = req.body.department;
    var street = req.body.street;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var postcode = req.body.postcode;
    var phone = req.body.phone;
    var cell = req.body.cell;
    var dob = req.body.dob;
    //Calls the create function in DB
    myEmployee.create({
        'name.first': firstName,
        'name.last': lastName,
        department: department,
        'location.street': street,
        'location.city': city,
        'location.state': state,
        'location.country': country,
        'location.postcode': postcode,
        phone: phone,
        cell: cell,
        dob: dob
    }, function (err, employee) {
        if (err) {
            logger.error(err);
            res.send("Unable to add employee to the database.");
        } else {
            //Employee has been created
            logger.info('Creating new employee: ' + employee);
            res.format({
                //HTML response will set the location and redirect back to the home page.
                html: function () {
                    res.location("employees");
                    //Redirects to the appropriate page.
                    res.redirect("/employees");
                },
                //JSON response will show the newly created employee
                json: function () {
                    res.json(employee);
                }
            });
        }
    })
};


//Checks if Employee exists in database
exports.validateEmployeeById = function (req, res, next, id) {
    logger.info('Checking if employee with ID: ' + id + ' exists');
    myEmployee.findById(id, function (err, employee) {
        //Returns 404 if page is not found
        if (err) {
            logger.info(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function () {
                    next(err);
                },
                json: function () {
                    res.json({ message: err.status + ' ' + err });
                }
            });
            //Employee exists
        } else {          
            req.id = id;
            //proceed to next method
            next();
        }
    });
};

//Finds employee by Id and returns it in HTML and JSON formats
exports.getEmployeeById = function (req, res) {
    myEmployee.findById(req.id, function (err, employee) {
        if (err) {
            logger.info('Unable to retrieve employee from database: ' + err);
        } else {
            logger.info('Retrieving ID: ' + employee._id);
            employeedob= utils.removeTimeFromDate(employee.dob);
            res.format({
                html: function () {
                    res.render('employees/show', {
                        "employeedob": employeedob,
                        "employee": employee
                    });
                },
                json: function () {
                    res.json(employee);
                }
            });
        }
    });
}

exports.getEmployeeToUpdate = function (req, res) {
    //search for the employee
    myEmployee.findById(req.id, function (err, employee) {
        if (err) {
            logger.info('Unable to retrieve employee from DB: ' + err);
        } else {
            //Returns the employee
            logger.info('Retrieving ID: ' + employee._id);
            employeedob= utils.removeTimeFromDate(employee.dob);
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function () {
                    res.render('employees/edit', {
                        title: 'Employee' + employee._id,
                        "employeedob": employeedob,
                        "employee": employee
                    });
                },
                //JSON response will return the JSON output
                json: function () {
                    res.json(employee);
                }
            });
        }
    });
};

//Updates Employee in DB and returns in in HTML and JSON format
exports.updateEmployee = function (req, res) {
    // Get our REST or form values.
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var department = req.body.department;
    var street = req.body.street;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var postcode = req.body.postcode;
    var phone = req.body.phone;
    var cell = req.body.cell;
    var dob = req.body.dob;
    //find the document by ID
    myEmployee.findById(req.id, function (err, employee) {
        //Updates Employee with the new values sent in request
        employee.update({
            'name.first': firstName,
            'name.last': lastName,
            department: department,
            'location.street': street,
            'location.city': city,
            'location.state': state,
            'location.country': country,
            'location.postcode': postcode,
            phone: phone,
            cell: cell,
            dob: dob
        }, function (err, EmployeeID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            }
            else {
                //HTML response
                res.format({
                    html: function () {
                        res.redirect("/employees/" + employee._id);
                    },
                    //JSON response
                    json: function () {
                        res.json(employee);
                    }
                });
            }
        })
    });
};

//Deletes employee in DB
exports.deleteEmployee = function (req, res) {
    //find employee by ID
    myEmployee.findById(req.id, function (err, employee) {
        if (err) {
            return logger.error(err);
        } else {
            //remove it from Mongo
            employee.remove(function (err, employee) {
                if (err) {
                    return logger.error(err);
                } else {
                    logger.info('Removing Employee ID: ' + employee._id);
                    res.format({
                        //HTML back to main page
                        html: function () {
                            res.redirect("/employees");
                        },
                        //JSON returns the deleted employee details
                        json: function () {
                            res.json({
                                message: 'deleted',
                                item: employee
                            });
                        }
                    });
                }
            });
        }
    });

};