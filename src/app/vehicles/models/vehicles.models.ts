export class VehicleModel {

    id: number;
    marca: string;
    linea: string;
    referencia: string;
    modelo: string;
    kilometraje: number;
    color: string;
    imagen: string;

    public constructor(
        id: number,
        marca: string,
        linea: string,
        referencia: string,
        modelo: string,
        kilometraje: number,
        color: string,
        imagen: string
    ){
        this.id = id;
        this.marca = marca;
        this.linea = linea;
        this.referencia = referencia;
        this.modelo = modelo;
        this.kilometraje = kilometraje;
        this.color = color;
        this.imagen = imagen;
    }
}