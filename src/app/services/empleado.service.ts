import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { ActualizarEmpleadoDTO, Empleado } from '../models/empleado';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  
  //private baseUrl = "http://localhost:8080/api/v1/empleados";
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient){}
  

  /**
   * @description Obtiene lista empleados
   * @returns 
   */
  obtenerListaEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.baseUrl}/api/v1/empleados`)
  }
  
  /**
   * 
   * @param empleado 
   * @returns 
   */
  registrarEmpleado(empleado:Empleado):Observable<Object>{
    return this.http.post(`${this.baseUrl}/api/v1/empleados`,empleado);
  }

  obtenerEmpleado(idEmpleado:number):Observable<Empleado>{
    return this.http.get<Empleado>(`${this.baseUrl}/api/v1/empleados/${idEmpleado}`)
  }

  actualizarEmpleado(idEmpleado:number, dto: ActualizarEmpleadoDTO): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.baseUrl}/api/v1/empleados/${idEmpleado}`, dto);
  }

  fetchObtenerActualizar(idEmpleado:number, dto: ActualizarEmpleadoDTO){
    return zip(this.obtenerEmpleado(idEmpleado),
    this.actualizarEmpleado(idEmpleado, dto));
  }

   eliminarEmpleado(idEmpleado:number){
    return this.http.delete(`${this.baseUrl}/api/v1/empleados/${idEmpleado}`);
  } 
  

}
