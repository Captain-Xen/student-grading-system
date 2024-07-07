const db = require('../config/db');

// Add a student
exports.addStudent = async (req, res) => {
  const { name, class: studentClass, age } = req.body;
  try {
    const [result] = await db.query('INSERT INTO students (name, class, age) VALUES (?, ?, ?)', [name, studentClass, age]);
    res.status(201).json({ message: 'Student added successfully', studentId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [student] = await db.query('SELECT * FROM students WHERE student_id = ?', [id]);
    if (student.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add grades for a student
exports.addGrades = async (req, res) => {
  const { studentId, subject, term1, term2, term3 } = req.body;
  try {
    const [result] = await db.query('INSERT INTO grades (student_id, subject, term1, term2, term3) VALUES (?, ?, ?, ?, ?)', [studentId, subject, term1, term2, term3]);
    res.status(201).json({ message: 'Grades added successfully', gradeId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get grades for a student
exports.getGradesByStudentId = async (req, res) => {
  const { id } = req.params;
  try {
    const [grades] = await db.query('SELECT * FROM grades WHERE student_id = ?', [id]);
    if (grades.length === 0) {
      return res.status(404).json({ message: 'Grades not found' });
    }
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
