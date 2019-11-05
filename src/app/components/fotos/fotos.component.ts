import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

export interface Item { nombre: string; url: string; }

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
})
export class FotosComponent {

  maximo = 9;

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore,
              public borrarService: CargaImagenesService) {
    this.itemsCollection = afs.collection<Item>('img');
    this.items = this.itemsCollection.valueChanges(); }

  verMas() {
    this.maximo += 9;
  }
}
