import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContenedorService } from '../../data-access/contenedor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-contenedor',
  templateUrl: './modal-contenedor.component.html',
  styleUrl: './modal-contenedor.component.scss',
  providers: [MessageService]
})
export class ModalContenedorComponent implements OnInit {

  public form: FormGroup;
  public loading = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private contenedorService: ContenedorService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      contenedor_id: [null, []],
      contenedor_identificador: ["", [Validators.required]],
      contenedor_peso: ["", [Validators.required]],
      contenedor_humedad: ["", [Validators.required]],
      contenedor_posicion: ["", [Validators.required]],
      contenedor_activo: [true, [Validators.required]],
      contenedor_temperatura: ["", [Validators.required]],
    });

    let contenedor = null;

    if (this.config.data && this.config.data.contenedor) {
      contenedor = this.config.data.contenedor;
    }

    if (contenedor) {
      console.log(contenedor);
      this.form.patchValue(contenedor);
    }

    console.log(this.config.data);


    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }

  public guardar(): void {
    if (this.form && this.form.get("contenedor_id").value && Number(this.form.get("contenedor_id").value) > 0) {
      this.actualizarContenedor();
    } else {
      this.crearContenedor();
    }
  }

  public cancelar(): void {
    let params = {}

    this.ref.close(params);
  }

  public actualizarContenedor() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const contenedor = this.form.getRawValue();
    const formData = new FormData();

    // Añade los campos del formulario al FormData
    for (const key in contenedor) {
      if (contenedor.hasOwnProperty(key)) {
        formData.append(key, contenedor[key]);
      }
    }

    // Convierte el valor booleano a numérico
    formData.set('contenedor_activo', contenedor.contenedor_activo ? '1' : '0');

    this.loading = true;
    this.contenedorService.actualizarContenedor(formData)
      .subscribe({
        next: (response: any) => {
          this.loading = false;

          const params = {
            actualizar: true
          };

          this.ref.close(params);
        },
        error: (error: any) => {
          this.loading = false;
          console.error(error);
        }
      });
  }

  public crearContenedor() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const contenedor = this.form.getRawValue();
    const formData = new FormData();

    // Añade los campos del formulario al FormData
    for (const key in contenedor) {
      if (contenedor.hasOwnProperty(key)) {
        formData.append(key, contenedor[key]);
      }
    }

    // Convierte el valor booleano a numérico
    formData.set('contenedor_activo', contenedor.contenedor_activo ? '1' : '0');

    // Remueve el ID del contenedor para crearlo
    formData.delete('contenedor_id');

    this.loading = true;
    this.contenedorService.crearContenedor(formData)
      .subscribe({
        next: (response: any) => {
          this.loading = false;

          const params = {
            actualizar: true
          };

          this.ref.close(params);
        },
        error: (error: any) => {
          this.loading = false;
          console.error(error);
        }
      });
  }



}
