import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-items';

@Directive({
  selector: '[appNgdropfiles]'
})
export class NgdropfilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter() ;

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this.prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transferencia = this.getTransferencia(event);

    if (!transferencia) {
      return;
    }
    this.extraerArchivos(transferencia.files);

    this.prevenirDetener(event);
    this.mouseSobre.emit(false);

  }

  private getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos(archivosLista: FileList) {

    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {

      const archivoTemporal = archivosLista[propiedad];

      if (this.archivoPuedeSerCargado(archivoTemporal) ) {

        const nuevoArchivo = new FileItem (archivoTemporal);
        this.archivos.push(nuevoArchivo);

      }
    }
    console.log(this.archivos);



  }

  // Validaciones

  private archivoPuedeSerCargado(archivo: File): boolean {
    if (!this.archivoYaFueDropeado(archivo.name) && this.esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  private prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoYaFueDropeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo' + nombreArchivo + 'ya esta guardado.');
        return true;
  }}return false;
  }

  private esImagen( tipoArchivo: string): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
