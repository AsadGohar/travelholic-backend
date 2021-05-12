const TransportModel = require('../Models/Transport');
const HttpError = require('../Models/HttpError');
const { validationResult } = require('express-validator');

// ADD NEW TRANSPORT COMPANY
const createTransport = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return next(
    //         new HttpError('Invalid inputs passed, please check your data.', 422)
    //     );
    // }

    const { name } = req.body
    const createdTransport = TransportModel()
    createdTransport.name=name;
    // createdTransport.routes.push(route)

    try {
        await createdTransport.save();
    } catch (err) {
        const error = new HttpError('Creating Transport failed, please try again.',500);
        return next(error);
    }

    res.status(201).json({ transport: createdTransport });
}

// GET ALL TRANSPORT COMPANIES
const getTransports = async (req, res, next) => {
    let transports
    try {
        transports = await TransportModel.find().populate('routes.destination_to routes.destination_from','name').exec();
    } catch (err) {
        const error = new HttpError('Finding transports failed, please try again.',500);
        return next(error);
    }
    res.send(transports);
}

// GET A SPECIFIC TRANSPORT COMPANY BY ID
const getTransportById = async (req, res, next) => {
    const transportId = req.params.id;
    let transport;
    try {
        transport = await TransportModel.findById(transportId).populate('routes.destination_to routes.destination_from','name').exec();
    } catch (err) {
        const error = new HttpError('Finding required transport failed, please try again.',500);
        return next(error);
    }

    if (!transport) {
        const error = new HttpError('Could not find a transport for the provided id.',404);
        return next(error);
    }

    res.json(transport);
}


// GET ROUTES OF A SPECIFIC TRANSPORT COMPANY BY TRANSPORT ID
const getRoutesByTransportId = async (req, res, next) => {
    const transportId = req.params.id;
    let transport;
    try {
        transport = await TransportModel.findById(transportId).populate('routes.destination_to routes.destination_from','name').select('routes -_id').exec();
    } catch (err) {
        const error = new HttpError('Finding required transport failed, please try again.',500);
        return next(error);
    }

    if (!transport) {
        const error = new HttpError('Could not find a transport for the provided id.',404);
        return next(error);
    }

    res.json(transport);
}

// Delete Route by Route ID and Transport Id
const deleteRouteByRouteId = async (req, res, next) => {
    const {transport_id,route_id} = req.body;
    console.log(transport_id,route_id)
    let transport
    try {
        transport = await TransportModel.findById(transport_id).exec();
        transport.routes.remove(route_id)
        transport.save()
    } catch (err) {
        const error = new HttpError('Finding required transport failed, please try again.',500);
        return next(error);
    }

    if (!transport) {
        const error = new HttpError('Could not find a transport for the provided id.',404);
        return next(error);
    }

    res.json(transport);
}

// GET ROUTE OF A SPECIFIC TRANSPORT COMPANY BY TRANSPORT ID And Route Id
const getRouteByRouteId = async (req, res, next) => {
    let route_id=req.params.id
    const {transport_id} = req.body;
    let transport,route
    try {
        transport = await TransportModel.findById(transport_id).populate('routes.destination_to routes.destination_from','name').exec();
        route=transport.routes.id(route_id)
        transport.save()
    } catch (err) {
        const error = new HttpError('Finding required transport failed, please try again.',500);
        return next(error);
    }

    if (!transport) {
        const error = new HttpError('Could not find a transport for the provided id.',404);
        return next(error);
    }

    res.json(route);
}


// GET A SPECIFIC TRANSPORT COMPANY BY ROUTES
const getTransportByDestinations = async (req, res, next) => {
    const {destinations} =req.body
    let transport;
    try {
         transport = await TransportModel.find
        ( 
          {"routes": 
            {
              $elemMatch: { 
                'destination_from':destinations[0],  
                'destination_to':destinations[1]
              } 
            }
          }
        ).sort({'routes.fare':1}).select('-routes');
    } catch (err) {
        const error = new HttpError('Finding required transport failed, please try again.',500);
        return next(error);
    }

    if (!transport) {
        const error = new HttpError('Could not find a transport for the provided id.',404);
        return next(error);
    }

    res.json(transport);
}

// ADD A ROUTE TO A TRANSPORT
const addRoutetoTransport = async (req, res, next) => {
    
    const {route,id} = req.body
    console.log(route.destination_to)
    console.log(route.destination_from)
    let transport;
    try {
        transport = await TransportModel.find( {'_id':id, "routes": { 
        $elemMatch: { 'destination_to':route.destination_to,  'destination_from':route.destination_from} } } );
    } catch (err) {
        const error = new HttpError('Finding required transport failed, please try again.',500);
        return next(error);
    }
    // console.log('lenth',transport.length)
    if ((transport).length===0) {
       let ntransport = await TransportModel.findByIdAndUpdate(id,
            { 
              "$push": { "routes": route } 
            },{returnOriginal:false}
          ).populate('routes.destination_to routes.destination_from','name').exec();;
        res.send(ntransport)
    }
    else {
        const error = new HttpError('Route Already Added',500);
        return next(error);
    }
    // res.json(transport);
}



//DOES A TRANSPORT HAS A ROUTE BETWEEN TWO DESTINATIONS
const doesRouteExist = async (req, res, next) => {
    
    console.log(req.body)
    const {destination_to,destination_from} = req.body
    
    console.log(destination_to,destination_from)
    if (destination_from===destination_to){
        res.send({status:'Please Select Two Different Destinations'})
    }
    else {
        console.log(destination_to)
        let transport;
        try {
            transport = await TransportModel.find( {"routes": { 
            $elemMatch: { 'destination_to':destination_to,  'destination_from':destination_from} }});
        } catch (err) {
            const error = new HttpError('Finding required transport failed, please try again.',500);
            return next(error);
        }

        if (transport.length===0) {
        
            res.send({status:'Nah! Find Another Route'})
        }
        else {
            res.send({status:"Yes! It's Possible"})
        }
    }
    
    // res.json(transport);
    // // res.send({destination_to,destination_from})
}

// UPDATE A SPECIFIC TRANSPORT COMPANY
const updateTransport = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    
    const { name, fare } = req.body;
    const transportId = req.params.id;

    let transport;
    try {
        transport = await TransportModel.findById(transportId);
    } catch (err) {
        const error = new HttpError('Unknown error occured while updating transport, please try again.',500);
        return next(error);
    }

    transport.name = name;
    transport.fare = fare;

    try {
        await transport.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update transport.',500);
        return next(error);
    }
    res.json(transport);
}

// DELETE A TRANSPORT
const deleteTransport = async (req, res, next) => {
    const transportId = req.params.id;
    let transport;
    try {
        transport = await TransportModel.findById(transportId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find transport for deletion.',500);
        return next(error);
    }

    try {
        await transport.remove();
    } catch (err) {
        const error = new HttpError('Unknown error occured while deleting transport, please try again.',500);
        return next(error);
    }
    res.status(200).json({ message: 'Transport has been deleted' });

}


// EXPORTING ALL CONTROllERS HERE
exports.createTransport = createTransport;
exports.getTransports = getTransports;
exports.getTransportById = getTransportById;
exports.getTransportByDestinations = getTransportByDestinations;
exports.updateTransport = updateTransport;
exports.deleteTransport = deleteTransport;
exports.addRoutetoTransport = addRoutetoTransport
exports.doesRouteExist = doesRouteExist
exports.getRoutesByTransportId = getRoutesByTransportId
exports.deleteRouteByRouteId = deleteRouteByRouteId
exports.getRouteByRouteId = getRouteByRouteId
