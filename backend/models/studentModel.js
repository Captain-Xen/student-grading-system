const db = require('../config/db');

const createStudent = (student, callback) => {
  const query = 'INSERT INTO students (student_id, name, class, age) VALUES (?, ?, ?, ?)';
  db.query(query, [student.id, student.name, student.class, student.age], callback);
};

// add more methods/functions if needed

module.exports = {
  createStudent,
  // Remember to export other functions too
};
