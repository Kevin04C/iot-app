import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenedorRoutingModule } from './contenedor-routing.module';
import { ListaContenedoresComponent } from './lista-contenedores/lista-contenedores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ModalContenedorComponent } from './modals/modal-contenedor/modal-contenedor.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    ListaContenedoresComponent,
    ModalContenedorComponent
  ],
  imports: [
    ContenedorRoutingModule,
    CommonModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ChipModule,
    ReactiveFormsModule,
    PaginatorModule,
    InputSwitchModule,
    ToastModule,
    RippleModule
  ]
})
export class ContenedorModule { }
