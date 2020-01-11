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
  teaCount = 0;
  milkTeaCount = 0;
  coffeeCount = 0;
  milkCoffeeCount = 0;

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
    this.tea = this.tea.filter((item) =>
      item.name !== person);
    this.tea.push({
      name: person,
      teaType: type
    });

    this.teaCount = this.tea.filter((item) => item.teaType === 0).length;
    this.milkTeaCount = this.tea.filter((item) => item.teaType === 1).length;
    this.coffeeCount = this.tea.filter((item) => item.teaType === 2).length;
    this.milkCoffeeCount = this.tea.filter((item) => item.teaType === 3).length;
  }

}
