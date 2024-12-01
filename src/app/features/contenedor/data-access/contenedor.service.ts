import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContenedorService {
  
  private IOT_API = environment.iotApi;

  constructor(
    private http: HttpClient
  ) { }

  obtenerContenedores(params?: any) {
    let httpParams = new HttpParams();
    
    if(params) {
      if(params.contenedor_identificador) {
        httpParams = httpParams.set('contenedor_identificador', params.contenedor_identificador);
      }
  
      if(params.contenedor_activo) {
        httpParams = httpParams.set('contenedor_activo', params.contenedor_activo);
      }

      if(params.paginaActual) {
        httpParams = httpParams.set('paginaActual', params.paginaActual);
      }

      if(params.cantidadPorPagina) {
        httpParams = httpParams.set('cantidadPorPagina', params.cantidadPorPagina);
      }

    }


    return this.http.get(`${this.IOT_API}/contenedor`, { params: httpParams })
  }

  actualizarContenedor(contenedor: any) {
    return this.http.put(`${this.IOT_API}/contenedor/${contenedor.contenedor_id}`, contenedor)
  }

  crearContenedor(contenedor: any) {
    return this.http.post(`${this.IOT_API}/contenedor`, contenedor)
  }
  obtenerInformacionDashboard() {
    return this.http.get(`${this.IOT_API}/contenedor/obtenerInformacionDashboard`)
  }

}