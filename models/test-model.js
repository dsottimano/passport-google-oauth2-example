let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let TestSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
    },
    description: {
        type: String
    },
    urls: [{
        type: String
    }],
    owner: {
        ownerId: {
            type: ObjectId,
            required: true
        },
        ownerName: {
            type: String
        }
    },
    collborators: [{
        collaboratorId: {
            type: ObjectId
        },
        collaboratorName: {
            type: String
        }
    }],
    created: {
        type: Number,
        required: true,
        default: Date.now()
    }


})
//always use the singular version of model name because mongoose automatically pluralizes it
//but the variable should be plural
let TestModel = mongoose.model('Test', TestSchema)

module.exports = TestModel