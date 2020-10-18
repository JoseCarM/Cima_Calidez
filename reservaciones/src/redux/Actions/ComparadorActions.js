import * as types from '../const/actionTypes';

export const getCabanasDisponibles = (payload) => {
    return {
        type: types.GET_CABANAS_DISPONIBLES,
        payload
    }
}