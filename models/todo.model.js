const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: {
     type: Date,
    default: Date.now
   },
    updatedAt: {
          type: Date,
     default: Date.now
    }
  });
 
 // // Update the 'updatedAt' field with the current date and time before saving the document
  todoSchema.pre('save', function(next) {
    this.updatedAt = new Date();
   next();
  });

  
  
let todoModel = mongoose.model("todo", todoSchema);


module.exports = todoModel