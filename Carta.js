export class Carta {
  constructor(palo, nombre) {
    this._palo = palo;
    this._nombre = nombre;
    this.volteada = false;
    this.id = 0;
  }
  get Nombre() {
    return this._nombre;
  }
  set Nombre(nombre) {
    this._nombre = nombre;
  }
  get Palo() {
    return this._palo;
  }
  set Palo(palo) {
    this._palo = palo;
  }

  toString() {
    return this._nombre + this._palo;
  }
}

