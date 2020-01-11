import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeaTime } from '../tea-time';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    teaTimeCollection: AngularFirestoreCollection<TeaTime>;
    teaTime: Observable<TeaTime[]>;

    constructor(public afs: AngularFirestore) {
        this.teaTimeCollection = this.afs.collection('tea', ref => ref.orderBy('teaType', 'asc'));

        this.teaTime = this.afs.collection('tea').snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as TeaTime;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    getTeaList() {
        return this.teaTime;
    }

    addTeaList(teaTime: TeaTime) {
        this.teaTimeCollection.add(teaTime);
    }

    delete(item: TeaTime) {
        this.afs.doc(`tea/${item.id}`).delete();
    }

    deleteAll(teaList: TeaTime[]) {
        teaList.forEach(element => {
            this.afs.doc(`tea/${element.id}`).delete();
        });
    }
}
