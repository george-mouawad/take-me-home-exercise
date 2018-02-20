# take-me-home-exercise
Simple WEB app created using Nodejs as server, Express as Framewor, JADE as views and  MongoDB as database.
The app uses CRUD and REST operations to manipulate Employee related data.

# Structure Overview
I used an MVC design pattern where:
  * "Routes" to forward requests to the appropriate controller functions.
  * Controller functions retrieve data from the models, create an HTML page displaying the data, and return it to the user to view in the browser.
  * Views (templates) used by the controllers to render the data.

# Installation
  * First clone the repo
  * Install NodeJS on your machine
  * Install MongoDB
  * Install the packages and run the app
  * Navigate to http://localhost:5000, to make sure that the app is running properly you should see a "Welcome to express" message
  
 # App Configuration
  * Go to take-me-home-exercise/config/db.js to configure MongoDB
  * Go to take-me-home-exercise/config/logger.js to configure your log4js file
  
 # Running the App
  * To create a new Employee navigate to http://localhost:5000/employees/new
  * To view the list of your employees navigate to http://localhost:5000/employees/
    * To edit an existing profile click on edit link
    * To view an existing profile click on show link
    * To delete a profile click on delete
  * To access directly an existing profile navigate to http://localhost:5000/employees/{id}
  * To edit directly an existing profile navigate to http://localhost:5000/employees/{id}/edit
  
 # REST calls
  To access the app from a REST client you can use the same URLs and set the Accept attribute = application/json in header
  You can as well search for employees by using the below URL:
  http://localhost:5000/employees/searchByKeyword?keywords={xxx}&searchField={yyy}&model={DBCollectionName}
  
  
  
