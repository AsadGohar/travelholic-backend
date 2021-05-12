import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../actions/adminActions';
import "./Navbar.css";

const Navbar = ({ location }) => {
    const dispatch = useDispatch()

    const isAdminLoggedIn = useSelector(state => state.isLoggedIn.adminInfo)

    const logoutHandler = () => {
        dispatch(logout())
        window.location.reload()
    }

    return (
        <div className="navbar-wrap container-fluid fixed-top">
            <div className="navbar row">
                <div className=" float-left">
                    <Link to="/"><img alt='wait' src={"images/logo-png.png"} className="logo-img" /></Link>
                </div>
                <div className="float-right">
                    <span className="logout-link">
                        {isAdminLoggedIn ? <NavLink to="/login" id="logout" onClick={logoutHandler}><i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
                        </NavLink> : null}
                    </span>
                </div>
            </div>


        </div>
    );
}

export default Navbar;
