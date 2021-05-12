import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Sidemenu.css";

const Sidemenu = () => {
    const adminInfo = useSelector(state => state.isLoggedIn.adminInfo)
    const { isSuperAdmin } = adminInfo.decoded

    return (
        <div className="sidemenu-wrap fixed-top">
            <div className="nav-side-menu">
                <div className="brand">Admin Menu</div>
                <i className="fa fa-bars fa-2x toggle-btn" id="toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div className="menu-list">

                    <ul id="menu-content" className="menu-content collapse out">
                        <Link to="/" className="sidemenu-link">
                            <li>
                                <i className="fa fa-dashboard fa-lg"></i> Dashboard
                            </li>
                        </Link>

                        {/* DESTINATION MENU */}
                        <li data-toggle="collapse" data-target="#destinations" className="collapsed">
                            <i className="fa fa-plane fa-lg"></i> Destinations <span className="arrow"></span>
                        </li>
                        <ul className="sub-menu collapse" id="destinations">
                            <Link to="/all-destinations" className="sidemenu-link"><li>View Destinations</li></Link>
                            <Link to="/add-new-destination" className="sidemenu-link"><li>Add new Destination</li></Link>
                        </ul>

                        {/* TRIPS MENU */}
                        <li data-toggle="collapse" data-target="#trips" className="collapsed">
                            <i className="fa fa-car fa-lg"></i> Trips <span className="arrow"></span>
                        </li>
                        <ul className="sub-menu collapse" id="trips">
                            <Link to="/view-trips" className="sidemenu-link"><li>View all Trips</li></Link>
                            <Link to="/add-new-trip" className="sidemenu-link"><li>Add new Trip</li></Link>
                            <Link to="/add-trip-image" className="sidemenu-link"><li>Update Trip Image</li></Link>
                            <Link to="/trip-bookings" className="sidemenu-link"><li>Bookings</li></Link>
                            <Link to="/trip-reviews" className="sidemenu-link"><li>Trip Reviews</li></Link>
                        </ul>

                        {/* TRANSPORTS MENU */}
                        <li data-toggle="collapse" data-target="#transports" className="collapsed">
                            <i className="fa fa-bus fa-lg"></i> Transport Services <span className="arrow"></span>
                        </li>
                        <ul className="sub-menu collapse" id="transports">
                            <Link to="/view-transports" className="sidemenu-link"><li>View transport services</li></Link>
                            <Link to="/add-new-transport" className="sidemenu-link"><li>Add new transport service</li></Link>
                            <Link to="/add-route-transport" className="sidemenu-link"><li>Add Route To Transport</li></Link>
                            <Link to="/view-route-transport" className="sidemenu-link"><li>View Routes by Transport</li></Link>
                        </ul>

                        {/* TRIP PLANNER DESTINATIONS MENU */}
                        <li data-toggle="collapse" data-target="#routes" className="collapsed">
                            <i className="fa fa-road fa-lg"></i> Trip Planner Destinations <span className="arrow"></span>
                        </li>
                        <ul className="sub-menu collapse" id="routes">
                            <Link to="/add-new-trip-destination" className="sidemenu-link"><li>Add Trip Planner Destination</li></Link>
                            <Link to="/view-trip-destinations" className="sidemenu-link"><li>View All Trip Planner Destinations</li></Link>
                        </ul>

                        {/* HOTELS MENU */}
                        <li data-toggle="collapse" data-target="#hotels" className="collapsed">
                            <i className="fas fa-bed fa-lg"></i> Hotels <span className="arrow"></span>
                        </li>
                        <ul className="sub-menu collapse" id="hotels">
                            <Link to="/view-hotels" className="sidemenu-link"><li>View all Hotels</li></Link>
                            <Link to="/add-hotel" className="sidemenu-link"><li>Add new Hotel</li></Link>
                        </ul>

                        {/* FORUM MENU */}
                        <li data-toggle="collapse" data-target="#forum" className="collapsed">
                            <i className="fa fa-question-circle fa-lg"></i> Forum <span className="arrow"></span>
                        </li>
                        <ul className="sub-menu collapse" id="forum">
                            <Link to="/view-questions" className="sidemenu-link"><li>View all questions</li></Link>
                            <Link to="/view-answers" className="sidemenu-link"><li>View all answers</li></Link>
                            <Link to="/reported-answers" className="sidemenu-link"><li>View Reprted Answers</li></Link>
                            <Link to="/reported-questions" className="sidemenu-link"><li>View Reported Questions</li></Link>
                        </ul>


                        {/* USERS */}
                        <Link to="/registered-users" className="sidemenu-link">
                            <li>
                                <i className="fa fa-user fa-lg"></i> Users
                            </li>
                        </Link>
                        <Link to="/reported-users" className="sidemenu-link">
                            <li>
                                <i className="fa fa-user fa-lg"></i> Reported Users
                            </li>
                        </Link>

                        {/* SUPER ADMIN */}
                        {isSuperAdmin ? (
                            <Link to="/administrator" className="sidemenu-link" >
                                <li id="admin-link" >
                                    <i className="fa fa-lock fa-lg" aria-hidden="true"></i> Administrator
                                </li>
                            </Link>
                        ) : null}


                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidemenu;
