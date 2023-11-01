import { Carta } from './Carta.js'
 export class Baraja {
    constructor() {
      this.cartas = [];
      const palos = ["PICAS", "CORAZONES", "TRÉBOLES", "DIAMANTES"];
      const nombres = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "J",
        "Q",
        "K",
      ];
  
      for (const palo of palos) {
        for (const nombre of nombres) {
          const carta = new Carta(palo, nombre);
          this.cartas.push(carta);
        }
      }
    }
    generaCarta() {
      const numeroRandom = Math.floor(Math.random() * this.cartas.length);
      const carta = this.cartas[numeroRandom];
      this.cartas.splice(numeroRandom, 1);
      return carta;
    }
  }