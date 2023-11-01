import { Baraja } from './Baraja.js'

 export class Partida {
    constructor(filas, columnas) {
      if (
        typeof filas !== "number" ||
        typeof columnas !== "number" ||
        (filas * columnas) % 2 !== 0
      ) {
        filas = 4;
        columnas = 4;
      }
      this.filas = filas;
      this.columnas = columnas;
      this.baraja = new Baraja();
      this.cartasSeleccionadas = [];
      this.mazo = [];
      this.cartaVolteada = null;
      this.aciertos = 0;
      this.numeroIntentos = 0;
      this.parejaActual = [];
    }
    selecciona() {
      const numeroDeCartas = this.filas * this.columnas;
      for (let i = 0; i < numeroDeCartas / 2; i++) {
        let nuevaCarta = this.baraja.generaCarta();
        let nuevaCarta2 = {};
        Object.assign(nuevaCarta2,nuevaCarta);
        this.cartasSeleccionadas.push(nuevaCarta, nuevaCarta2);
      }
    }
    baraja() {
      this.cartasSeleccionadas.sort (() => Math.random () - 0.5 );
    }
    reparte() {
      for (let i = 0; i < this.filas; i++) {
        this.mazo[i] = [];
        for (let j = 0; j < this.columnas; j++) {
          const carta = this.cartasSeleccionadas.pop();
          this.mazo[i][j] = carta;
        }
      }
    }

    esPosicionValida(fila, columna){

      console.log(this.filas,this.columnas);
      console.log(this.mazo);
      if(fila<this.filas && columna<this.columnas && fila>=0 && columna>=0 ){
        return true;
      }
      else{
        return false;
      }

    }

    voltea(fila, columna) {
      if (!this.esPosicionValida(fila, columna)) {
        console.log("Posición no válida.");
        return;
      }
  
      const carta = this.mazo[fila][columna];
  
      if (carta.volteada) {
        console.log("La carta ya está volteada.");
        return;
      }
  
      carta.volteada = true;
      this.intentos++;
  
      if (this.parejaActual.length === 1) {
        if (this.compruebaAcierto(fila, columna)) {
          this.aciertos++;
        } else {
          setTimeout(() => {
            this.volteaCarta(
              this.parejaActual[0].fila,
              this.parejaActual[0].columna
            );
            this.volteaCarta(
              this.parejaActual[1].fila,
              this.parejaActual[1].columna
            );
          }, 1000);
        }
        this.parejaActual = [];
      } else {
        this.parejaActual.push({ fila, columna });
      }
    }


  
    compruebaAcierto(fila, columna) {
      let parejaAnterior = this.parejaActual[0];
      let cartaActual = this.mazo[fila][columna];
      let cartaAnterior = this.mazo[parejaAnterior.fila][parejaAnterior.columna];
     /*
     En este metodo me da error a la hora de decir si es correcta o no la carta, debido a que los valores son undefined,
      no he conseguido llegar a una solución.
      console.log(cartaActual.nombre);
      console.log(cartaAnterior.palo);  
      */

      if (
        cartaActual.nombre === cartaAnterior.nombre &&
        cartaActual.palo === cartaAnterior.palo
      ) {
        console.log("Pareja Correcta");
        return true;
      }
     console.log("Pareja Incorrecta");
     cartaActual.volteada = false;
     cartaAnterior.volteada = false;
     return false;
    }
  
    haFinalizado() {
      return this.aciertos === (this.filas * this.columnas) / 2;
    }
  
    _cartaEnMazo(carta) {
      for (let fila = 0; fila < this.filas; fila++) {
        for (let columna = 0; columna < this.columnas; columna++) {
          if (this.mazo[fila][columna] == carta) {
            return true;
          }
        }
      }
      return false;
    }
    mostrarTabla() {
      let codigoHTML = "<table>";
      for (let i = 0; i < this.mazo.length; i++) {
        codigoHTML += "<tr>";
        for (let j = 0; j < this.mazo[i].length; j++) {
          if (this.mazo[i][j] === null) {
            codigoHTML += "<td></td>";
          } else if (this.mazo[i][j].volteada) {
            codigoHTML +=
              "<td>" +
              this.mazo[i][j].nombre +
              "<br>" +
              this.mazo[i][j].palo +
              "</td>";
          } else {
            codigoHTML += "<td><br></td>";
          }
        }
        codigoHTML += "</tr>";
      }
      codigoHTML += "</table>";
      document.getElementById("mazo").innerHTML = codigoHTML;
    } 
  }
