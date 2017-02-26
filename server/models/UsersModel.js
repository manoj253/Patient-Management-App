var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: { type: String},
  lastName:{type:String},
  dob:{type:String},
  age:{type:String},
  gender: {type: String},
  phoneNumber:{type:String},
  email:{type:String},
  description: {type: String},
  dosage :{type:String},
  lastUpdated: { type: Date, default: Date.now}
});

module.exports = mongoose.model('PatientData', UserSchema);
