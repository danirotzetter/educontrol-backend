var express = require('express');
var districts = express.Router();
var Model = require('../models/district.js');
const config = require('../app/config.js');


/**
 * List of all districts
 */
districts.get('/', function (req, res) {
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
 * Find district by id
 */
districts.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function (err, district) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!district) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(district);
    });
});


/**
 * Create new district
 */
districts.post('/', function (req, res) {
    console.log('About to save district');
    var district= new Model({
        name: req.body.name
    });
    district.save(function (err, user) {
        if (err) {
            console.log('Error saving district '+err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        else{
            console.log('Successfully saved district '+err);
        return res.json({
            message: 'saved',
            _id: district._id
        });
        }
    });
});

/**
 * Update
 */
districts.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log('Update district with id '+id);
    Model.findOne({_id: id}, function (err, district) {
        if (err) {
            return res.status(500).json({
                message: 'Error updating',
                error: err
            });
        }
        else if (!district) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        else {
            district.name = req.body.name? req.body.name: district.name;
            district.save(function (err, district) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving'
                    });
                }
                else if (!district) {
                    return res.status(404).json({
                        message: 'Not found'
                    });
                }
                else {
                    return res.json(district);
                }
            });
        }
    });
});


/**
 * Delete by id
 */
districts.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log('About to delete district '+id);
    Model.findOne({_id: id}, function (err, district) {
        if (err) {
            return res.status(500).json( {
                message: 'Error finding object'
            });
        }
        if (!district) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        district.remove(function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error deleting'
                });
            }
            return res.json({message:'Successfully deleted object'});
        });
    });
});



module.exports = districts;