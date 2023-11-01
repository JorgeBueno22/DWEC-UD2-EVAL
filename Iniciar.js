import { Partida } from './Partida.js'

let partida = new Partida();

function pedirCartas() {
    // Pedir carta 1
    // Voltear carta 1
    // Pedir carta 2
    // Comprobar acierto
    if (partida.haFinalizado()) {
      console.log("PARTIDA FINALIZADA!!");
    } else {
      setTimeout(pedirCartas, 5000); 
    }
}
function cogerForm($event){
let posicion = document.getElementById("posicion").value; 
let listaPos = posicion.split("-");
console.log(posicion);
console.log(listaPos);
partida.voltea(Number(listaPos[0])-1,Number(listaPos[1])-1);
}

document.getElementById("boton").addEventListener("click", cogerForm);

partida.selecciona();
partida.reparte();
partida.mostrarTabla();
pedirCartas();