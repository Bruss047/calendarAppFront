import React from 'react';
//import './login.css';
import { useForm } from './../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from './../../actions/auth';
import Swal from 'sweetalert2';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        logEmail: 'usuario1@gmail.com',
        logPassword: '123456'
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        regName: 'Ejemplo',
        regEmail: 'ejemplo@gmail.com',
        regPassword1: '123456',
        regPassword2: '123456'
    });

    const {logEmail, logPassword} = formLoginValues;
    const { regName, regEmail, regPassword1, regPassword2} = formRegisterValues;

    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(startLogin(logEmail, logPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(regPassword1!==regPassword2){
            Swal.fire('Error', 'Las constraseñas deben coincidir','error');
        }
        dispatch(startRegister(regName, regEmail, regPassword1));
    }

    return (
        <div className="container login__container">
            <div className="row">
                <div className="col-md-6 login__form-1">
                    <h3>Ingreso</h3>

                    <form onSubmit= {handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="logEmail"
                                value={logEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="logPassword"
                                value={logPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login__form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="regName"
                                value={regName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="regEmail"
                                value={regEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="regPassword1"
                                value={regPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="regPassword2"
                                value={regPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}