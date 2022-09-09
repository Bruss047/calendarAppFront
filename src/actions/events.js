import { fetchConToken } from '../helpers/fetch';
import { types } from './../types/types';
import { prepareEvents } from './../helpers/prepararEventos';
import Swal from 'sweetalert2';



export const eventStartAddNew = (event) =>{

    try {
        return async(dispatch, getState) =>{

        const {uid,name}=getState().auth;
        const resp = await fetchConToken('events',event,'POST');
        const body = await resp.json();
            console.log(body)
        if(body){
            event.id=body.evento.id;

            event.user={
                _id:uid,
                name:name

            }
            dispatch(eventAddNew(event));
        }
    }
        
    } catch (error) {
        console.log(error)
    }
    

};

const eventAddNew = (event) =>({

    type: types.eventAddNew,
    payload: event

});

export const eventSetActive = (event) =>({

    type: types.eventSetActive,
    payload: event

});

export const eventClearActiveEvent = () =>({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = (event) =>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken(`events/${event.id}`,event,'PUT');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error)
        }
    }
};

const eventUpdated = (event) =>({
    type: types.eventUpdated,
    payload: event
});


export const eventStartDelete = () =>{
    return async (dispatch, getState)=>{

        const {id} = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDeleted());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}

const eventDeleted = () =>({ type: types.eventDeleted });


export const eventStartLoading = () =>{
    return async(dispatch)=>{
        try {
            const resp= await fetchConToken('events'); //realiza una peticion GET por defecto.
            const body= await resp.json();

            const events = prepareEvents(body.eventos);

            dispatch(eventLoaded(events));
            
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = (events)=>({
    type: types.eventLoaded,
    payload: events
});

export const clearCalendarStatelogout = ()=>({
    type: types.eventLogOut
}); //no necesita ser asincrono ya que solo limpia lo que hay alojado en el store/reducer.
