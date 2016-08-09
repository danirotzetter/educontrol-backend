var express = require('express');
var regions = express.Router();
var Model = require('../models/region.js');
const config = require('../app/config.js');


/**
 * List of all regions
 */
regions.get('/', function (req, res) {
    Model.find().populate({path: 'districts'}).exec(function (err, list) {
        if (err) {
            return res.json(500, {
                message: 'Error getting objects.'
            });
        }
        return res.json(list);
    });
});


/**
 * Find region by id
 */
regions.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}).populate({path: 'districts'}).exec(function (err, region) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting object'
            });
        }
        if (!region) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        return res.json(region);
    });
});


/**
 * Create new region
 */
regions.post('/', function (req, res) {
    console.log('About to save region');
    var region= new Model({
        name: req.body.name
    });
    region.save(function (err, user) {
        if (err) {
            console.log('Error saving region '+err);
            return res.status(500).json({
                message: 'Error when saving',
                error: err
            });
        }
        else{
            console.log('Successfully saved region '+err);
        return res.json({
            message: 'saved',
            _id: region._id
        });
        }
    });
});

/**
 * Update
 */
regions.put('/:id', function (req, res) {
    var id = req.params.id;
    console.log('Update region with id '+id);
    Model.findOne({_id: id}).populate({path: 'districts'}).exec(function (err, region) {
        if (err) {
            return res.status(500).json({
                message: 'Error updating',
                error: err
            });
        }
        else if (!region) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        else {
            region.name = req.body.name? req.body.name: region.name;
            region.save(function (err, region) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error saving'
                    });
                }
                else if (!region) {
                    return res.status(404).json({
                        message: 'Not found'
                    });
                }
                else {
                    return res.json(region);
                }
            });
        }
    });
});


/**
 * Delete by id
 */
regions.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log('About to delete region '+id);
    Model.findOne({_id: id}, function (err, region) {
        if (err) {
            return res.status(500).json( {
                message: 'Error finding object'
            });
        }
        if (!region) {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        region.remove(function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error deleting'
                });
            }
            return res.json({message:'Successfully deleted object'});
        });
    });
});



module.exports = regions;