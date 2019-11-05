import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [] ;
  estaSobreElemento = false;

  constructor(public cargaImagenes: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this.cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

  borrarArchivos() {
    this.archivos = [];
  }

}
