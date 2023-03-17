import axios from "axios";

//conexion entre front y back

import {GET_PETS,GET_DETAIL_PETS} from '../ActionsTypes/actions_types'

//estos datos vienen del array harckodeado
import {pets} from '../../Datos.js';



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

export function getDetails(id) {
  //console.log(id)


  if (id) {
    return async function (dispatch) {
      try {
       // const response = await axios.get(`Pet/${id}`);
      dispatch({
          type: GET_DETAIL_PETS,
          payload:pets
        });  
      } catch (error) {
        console.log(error);
      }
    };
  }
  /*  return {
    type: "RESET",
  }; */
}



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
