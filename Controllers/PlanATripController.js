const TripPlannerDestinationModel = require('../Models/TripPlannerDestination');
const HotelModel = require('../Models/Hotel');
const mongoose = require("mongoose");
const TransportModel = require('../Models/Transport');
const HttpError = require('../Models/HttpError');

const getTripPlanEstimate = async (req,res,next)=>{
  const {destinations} =req.body
  console.log('destinations',destinations)
  //nextDest iterator variable
  //minHotel for minimum hotel rent
  //maxHotel for maximumhotel rent
  //transport[] for inserting transport objects who have the route
  //routesDetails[] for insering subarrays of objects {transport id,fares,to,from} 
  //minTransportFare for storing minimum transport expenditure
  //maxTransportFare for storing maximum transport expenditure
  //totalFare to calculate total fare (old logic)
  //routes[] for inserting routes info (old logic)
  //fares[] for inserting fare values of routes (old logic)
  //maxEstimate for sending estimated values from the controller  (old logic)
  //minEstimate for sending estimated values from the controller (old logic)

  //old logic used to calculate estimates by adding the top transport fare from each transport array
  //new logic used to calculate estimates by adding minimum and maximum transport fare from each transport array

  let nextDest=1,minHotel=0,maxHotel=0,routes=[],fares=[],transports=[],totalFare=0,minEstimate,maxEstimate,routesDetails=[],minTransportFare=0,maxTransportFare=0;

  //checking if any transport has routes between the destinations
  for (let index = 0; index < destinations.length-1; index++) {

    //finding in subdocument array of routes , returns an array of transports where conditions match in subdocument array of routes
    let transport = await TransportModel.find
    ( 
      {"routes": 
        {
          $elemMatch: { 
            'destination_from':destinations[index],  
            'destination_to':destinations[nextDest]
          } 
        }
      }
    );
      //if no such transport available with the route available
    if (transport.length===0){
      let to = await TripPlannerDestinationModel.findById(destinations[index])
      let from = await TripPlannerDestinationModel.findById(destinations[nextDest])
      const error = new HttpError(`could not find route between ${to.name} to ${from.name}`,404);
      return next(error);
    }
    //if transport available
    else {
      transports.push(transport)

      let from = destinations[index]
      let to = destinations[nextDest]

      let nroutes=[] //creating local array to insert the routes information

      //nested for each array to iterate routes array of each transport that has a matching route
      transport.forEach(tr=>{
        tr.routes.forEach(element => {
          //checking where in routes array is the required route
          if (element.destination_from==from && element.destination_to==to )
          { 
            //inserting route in the local array of routes
            nroutes.push({'transport id':tr._id,'tranport name':tr.name,'destination_from':element.destination_from,'destination_to':element.destination_to,'fare':element.fare})
          }
        });
      })
      //pushing the created local array to tranport
      routesDetails.push(nroutes)

      //old logic to store transport fares
      transport[0].routes.forEach(element => {
        if (element.destination_from==from && element.destination_to==to )
        {
          routes.push(element)
          fares.push(element.fare)
        }
      });
     
      //incrementing nextDest to move to next set of destinations
      nextDest++
    }
  }

  //sorting the created routes array by the fare to min->maxs
  routesDetails.forEach(element=>{
    element.sort((a,b)=> a.fare-b.fare)
  })

  //adding fares to minTransportFareFare and maxTransportFare
  routesDetails.forEach(element=>{
    minTransportFare+=element[0].fare
    maxTransportFare+=element[element.length-1].fare
  })

  //interating destination array sent from client to find hotels in each destination
  for (let index = 0; index < destinations.length; index++) {
    //aggreagation framwork used to find maximum and minimum hotel rent from each destination
    const aggregate =  [
      { $match : { "destination": new mongoose.Types.ObjectId(destinations[index])} } ,
      {
        $group: { _id: "$destination", HotelMin: { $min: "$budget_rent" },HotelMax:{ $max: "$luxury_rent" }}
      },  
    ]

    //returns an array of object containing minimum and maximum values
    const hotel = await HotelModel.aggregate(aggregate).exec()
    // console.log(hotel)

    //adding minimum and maximum hotel rent from each destination to the variables
    minHotel +=  hotel[0].HotelMin
    maxHotel +=  hotel[0].HotelMax
  }
  //old logic to calculate total fare by iterating the fares array and adding each value
  fares.forEach(fare=> totalFare+=fare)
  //old logic to calculate min and max estimates
  minEstimate = minHotel+totalFare
  maxEstimate = maxHotel+totalFare

  //calculating the new min and max estimate
  let newMinEstimate = minHotel+minTransportFare
  let newMaxEstimate = maxHotel+maxTransportFare
  res.send({newMaxEstimate,newMinEstimate})
}
module.exports.getTripPlanEstimate  = getTripPlanEstimate
