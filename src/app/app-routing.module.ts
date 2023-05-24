import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './components/empleados/lista-empleados/lista-empleados.component';
import { NuevoEmpleadoComponent } from './components/empleados/nuevo-empleado/nuevo-empleado.component';

export const routes: Routes = [
  {
    path:'empleados',
    component: ListaEmpleadosComponent
  },
  {
    path:'registrar-empleado',
    component: NuevoEmpleadoComponent
  },
  {
    path:'actualizar-empleado/:id',
    component: NuevoEmpleadoComponent
  },
  {
    path: '',
    redirectTo: 'empleados',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
