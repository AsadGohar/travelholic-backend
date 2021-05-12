import React, { useEffect } from 'react'
import "./AdminPanel.css"
import Navbar from "../navbar/Navbar";
import Sidemenu from "../sidemenu/Sidemenu";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../../actions/adminActions';
import { Spinner } from 'react-bootstrap';


//IMPORTING ADMIN COMPONENTS HERE
import Login from "../authentication/Login";
import Dashboard from "../dashboard/Dashboard";
import ViewDestinations from "../destinations/ViewDestinations";
import AddDestination from "../destinations/AddDestination";
import EditDestination from "../destinations/EditDestination";
import ViewTransports from "../transports/ViewTransports";
import AddTransport from "../transports/AddTransport";
import AddRouteToTransport from "../transports/AddRouteToTransport";
import ViewRoutesTransport from "../transports/ViewRoutesTransport";
import ViewBookings from "../bookings/ViewBookings";
import ViewTripReviews from "../reviews/ViewTripReviews";
import ViewHotels from "../hotels/ViewHotels";
import AddHotel from "../hotels/AddHotel";
import EditHotel from "../hotels/EditHotel";
import AnswerTable from "../answer/AnswerTable";
import ReportedAnswers from "../answer/ReportedAnswers";
import ReportedQuestions from "../question/ReportedQuestions";
import QuestionTable from "../question/QuestionTable";
import ViewTrips from "../trip/ViewTrips";
import EditTrip from "../trip/EditTrip";
import AddImage from "../trip/AddImage";
import AddTripForm from "../trip/AddTrip";
import UserTable from "../user/UserTable";
import ReportedUserTable from "../user/ReportedUserTable";
import AddTripDestination from "../trip-planner-destinations/AddTripDestination";
import TripDestinationsTable from "../trip-planner-destinations/TripDestinationsTable";
import AdminScreen from "../administrator/AdminScreen";


const AdminPanel = () => {
	const dispatch = useDispatch()

	const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { loading, adminInfo } = isAdminLoggedIn

	useEffect(() => {
			dispatch(isLoggedIn())
	}, [])

	return (
		<BrowserRouter>
			<div className=" AdminPanel-wrap">
				<div className="row">
					<div className="col-md-12">
					
					<Navbar />
					
					</div>
				</div>
				<div className="row d-flex justify-content-center">
					{adminInfo ?
						<div className="col-md-3">
							<Sidemenu />
						</div> : null}

						<div className="col-md-9 pr-5 pt-3">
							<Switch>
								{loading ? <Spinner animation="border" role="status">
										<span className="sr-only">Loading...</span>
								</Spinner> : (
										<Route path="/login" component={Login} />
								)}

								{adminInfo ? (
										<>
										<Route exact path="/" component={Dashboard} />
										<Route path="/all-destinations" component={ViewDestinations} />
										<Route path="/add-new-destination" component={AddDestination} />
										<Route path="/view-transports" component={ViewTransports} />
										<Route path="/edit-destination/:id" component={EditDestination} />
										<Route path="/add-new-transport" component={AddTransport} />
										<Route path="/add-route-transport" component={AddRouteToTransport} />
										<Route path="/view-route-transport" component={ViewRoutesTransport} />
										<Route path="/trip-bookings" component={ViewBookings} />
										<Route path="/trip-reviews" component={ViewTripReviews} />
										<Route path="/view-hotels" component={ViewHotels} />
										<Route path="/add-hotel" component={AddHotel} />
										<Route path="/edit-hotel/:id" component={EditHotel} />
										<Route path="/view-answers" component={AnswerTable} />
										<Route path="/view-questions" component={QuestionTable} />
										<Route path="/reported-answers" component={ReportedAnswers} />
										<Route path="/reported-questions" component={ReportedQuestions} />
										<Route path="/view-trips" component={ViewTrips} />
										<Route path="/edit-trip" component={EditTrip} />
										<Route path="/add-trip-image" component={AddImage} />
										<Route path="/add-new-trip" component={AddTripForm} />
										<Route path="/add-new-trip-destination" component={AddTripDestination} />
										<Route path="/view-trip-destinations" component={TripDestinationsTable} />
										<Route path="/registered-users" component={UserTable} />
										<Route path="/reported-users" component={ReportedUserTable} />
										<Route path="/administrator" component={AdminScreen} />
								</>
								) : 
								(
										<Redirect to='/login' />
								)}
						</Switch>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default AdminPanel;
