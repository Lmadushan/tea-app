import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TeaTime } from '../tea-time';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  teaTypes = [
    {
      name: 'Tea'
    },
    {
      name: 'Milk Tea'
    },
    {
      name: 'Coffee'
    },
    {
      name: 'Milk Coffee'
    },
  ];

  tea: TeaTime[] = [];

  constructor(
    private alertController: AlertController
  ) { }

  placeOrder(type: number) {
    this.presentAlert(type);
  }

  async presentAlert(type: number) {
    const alert = await this.alertController.create({
      header: 'Who want ' + this.teaTypes[type].name + '?',
      subHeader: type.toString(),
      inputs: [
        {
          name: 'Name',
          type: 'text',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Okay',
          handler: (alertData) => {
            this.addToArray(type, alertData.Name);
          }
        }
      ]
    });

    await alert.present();
  }

  addToArray(type: number, person: string) {
    console.log(this.tea);
    if (this.tea.length !== 0) {
      this.tea.forEach(element => {
        if (element.name === person) {
          element.teaType = type;
        } else {
          this.tea.push({
            teaType: type,
            name: person
          });
        }
      });
    } else {
      this.tea.push({
        teaType: type,
        name: person
      });
    }
  }

}
