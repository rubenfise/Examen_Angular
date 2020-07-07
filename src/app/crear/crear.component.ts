import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  forma: FormGroup;
  nombre: FormControl;
  apellidoPat: FormControl;
  apellidoMat: FormControl;
  email: FormControl;

  constructor(
    private _usuariosService: UsuariosService ,
    private router: Router
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.nombre = new FormControl('', [Validators.required, Validators.minLength(2)] );
    this.apellidoPat = new FormControl('', [Validators.required, Validators.minLength(2)] );
    this.apellidoMat = new FormControl('', [Validators.required, Validators.minLength(2)] );
    this.email = new FormControl('', [Validators.required, Validators.email] );
  }

  createForm(){
    this.forma = new FormGroup({
      nombre: this.nombre,
      apellidoPat: this.apellidoPat,
      apellidoMat: this.apellidoMat,
      email: this.email
    });
  }

  enviar() {

    if ( this.forma.valid ) {

      const usuario: any = {
        "id": String( Math.floor(Math.random() * (1000 - 1)) + 1 ),
        "data": {
            "nombre": this.forma.value.nombre,
            "apellidoPat": this.forma.value.apellidoPat,
            "apellidoMat": this.forma.value.apellidoMat,
            "email": this.forma.value.email
        }
      };
      this._usuariosService.addUser( usuario ).subscribe( () => this.router.navigate(['empledos']) );
    }
  }

}
