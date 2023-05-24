import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css'],
})
export class NuevoEmpleadoComponent implements OnInit {
  empleadoForm!: FormGroup;
  idEmpleado:number = 0;
  empleado: Empleado | null = null;
  private sub:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.idEmpleado = Number(params.get('id'));
    });

    console.log(this.idEmpleado)
    
    this.cargarForm();
  }

  async cargarForm() {
    this.empleadoForm = this.fb.group({
      nombre: ['',[ Validators.required, Validators.minLength(3)]],
      apellido: ['',[ Validators.required, Validators.minLength(3)]],
      email: ['',[ Validators.required, Validators.email]],
    });
    
    if(this.idEmpleado){
      this.empleado = await this.obtenerEmpleado(this.idEmpleado);

      this.empleadoForm.controls['nombre'].setValue(this.empleado['nombre']);
      this.empleadoForm.controls['apellido'].setValue(this.empleado['apellido']);
      this.empleadoForm.controls['email'].setValue(this.empleado['email']);
    }

  }

  guardarEmpleado() {
    this.empleadoService.registrarEmpleado(this.empleadoForm.value).subscribe(
      (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Empleado guardado',
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigate(['/empleados']);
      },
      (error) => console.log(error)
    );
  }

  actualizarEmpleado(){
    this.empleadoService.actualizarEmpleado(this.idEmpleado,this.empleadoForm.value).subscribe(
      (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Empleado actualizado',
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigate(['/empleados']);
      },
      (error) => console.log(error)
    );
  }
  

  onSubmit() {

     if(this.empleadoForm.valid){
        if(this.idEmpleado !== 0){
        this.actualizarEmpleado();
      }else{
        this.guardarEmpleado();
      }  
    }else{
      this.empleadoForm.markAllAsTouched()
    } 
   /*  */
   
  }

  async obtenerEmpleado(idEmpleado:number|null):Promise<Empleado>{
    return new Promise((resolve,reject)=>{
      if(idEmpleado){
        this.empleadoService.obtenerEmpleado(idEmpleado).subscribe(data=>{
          if(data){
            resolve(data);
          }
          reject();
        })
      }
    })

  }
}
