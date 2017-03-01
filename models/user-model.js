let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let UserSchema = new Schema({
    
    account: {
        id: {type : String, required: true, unique: true},
        email: {type : String, required: true, unique: true},
        name: {type : String, required: true},
        photo : {type : String}
    },
    projects: [{
        type: ObjectId,
        ref: 'Projects'
    }],
    created: {type : Number, default: Date.now()}


})
//always use the singular version of model name because mongoose automatically pluralizes it
//but the variable should be plural
let UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel