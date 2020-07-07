import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private URL_SERVICIOS = environment.urlServicios;

  constructor( private http: HttpClient ) { }

  getUsers() {
    const url = `${ this.URL_SERVICIOS }/readAllData`;
    return this.http.get( url );
  }

  addUser( usuario: any ) {
    const url = `${ this.URL_SERVICIOS }/createData`;
    return this.http.post( url, usuario )
    .pipe(
      map( ( resp: any ) => {
        const alert = {
          icon: 'success',
          title: 'Empleado creado.'
        };
        this.showAlert( alert );
        return true;
      }),
      catchError( err => {
        const alert = {
          icon: 'error',
          title: 'Error al intentar crear el empleado, intenta de nuevo.'
        };
        this.showAlert( alert );
        return throwError( err );
      })
    );
  }

  getUser( id: string ) {
    const url = `${ this.URL_SERVICIOS }/readData`;
    const paramId = new HttpParams().set('id', id );
    return this.http.get( url, { params: paramId } )
    .pipe(
      catchError( err => {
        const alert = {
          icon: 'error',
          title: 'Error al cargar el empleado, intenta de nuevo.'
        };
        this.showAlert( alert );
        return throwError( err );
      })
    );
  }

  deletUser( id: string ) {
    const url = `${ this.URL_SERVICIOS }/deleteData`;
    return this.http.delete( url, { params: { id } } )
    .pipe(
      map( ( resp: any ) => {
        const alert = {
          icon: 'success',
          title: 'Empleado eliminado.'
        };
        this.showAlert( alert );
        return true;
      }),
      catchError( err => {
        const alert = {
          icon: 'error',
          title: 'Error al intentar eliminar el empleado, intenta de nuevo.'
        };
        this.showAlert( alert );
        return throwError( err );
      })
    );
  }

  updateUser( user: any ) {
    const url = `${ this.URL_SERVICIOS }/updateData`;
    return this.http.put( url, user )
    .pipe(
      map( ( resp: any ) => {
        const alert = {
          icon: 'success',
          title: 'Empleado actualizado.'
        };
        this.showAlert( alert );
        return true;
      }),
      catchError( err => {
        const alert = {
          icon: 'error',
          title: 'Error al intentar actualizar el empleado, intenta de nuevo.'
        };
        this.showAlert( alert );
        return throwError( err );
      })
    )
  }

  showAlert( alert: any ) {

    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: 'top-end',
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   onOpen: (toast) => {
    //     toast.addEventListener( 'mouseenter', Swal.stopTimer )
    //     toast.addEventListener( 'mouseleave', Swal.resumeTimer )
    //   }
    // });

    // Toast.fire( alert );
  }

}
