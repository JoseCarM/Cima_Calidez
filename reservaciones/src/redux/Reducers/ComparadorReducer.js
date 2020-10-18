import * as types from "../const/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_CABANAS_DISPONIBLES_SUCCESS:
      return {
        ...state,
        cabanasDisponibles: action.resultados.data,
      };
    default:
      return { ...state };
  }
}
