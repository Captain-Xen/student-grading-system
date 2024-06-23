const Student = require('../models/studentModel');

const addStudent = (req, res) => {
  const newStudent = {
    id: req.body.student_id,
    name: req.body.name,
    class: req.body.class,
    age: req.body.age,
  };

  Student.createStudent(newStudent, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  });
};

// Define other controller functions as needed

module.exports = {
  addStudent,
  // Export other functions
};
