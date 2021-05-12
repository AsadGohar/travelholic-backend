const FeedbackModel = require('../Models/Feedback')
const HttpError = require('../Models/HttpError');
const {thankyouEmail}= require('../public/emailTemplate')
const nodemailer = require('nodemailer');

//CREATE FEEDBACK
const createFeedback = async (req,res,next)=>{

  
  const {name,email,message,phone}= req.body
  const output = thankyouEmail(name)
  let feedback
  try {
    feedback= FeedbackModel()
    feedback.name=name
    feedback.email=email
    feedback.message=message
    feedback.phone=phone
    await feedback.save()
  } catch (err) {
    const error = new HttpError('Creating Feedback failed',500);
    return next(error);
  }

  var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fa17-bse-137@cuilahore.edu.pk',
      pass: 'FA17BSE137'
    },
  tls: {
    rejectUnauthorized: false
}
  });

  var mailOptions = {
    from: 'Travelogic',
    to: email,
    subject: 'Feedback Response',
    text: 'Sent!',
    html: output,
  }

  mail.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent With Attachment: ' + info.response);
    }
  });
  res.send(feedback)
}
//GET ALL FEEDBACK
const getFeedback = async (req,res,next)=>{
  
  let feedback
  try {
    feedback= await FeedbackModel.find()
  } catch (err) {
    const error = new HttpError('Finding Feedback failed',500);
    return next(error);
  }
  if (feedback.length===0){
    const error = new HttpError('No Feedback Found',500);
    return next(error);
  }
  res.send(feedback)
}
module.exports.createFeedback  =  createFeedback
module.exports.getFeedback  =  getFeedback
