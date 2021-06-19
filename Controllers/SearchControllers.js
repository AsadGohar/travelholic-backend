const TripModel = require('../Models/Trip');
const QuestionModel = require('../Models/Question');
const DestinationModel = require('../Models/Destination');
const HttpError = require('../Models/HttpError');

const search = async (req,res,next)=> {
  const word = req.params.word
  let questions=[],destinations=[],trips=[]
  try {
    const questionsFound = await QuestionModel.find({"statement":{$regex:`${word}`, $options:'i'}})
    if (questionsFound.length===0){
      questions.push('No Questions Found')
    }
    else {
      questions.push(questionsFound)
    }
    const destinationsFound = await DestinationModel.find({"title":{$regex:`${word}`, $options:'i'}})
    if (destinationsFound.length===0){
      destinations.push('No Destinations Found')
    }
    else {
      destinations.push(destinationsFound)
    }
    const tripsFound = await TripModel.find({"title":{$regex:`${word}`, $options:'i'}})
    if (tripsFound.length===0){
      trips.push('No Trips Found')
    }
    else {
      trips.push(tripsFound)
    }
    res.send({questions,destinations,trips})
  } catch (error) {
    const err = new HttpError('Searching Failed',500);
    return next(err)
  }
}

module.exports.search  = search
