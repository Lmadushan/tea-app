import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TeaTime } from '../tea-time';
import { CommonService } from '../tabs/common.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  user = '';
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
    public commonService: CommonService,
    private alertController: AlertController
  ) { }

  placeOrder(type: number) {
    this.addToArray(type, this.user);
  }

  addToArray(type: number, person: string) {
    const tea = {
      name: person,
      teaType: type
    };
    const len = this.tea.filter((itm) => itm.name === person).length;
    if (len > 0) {
      this.commonService.delete(this.tea.filter((itm) => itm.name === person)[0]);
      this.commonService.addTeaList(tea);
    } else {
      this.commonService.addTeaList(tea);
    }
  }

  subscription() {
    this.commonService.getTeaList().subscribe((data) => {
      this.tea = data;

      this.teaCount = this.tea.filter((item) => item.teaType === 0).length;
      this.milkTeaCount = this.tea.filter((item) => item.teaType === 1).length;
      this.coffeeCount = this.tea.filter((item) => item.teaType === 2).length;
      this.milkCoffeeCount = this.tea.filter((item) => item.teaType === 3).length;
    });
  }

  async reset() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are You Sure?',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'primary',
          handler: () => {
            this.commonService.deleteAll(this.tea);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.subscription();
  }


}
