import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  public usuarios: any[] = [];

  constructor(
    private router: Router,
    private _usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this._usuariosService.getUsers().subscribe( ( usuarios: any[] ) => {
      this.usuarios = usuarios;
    });
  }

  editar( id: number ) {
    this.router.navigate(['editarEmpleado', id]);
  }

  borrar( id: string ) {
    this._usuariosService.deletUser( id ).subscribe( () => {
      this.cargarUsuarios();
    });
  }
}
