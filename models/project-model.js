let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    ownerId: {
        type: ObjectId,
        required: true,
        ref: 'User',
        unique : true
    },

    collaboratorIds: [{
        type: ObjectId,
        ref: "User",
        unique : true
    }],


    created: {
        type: Number,
        required: true,
        default: Date.now()
    }


})
//always use the singular version of model name because mongoose automatically pluralizes it
//but the variable should be plural
let ProjectModel = mongoose.model('Project', ProjectSchema)

module.exports = ProjectModel