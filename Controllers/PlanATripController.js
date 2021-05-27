const TripPlannerDestinationModel = require('../Models/TripPlannerDestination');
const HotelModel = require('../Models/Hotel');
const RouteModel = require('../Models/Route');
const mongoose = require("mongoose");
const TransportModel = require('../Models/Transport');
const HttpError = require('../Models/HttpError');

const getTripPlanEstimate = async (req,res,next)=>{
  const {destinations} =req.body
  console.log('destinations',destinations)
 
  let nextDest=1,minHotel=0,maxHotel=0,routes=[],fares=[],transports=[],totalFare=0,minEstimate,maxEstimate,routesDetails=[],minTransportFare=0,maxTransportFare=0;

  for (let index = 0; index < destinations.length-1; index++) {

    let chkroute = await RouteModel.find({'destination_from':destinations[index],'destination_to':destinations[nextDest]})
    if (chkroute.length===0){

      let from = await TripPlannerDestinationModel.findById(destinations[index])
      let to = await TripPlannerDestinationModel.findById(destinations[nextDest])
      const error = new HttpError(`Could not Find Route between ${from.name} to ${to.name}`,404);
      return next(error);
    }
    else {
      console.log('route id',chkroute)
      let transport = await TransportModel.find({'route':chkroute[0]._id}).sort('-fare');
      if (transport.length===0){
        let from = await TripPlannerDestinationModel.findById(destinations[index])
      let to = await TripPlannerDestinationModel.findById(destinations[nextDest])
      const error = new HttpError(`Could not Find Transport between ${from.name} to ${to.name}`,404);
      return next(error);
      }
      else {
        transports.push(transport)
        minTransportFare+=transport[transport.length-1].fare
        maxTransportFare+=transport[0].fare
        nextDest++
      }
    }
  }
    
  //interating destination array sent from client to find hotels in each destination
  for (let index = 1; index < destinations.length; index++) {
    //aggreagation framwork used to find maximum and minimum hotel rent from each destination
    const aggregate =  [
      { $match : { "destination": new mongoose.Types.ObjectId(destinations[index])} } ,
      {
        $group: { _id: "$destination", HotelMin: { $min: "$budget_rent" },HotelMax:{ $max: "$luxury_rent"}}
      },  
    ]

    //returns an array of object containing minimum and maximum values
    const hotel = await HotelModel.aggregate(aggregate).exec()
    console.log(hotel)

    //adding minimum and maximum hotel rent from each destination to the variables
    minHotel +=  hotel[0].HotelMin
    maxHotel +=  hotel[0].HotelMax
  }

  let newMinEstimate = minHotel+minTransportFare
  let newMaxEstimate = maxHotel+maxTransportFare
  res.send(
    {minTransportFare,maxTransportFare,minHotel,maxHotel,newMaxEstimate,newMinEstimate}
  )
}
module.exports.getTripPlanEstimate  = getTripPlanEstimate
