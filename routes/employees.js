const router = require("express").Router();
const Employee = require("../models/Employee");
const mongoose = require("mongoose");
const EmployeeController = require("../controllers/employeesController.js");
//get an employee
router.get("/:employeeId", EmployeeController.searchEmployee);

//Create a new employee
router.post("/", async (req, res) => {
  const employee = new Employee({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    department: req.body.department,
    phone: req.body.phone,
    email: req.body.email,
    push_mail: req.body.push_mail,
    image: req.body.image,
  });
  try {
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (err) {
    res.json({ message: err });
  }
});


module.exports = router;



