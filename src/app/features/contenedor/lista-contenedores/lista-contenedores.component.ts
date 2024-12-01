import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContenedorService } from '../data-access/contenedor.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DateUtilityService } from 'src/app/demo/service/date-utility.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalContenedorComponent } from '../modals/modal-contenedor/modal-contenedor.component';

@Component({
  selector: 'app-lista-contenedores',
  templateUrl: './lista-contenedores.component.html',
  styleUrl: './lista-contenedores.component.scss',
  providers: [DialogService]
})
export class ListaContenedoresComponent implements OnInit {

  public contenedores = [];
  public cargando = false;
  public paginaActual = 0;
  public cantidadPorPagina = 10;
  public totalRegistros: any;
  public totalPaginas: any;

  public form: FormGroup;

  public dialogRef: DynamicDialogRef | undefined;

  constructor(
    private contendorService: ContenedorService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      contenedor_identificador: [''],
      inactivos: [[]]
    })

    const params = this.obtenerParams();
    this.obtenerContenedores(params);

    this.form.valueChanges.
      pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        const params = this.obtenerParams();
        this.obtenerContenedores(params);
      })

  }


  private obtenerContenedores(params?: any): void {
    this.cargando = true;
    this.contendorService.obtenerContenedores(params).subscribe({
      next: (response: any) => {
        const data: any[] = response.data;
        const pagination = response.pagination;


        data.forEach((contenedor) => {
          contenedor.contenedor_fechaFormateada = DateUtilityService.formatearFecha(contenedor.contenedor_fecha);
          contenedor.contenedor_activo = contenedor.contenedor_activo == '1';
        })

        this.contenedores = data;
        this.totalRegistros = pagination.total;
        this.totalPaginas = pagination.totalPaginas;

        this.cd.detectChanges();
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }
  public pageChange(event: any): void {
    this.paginaActual = event.first;
    this.cantidadPorPagina = event.rows;
  }


  public get contenedorIdentificador() {
    return this.form.get('contenedor_identificador');
  }

  public get inactivos() {
    let inactivos = this.form.get('inactivos');

    if (inactivos.value && inactivos.value.length) {
      return inactivos.value[0];
    }

    return '0'
  }

  private obtenerParams() {
    let params = {};

    if (this.contenedorIdentificador && this.contenedorIdentificador.value && this.contenedorIdentificador.value != '') {
      params['contenedor_identificador'] = this.contenedorIdentificador.value;
    }

    if (this.inactivos) {
      if (this.inactivos == '0') {
        params['contenedor_activo'] = '1';
      } else {
        params['contenedor_activo'] = '0';
      }
    }

    params['paginaActual'] = (this.paginaActual) + 1;
    params['cantidadPorPagina'] = this.cantidadPorPagina;

    return params;
  }

  public actualizarContenedores() {
    const params = this.obtenerParams();
    this.obtenerContenedores(params);
  }

  public paginate(event: any) {
    this.paginaActual = event.page;
    this.cantidadPorPagina = event.rows;
    this.actualizarContenedores();
  }

  public editarContenedor(contenedor: any) {
    this.dialogRef = this.dialogService.open(ModalContenedorComponent, {
      data: {
        contenedor
      },
      width: '740px'
    });


    this.dialogRef.onClose.subscribe((params) => {
      if (params && params.actualizar) {
        this.actualizarContenedores();
      }

    })
  }


  public nuevoContenedor() {
    this.dialogRef = this.dialogService.open(ModalContenedorComponent, {
      width: '740px'
    });

    this.dialogRef.onClose.subscribe((params) => {
      if (params && params.actualizar) {
        this.actualizarContenedores();
      }
    })

  }


}
