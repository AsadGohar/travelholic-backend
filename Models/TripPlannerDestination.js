const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TripPlannerDestinationSchema = mongoose.Schema({
    name: { type: String , required:true,unique:true},
},{ timestamps: true});

TripPlannerDestinationSchema.plugin(uniqueValidator)

const TripPlannerDestinationModel = mongoose.model('TripPlannerDestination', TripPlannerDestinationSchema);

module.exports =TripPlannerDestinationModel;
