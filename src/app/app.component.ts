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
  users = [];
  searchTerm = '';
  searchList = false;
  filterList = [];
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
        user
      }
    });
    return await modal.present();
  }

  openProfile(user) {
    window.open(user.html_url, '', 'width=800,height=600');
  }

  filterItems(searchTerm) {
    if (searchTerm !== '') {
      this.filterList = this.users.filter(item => {
        return item.login.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
      this.searchList = true;
    } else {
      this.filterList = [];
      this.searchList = false;
    }
  }


}
