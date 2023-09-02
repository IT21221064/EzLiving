const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const auth = require('../middleware/requireUserAuth')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type:String,
        required : true
    },
    NIC : {
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    pw:{
        type:String,
        required:true
    },
    type : {
        type:String,
        required:true
    }
}, {timestamps:true})

UserSchema.statics.creatingUser = async function(name,NIC,email,username,pw,type)  {
    //validations
        
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }
        if(!validator.isStrongPassword(pw))
        {
            throw Error('Password not strong enough')
        }
    
        const exist = await this.findOne({username})
        
    
       
        if(exist) {
            throw Error('Username in use')
        }
    
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(pw,salt)
        
    
        const user = await this.create({name,NIC,email,username, pw:hash,type})
        return user
    
    }
    
    //static login method
    
    UserSchema.statics.login = async function(username,pw){
        if(!username || !pw)
        {
            throw Error('Fill all the fields')
        }
    
        const user = await  this.findOne({username})
    
        if(!user)
        {
            throw Error("Incorrect username")
        }
    
        const match = await bcrypt.compare(pw, user.pw)
    
        if(!match)
        {
            throw Error('Incorrect password')
        }
    
        return user
    }
    
    
    
    module.exports = mongoose.model('User', UserSchema )