import axios from "axios";

//conexion entre front y back

import {GET_PETS} from '../ActionsTypes/actions_types'

//estos datos vienen del array harckodeado
import {pets} from '../../Datos.js'

/*como no tenemos datos del back por el momento traeremos
 datos de un array cargado de nosotros 😁😁😁*/
export const getPets = () => {
 return function (dispatch) {
   try {
    dispatch({
      type: GET_PETS,
       payload:pets,
    });
   } catch (error) {
    console.error("Error in get Pets: ", error);
   }
  };
};



/* 


modo promesas




export function getVideogames() {
  return function (dispatch) {
    axios
      .get("videogames/")

      .then((r) => {
        dispatch({
          type: GET_VIDEOGAMES,
          payload: r.data,
        });
      })

      .catch((error) => {
        console.error("Error in getVideogames: ", error);
      });

    // console.log(r.data);
  };
}

*/
