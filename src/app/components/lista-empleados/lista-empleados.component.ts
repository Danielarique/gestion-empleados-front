import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'

import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
/* import Swal from 'sweetalert2';
 */

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  empleados:Empleado[] = [];
  dataSource = new MatTableDataSource<Empleado>(this.empleados);
  columns: string[] = ['nombre', 'apellido', 'email', 'acciones'];
  constructor(private empleadoService: EmpleadoService, private router: Router,
    public dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(){
    this.empleadoService.obtenerListaEmpleados().subscribe(data=>{
      this.empleados = data;
      this.dataSource = new MatTableDataSource(this.empleados);
      this.dataSource.sort = this.sort;
    })
  }

  nuevoEmpleado(){
    this.router.navigate(['/registrar-empleado'])
  }

  actualizarEmpleado(idEmpleado:number){
    this.router.navigate(['/actualizar-empleado', idEmpleado])
    
  }

  eliminarEmpleado(idEmpleado:number){
    const dialogRef = this.dialog.open(ConfirmacionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empleadoService.eliminarEmpleado(idEmpleado).subscribe(data=>{ 
          console.log("eliminado")
          this.obtenerEmpleados();

        })
      } else {
        // Acción cancelada
        console.log("cancelar")
        
      }
    })
  /*   this.empleadoService.eliminarEmpleado(idEmpleado).subscribe(data=>{
      this.obtenerEmpleados();
    }) */

    /* Swal.fire({
      title: 'Esta seguro de eliminar el empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {

        this.empleadoService.eliminarEmpleado(idEmpleado).subscribe(data=>{ */
        /*   Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Borrado',
            showConfirmButton: false,
            timer: 1500
          }); */
  
          /* this.obtenerEmpleados();
        })
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
       
      }
    }) */
  }
}
