const mongoose = require ('mongoose');


const RouteSchema = mongoose.Schema({
    destination_to:{type : mongoose.Schema.ObjectId, ref : 'TripPlannerDestination'},
    destination_from:{type : mongoose.Schema.ObjectId, ref : 'TripPlannerDestination'},
    fare:{type:Number,required:true},
},{timestamps: true});

const TransportSchema = mongoose.Schema({
    name: { type: String , required:true},
    routes:[RouteSchema]
},{ timestamps: true});

const TansportModel = mongoose.model('Transport', TransportSchema);
module.exports = TansportModel;
