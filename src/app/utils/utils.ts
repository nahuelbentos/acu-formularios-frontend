import { Instructor } from '../models/instructor.model';
import { DataRadioButton } from '../models/data-radiobutton.model';
import { Movil } from '../models/movil.model';
import { DataRadioButtonBoolean } from '../models/data-radiobutton-boolean.model';
import { errorMensaje } from './sweet-alert';
import { DataRadioButtonEnum } from '../models/data-radiobutton-enum.model';

export const  getColFromInstructor = (col: Instructor[]) =>
  col.map((item) => new DataRadioButton(item.EscInsId, item.EscInsNom));

export const getColFromMovil = (col: Movil[]) =>
    col.map((item) => new DataRadioButton(item.MovCod, item.MovCod.toString()));

export const validarColeccion = (coleccion: any[], mensaje: string ) => {
  if ( coleccion.find((item) => item.value === null) || coleccion.length === 0) {
    errorMensaje('Error', mensaje);
    return;
  }
}


function findElement(arr, func) {
  let num = 0;
  num = arr.find( func );
  return num;
}

findElement([1, 2, 3, 4], num => num % 2 === 0);

function largestOfFour(arr) {
  return arr.map( (array) => Math.max.apply(null, array) );
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);





function updateInventory(arr1: any[], arr2: any[]) {
    arr2.forEach( item => {
      const auxItem = arr1.find(item1 => item1[1] === item[1]);
      if( auxItem ){
        auxItem[0] = item[0];
      } else {
        arr1.push(item);
      }
      debugger
    })
  return arr1.sort( (a,b) => a[1] - b[1]);
}

updateInventory(
  [ [21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]],
  [ [2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]
  )

  updateInventory(
    [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]],
    [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]])

// Example inventory lists
var curInv = [
  [21, "Bowling Ball"],
  [2, "Dirty Sock"],
  [1, "Hair Pin"],
  [5, "Microphone"]
];

var newInv = [
  [2, "Hair Pin"],
  [3, "Half-Eaten Apple"],
  [67, "Bowling Ball"],
  [7, "Toothpaste"]
];




updateInventory(curInv, newInv);
