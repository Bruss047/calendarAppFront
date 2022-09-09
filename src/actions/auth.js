import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from './../types/types';
import { clearCalendarStatelogout } from './events';



export const startLogin = (email,password) =>{

    return async(dispatch)=>{

        const resp = await fetchSinToken('auth',{email,password},'POST');
        const body = await resp.json();
 

        if(body.ok){

            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = (name, email, password) =>{

    return async(dispatch)=>{

        const resp = await fetchSinToken('auth/register',{ email,password, name},'POST');
        const body = await resp.json();
 
      
        if(body.ok){

            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startCheckingToken = () =>{

    return async(dispatch)=>{

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
 
       
        if(body.ok){

            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else{
            //Swal.fire('Error', body.msg, 'error');
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({type: types.authCheckingFinish});

const login = (user)=>({
    type: types.authLogin,
    payload: user
});

export const startLogOut = ()=>{
    return(dispatch)=>{
        localStorage.clear();
        dispatch(clearCalendarStatelogout());
        dispatch(logout());
       
    }
};

const logout = ()=>({
    type: types.authLogout
});



