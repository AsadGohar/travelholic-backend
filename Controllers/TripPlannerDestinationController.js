const TripPlannerDestinationModel = require('../Models/TripPlannerDestination');
const HttpError = require('../Models/HttpError');

const createTripPlannerDestination = async (req,res,next)=>{
  const {name,north_coordinate,east_coordinate} = req.body
  let newDest
  let dest = await TripPlannerDestinationModel.find({name: name })
  if (dest.length===0){
    try {
      newDest = TripPlannerDestinationModel()
      newDest.name=name
      newDest.north_coordinate=north_coordinate
      newDest.east_coordinate=east_coordinate
      newDest.save()
    } catch (error) {
      const err = new HttpError('Creating TripPlannerDestination Failed',500);
      return next(err)
    }
  }
  else{
    const err = new HttpError('Destination Already Exists',500);
    return next(err)
  }
  res.send(newDest)
}

const getAllTripPlannerDestinations = async (req,res,next)=>{
  let destinations
  try {
     destinations = await TripPlannerDestinationModel.find()
  } catch (error) {
    const err = new HttpError('Getting Trip Planner Destinations Failed, please try again',500);
    return next(err);
  }
  if (!destinations) {
    const error = new HttpError('could not find any destinations',404);
    return next(error);
  }
  res.send(destinations)
}

const getTripPlannerDestionationById = async (req,res,next)=>{
  let destinations
  let id = req.params.id
  try {
     destinations = await TripPlannerDestinationModel.findById(id)
  } catch (error) {
    const err = new HttpError('Getting Trip Planner Destination Failed, please try again',500);
    return next(err);
  }
  if (!destinations) {
    const error = new HttpError('Could not find any Trip Planner Destination',404);
    return next(error);
  }
  res.send(destinations)
}

const getTripPlannerDestinationByCoordinates = async (req,res,next)=>{
  
  const {to,from} = req.body
  console.log(to,from)
  try {
    if (to>from){
      // console.log('to>from')
      destinations = await TripPlannerDestinationModel.where('north_coordinate').gt(from).lt(to).select('name').exec();
    }
    else {
      // console.log('to<from')

      destinations = await TripPlannerDestinationModel.where('north_coordinate').gt(to).lt(from).select('name').exec();
    }
  } catch (error) {
    const err = new HttpError('Getting Trip Planner Destination Faile, please try again',500);
    return next(err);
  }
  if (!destinations) {
    const error = new HttpError('Could not find any Trip Planner Destination',404);
    return next(error);
  }
  res.send(destinations)
}

const deleteTripPlannerDestinationById = async (req,res,next)=>{
  let destinations
  let id = req.params.id
  try {
     destinations = await TripPlannerDestinationModel.findByIdAndDelete(id)
  } catch (error) {
    const err = new HttpError('Getting Trip Planner Destination Failed, please try again',500);
    return next(err);
  }
  if (!destinations) {
    const error = new HttpError('Could not find any Trip Planner Destination',404);
    return next(error);
  }
  res.send(destinations)
}


module.exports.createTripPlannerDestination = createTripPlannerDestination
module.exports.getAllTripPlannerDestinations  = getAllTripPlannerDestinations
module.exports.getTripPlannerDestionationById  = getTripPlannerDestionationById
module.exports.deleteTripPlannerDestinationById  = deleteTripPlannerDestinationById
module.exports.getTripPlannerDestinationByCoordinates  = getTripPlannerDestinationByCoordinates

