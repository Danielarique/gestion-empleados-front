export interface Empleado {
    id:number;
    nombre:string;
    apellido:string;
    email:string;
}

export interface ActualizarEmpleadoDTO extends Omit<Empleado, 'id'>{
}
