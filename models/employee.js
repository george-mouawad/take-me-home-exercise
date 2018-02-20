var mongoose = require('mongoose');  
var employeeSchema = new mongoose.Schema({
  name: {
    title: String,
    first: String,
    last: String  
  },
  department: String,
  gender: String,
  location: {
    country: String,
    street: String,
    city: String,
    state: String,
    postcode: Number
  },
  email: String,
  login:{
    username: String,
    password: String,
    sha256: String,
  },
  dob: Date,
  registered: Date,
  phone: String,
  cell: String,
  employeeId:{
    name: String,
    value: String
  },
  picture:{
    large: String,
    medium: String,
    thumbnail: String
  },
  nat: String
 
});
mongoose.model('Employee', employeeSchema);