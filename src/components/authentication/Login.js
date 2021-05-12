import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn, login } from '../../actions/adminActions'
import Spinner from 'react-bootstrap/Spinner'
import "./Login.css"

const Login = ({ history, location }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
    const { adminInfo, loading: isLoggedInLoading } = isAdminLoggedIn

    const adminLogin = useSelector(state => state.adminLogin)
    const { loading, error } = adminLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (adminInfo) {
            history.push(redirect)
        }
    }, [history, redirect, adminInfo])



    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(login(username, password))
        await dispatch(isLoggedIn())
        history.push('/')
    }

    return (
        <div className="container login-wrap">
            <div className="text-center">
                <img alt='load' src="https://img.icons8.com/dotty/80/000000/admin-settings-male.png" />
                <h5 className="mt-2" >Are you an admin? Please Login to continue</h5>
            </div>
            <div className="row justify-content-center login-main-div mt-5">
                <div className="form-wrap-div">
                    <h4 className="mb-3">Admin Login</h4>
                    <form onSubmit={submitHandler}>
                        <div className="form-outline mb-3">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="text-center mt-1">
                            {!loading ? <button type="submit" className="btn btn-block signin-btn">Sign in</button> :
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            }
                            {error ? <p style={{ color: 'red' }}>Invalid Username or Password</p> : null}
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;
