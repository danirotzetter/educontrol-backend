var express = require('express');
var exams = express.Router();
var Course = require('../models/course.js');
var Exam = require('../models/exam.js');
var Grade = require('../models/grade.js');
const config = require('../app/config.js');


/**
 * List of all exams
 */
exams.get('/', function (req, res) {
    Exam.find({}).populate({path: 'grades', populate: {path: 'student'}}).exec(function (err, list) {
        if (err) {
            return res.json(500, {
                message: 'Error getting objects'
            });
        }
        return res.json(list);
    });
});


/**
 * Find user by id
 */
exams.get('/:id', function (req, res) {
    var id = req.params.id;
    Exam.findOne({_id: id}).populate({path: 'grades', populate: {path: 'student'}}).exec(function (err, course) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!course) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(course);
    });
});


/**
 * Create new exam
 */
exams.post('/', function (req, res) {
    // Exam object
    var exam = new Exam({
        name: req.body.name,
        date: req.body.date,
        exams:req.body.exams
    });

    Exam.save(function (err, exam) {
        if (err) {
            console.log('Error saving course ' + err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        else {
            console.log('Successfully saved course ' + err);
            return res.json({
                message: 'saved',
                _id: course._id
            });
        }
    });
});




module.exports = courses;