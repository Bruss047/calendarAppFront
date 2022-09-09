import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startLogOut } from '../../actions/auth';

export const Navbar = () => {

    const {name} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = () =>{
        dispatch(startLogOut());
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <button className="btn btn-outline-danger"
                    onClick={handleLogOut}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
            
        </div>
    )
}
