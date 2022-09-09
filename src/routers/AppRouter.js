import React, { useEffect } from 'react'
import { LoginScreen } from './../components/auth/LoginScreen';
import { CalendarScreen } from './../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startCheckingToken } from './../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {
       
        dispatch(startCheckingToken());

    }, [dispatch]);

    if(checking){
        return (<h5>Por favor, espere...</h5>);
    }

    return (

        <Router>
                <div>
                    <Switch>
                        <PublicRoute 
                            exact path="/login"  
                            component={LoginScreen}
                            isAuthenticated={!!uid} // !! convierte al string en un booleano para comprobar que uid no sea null.

                            />

                        <PrivateRoute 
                            exact path="/"
                            component={CalendarScreen}
                            isAuthenticated={!!uid}
                            />

                        <Redirect to="/" />

                    </Switch>

                    
                </div>
        </Router>
         //app.use('/login', express.static('public')); en el back
   
    )
}
