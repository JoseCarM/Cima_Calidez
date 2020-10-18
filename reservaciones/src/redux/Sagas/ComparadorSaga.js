import { put, call, takeLatest } from "redux-saga/effects";
import { apiCall } from "../reservaciones_api/reservaciones_api";
import * as types from "../const/actionTypes";

export function* getCabanasDisponiblesSaga({ payload }) {
  try {
    const resultados = yield call(
      apiCall,
      "GET",
      `comparador?fechaDeEntrada=${payload.fechaDeEntrada}&fechaDeSalida=${payload.fechaDeSalida}`,
      null,
      {
        "Content-Type": "application/json",
      }
    );
    console.log("Disponibilidad de cabañas solicitada exitosamente.");
    yield put({ type: types.GET_CABANAS_DISPONIBLES_SUCCESS, resultados })
  } catch (error) {
    console.log("Error la solicitar disponibilidad de cabañas: ", error);
    yield put({ type: types.GET_CABANAS_DISPONIBLES_ERROR, payload })
  }
}

export default function* ComparadorSagas() {
  yield takeLatest(types.GET_CABANAS_DISPONIBLES, getCabanasDisponiblesSaga);
}
