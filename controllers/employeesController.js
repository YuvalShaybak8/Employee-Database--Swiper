const Employee = require("../models/Employee.js");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const searchEmployee = async (req, res) => {
  const searchTerm = req.query.search;
  console.log(searchTerm);
  const employees = await Employee.find();
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastname.toLowerCase().includes(searchTerm.toLowerCase()) || 
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()));
  if (filteredEmployees.length > 0) {
    res.status(200).json(filteredEmployees);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

module.exports = {
  getAllEmployees,
  searchEmployee,
};
