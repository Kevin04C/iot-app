import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaContenedoresComponent } from './lista-contenedores/lista-contenedores.component';

const routes: Routes = [
  { path: "", component: ListaContenedoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenedorRoutingModule { }
