var router = require('express').Router()
var ProjectModel = require('../models/project-model')
var ensureAuthenticated = require('../config/authentication-check').ensureAuthenticated

//get all projects
router.get('/projects', ensureAuthenticated, function (req, res) {
    // ProjectModel.find(function (projects) {
res.send("working!")
    // })


})



//post new projects

router.post('/projects', ensureAuthenticated, function (req, res) {

    ProjectModel.create(req.body)

        // , function (project) {
        //     if (project.stack) {
        //         return next(project)
        //     }
        //     res.send(project)
        // })
        .then(function (res) {
            res.send(res)
        })
        .catch(function (err) {
            res.send(err)
        })


})


//get project by id 




//put




//delete


module.exports = router