const express = require('express');
const { addStudent, getStudentById, addGrades, getGradesByStudentId } = require('../controllers/studentController');

const router = express.Router();

router.post('/add', addStudent);
router.get('/:id', getStudentById);
router.post('/grades', addGrades);
router.get('/grades/:id', getGradesByStudentId);

module.exports = router;
