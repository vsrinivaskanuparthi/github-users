import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from './services/github.service';
import { ModalController } from '@ionic/angular';
import { UserDetailsComponent } from './user-details/user-details.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  users;
  ngOnInit() {
    this.getUsers();
  }
  constructor(private router: Router, private githubService: GithubService, public modalController: ModalController) { }

  getUsers() {
    this.githubService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  getUserDetails(userData) {

    this.presentModal(userData);

  }

  async presentModal(user: any) {
    const modal = await this.modalController.create({
      component: UserDetailsComponent,
      cssClass: 'send-deal-modal',
      componentProps: {
        user: user
      }
    });

    // modal.onDidDismiss().then((result) => {
    //   this.retrieveData();
    // });
    return await modal.present();
  }

}
