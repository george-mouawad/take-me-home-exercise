var express = require('express'),//using express framework
    router = express.Router(),    
    bodyParser = require('body-parser'),//parses information from POST
    methodOverride = require('method-override')//used to manipulate POST
    employeeController = require('../controllers/employeeController'),
    searchController = require('../controllers/searchController');


//Etract the entire body portion of an incoming request stream and exposes it on req.body
router.use(bodyParser.urlencoded({ extended: true }));

//Overrides query value
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}))

//Each route calls a different REST operation
router.route('/')
    .get(function (req, res, next) {
        employeeController.getEmployees(req, res, next);
    })
    
    //POST a new employee
    .post(function (req, res) {
        employeeController.createEmployee(req, res);
    });

    router.route('/searchByKeyword')
    .get(function (req, res) {
        searchController.searchByKeyword(req, res);
    });

/* GET New Employee page. */
router.get('/new', function (req, res) {
    res.render('employees/new', { title: 'Add New Employee' });
});

// Validates employee by Id
router.param('id', function (req, res, next, id) {
    employeeController.validateEmployeeById(req, res, next, id);
});

router.route('/:id')
    .get(function (req, res) {
        employeeController.getEmployeeById(req, res);
    });

router.route('/:id/edit')
    //GET  Employee for update
    .get(function (req, res) {
        employeeController.getEmployeeToUpdate(req, res);
    })
    //PUT Updates an employee by ID
    .put(function (req, res) {
        employeeController.updateEmployee(req, res);
    })
    //DELETE an Employee by ID
    .delete(function (req, res) {
        employeeController.deleteEmployee(req, res);
    });




module.exports = router;