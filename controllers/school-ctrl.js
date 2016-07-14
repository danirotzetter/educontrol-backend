var express = require('express');
var schools = express.Router();
var Model = require('../models/school.js');
const config = require('../app/config.js');


/**
 * List of all schools
 */
schools.get('/', function (req, res) {
    Model.find(function (err, list) {
        if (err) {
            return res.json(500, {
                message: 'Error getting objects.'
            });
        }
        return res.json(list);
    });
});


/**
 * Find user by id
 */
schools.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function (err, school) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!school) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(school);
    });
});


/**
 * Create new school
 */
schools.post('/', function (req, res) {
    console.log('About to save school');
    var school= new Model({
        name: req.body.name
    });
    school.save(function (err, user) {
        if (err) {
            console.log('Error saving school '+err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        else{
            console.log('Successfully saved school '+err);
        return res.json({
            message: 'saved',
            _id: school._id
        });
        }
    });
});

/**
 * Update
 */
schools.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log('Update school with id '+id);
    Model.findOne({_id: id}, function (err, school) {
        if (err) {
            return res.status(500).json({
                message: 'Error updating',
                error: err
            });
        }
        else if (!school) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        else {
            school.name = req.body.name? req.body.name: school.name;
            school.save(function (err, school) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving'
                    });
                }
                else if (!school) {
                    return res.status(404).json({
                        message: 'Not found'
                    });
                }
                else {
                    return res.json(school);
                }
            });
        }
    });
});


/**
 * Delete by id
 */
schools.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log('About to delete school '+id);
    Model.findOne({_id: id}, function (err, school) {
        if (err) {
            return res.status(500).json( {
                message: 'Error finding object'
            });
        }
        if (!school) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        school.remove(function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error deleting'
                });
            }
            return res.json({message:'Successfully deleted object'});
        });
    });
});



module.exports = schools;