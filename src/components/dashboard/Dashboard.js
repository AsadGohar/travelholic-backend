import React, { useEffect, useState } from 'react'
import axios from "../support-components/axios"
import { Link } from 'react-router-dom'
import "./Dashboard.css"
import { useDispatch } from 'react-redux'
import { isLoggedIn } from '../../actions/adminActions'


const Dashboard = () => {

    const [users, setUsers] = useState([])
    const [destinations, setDestinations] = useState([])
    const [trips, setTrips] = useState([])
    const [bookings, setBookings] = useState([])
    const [hotels, setHotels] = useState([])
    const [transports, setTransports] = useState([])
    const [questions, setQuestions] = useState([])

    useEffect(() => {

        axios.get(`/users/admin/users`)
            .then(res => {
                setUsers(res.data)
            })

        axios.get(`/destinations`)
            .then(res => {
                setDestinations(res.data)
            })

        axios.get(`/trips/admin`)
            .then(res => {
                setTrips(res.data)
            })

        axios.get(`/bookings`)
            .then(res => {
                setBookings(res.data)
            })

        axios.get(`/hotels`)
            .then(res => {
                setHotels(res.data)
            })

        axios.get(`/transports`)
            .then(res => {
                setTransports(res.data)
            })

        axios.get(`/questions`)
            .then(res => {
                setQuestions(res.data)
            })
    }, [])



    return (
        <div className="container dashboard-wrap">
            <div className="row justify-content-center mt-5 mb-5">
                <h1 className="display-3">Welcome to Admin Panel</h1>

                <div className="col-md-3 ">
                    <Link to="/all-destinations" className="shortcut-link">
                        <div className="box-part text-center shortcut-card">
                            <i className="fa fa-plane fa-4x" aria-hidden="true"></i>
                            <div className="title">
                                <h4>Destinations</h4>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 ">
                    <Link to="/view-trips" className="shortcut-link">
                        <div className="box-part text-center shortcut-card">
                            <i className="fa fa-car fa-4x" aria-hidden="true"></i>
                            <div className="title">
                                <h4>Trips & Tours</h4>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 ">
                    <Link to="/trip-bookings" className="shortcut-link">
                        <div className="box-part text-center shortcut-card">
                            <i className="fa fa-suitcase fa-4x" aria-hidden="true"></i>
                            <div className="title">
                                <h4>Bookings</h4>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 ">
                    <Link to="/registered-users" className="shortcut-link">
                        <div className="box-part text-center shortcut-card">
                            <i className="fa fa-users fa-4x" aria-hidden="true"></i>
                            <div className="title">
                                <h4>Users</h4>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <hr />



            <div className="row justify-content-center mt-3 mb-5">
                <div className="col-12 text-center mb-4">
                    <p className="display-4 mt-3">Data Counter</p>
                </div>

                <div className="col-md-3">
                    <div className="card border-info mx-sm-1 p-3 counter-card">
                        <div className="card border-info shadow text-info p-3 my-card" ><span className="fa fa-users" aria-hidden="true"></span></div>
                        <div className="text-success text-center mt-3"><h4>Users</h4></div>
                        <div className="text-dark text-center mt-2"><h1>{users ? users.length : null}</h1></div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-info mx-sm-1 p-3 counter-card">
                        <div className="card border-info shadow text-info p-3 my-card" ><span className="fa fa-plane" aria-hidden="true"></span></div>
                        <div className="text-success text-center mt-3"><h4>Destinations</h4></div>
                        <div className="text-dark text-center mt-2"><h1>{destinations ? destinations.length : null}</h1></div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-info mx-sm-1 p-3 counter-card">
                        <div className="card border-info shadow text-info p-3 my-card" ><span className="fa fa-car" aria-hidden="true"></span></div>
                        <div className="text-success text-center mt-3"><h4>Trips</h4></div>
                        <div className="text-dark text-center mt-2"><h1>{trips ? trips.length : null}</h1></div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-info mx-sm-1 p-3 counter-card">
                        <div className="card border-info shadow text-info p-3 my-card" ><span className="fa fa-suitcase" aria-hidden="true"></span></div>
                        <div className="text-success text-center mt-3"><h4>Bookings</h4></div>
                        <div className="text-dark text-center mt-2"><h1>{bookings ? bookings.length : null}</h1></div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-info mx-sm-1 p-3 counter-card">
                        <div className="card border-info shadow text-info p-3 my-card" ><span className="fas fa-bed" aria-hidden="true"></span></div>
                        <div className="text-success text-center mt-3"><h4>Hotels</h4></div>
                        <div className="text-dark text-center mt-2"><h1>{hotels ? hotels.length : null}</h1></div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-info mx-sm-1 p-3 counter-card">
                        <div className="card border-info shadow text-info p-3 my-card" ><span className="fa fa-bus" aria-hidden="true"></span></div>
                        <div className="text-success text-center mt-3"><h4>Transports</h4></div>
                        <div className="text-dark text-center mt-2"><h1>{transports ? transports.length : null}</h1></div>
                    </div>
                </div>

               

                <div className="col-md-3">
                    <div className="card border-info mx-sm-1 p-3 counter-card">
                        <div className="card border-info shadow text-info p-3 my-card" ><span className="fa fa-question-circle" aria-hidden="true"></span></div>
                        <div className="text-success text-center mt-3"><h4>Questions</h4></div>
                        <div className="text-dark text-center mt-2"><h1>{questions ? questions.length : null}</h1></div>
                    </div>
                </div>


            </div>


        </div>
    );
}

export default Dashboard;
