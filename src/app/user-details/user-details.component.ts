import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../services/github.service';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {

  @Input()
  user: any;

  repos: any;
  spinner = true;

  constructor(private githubService: GithubService, public modalController: ModalController) { }

  ngOnInit() {

    this.getUserRepose(this.user.login);
  }

  getUserRepose(userName) {
    this.githubService.getRepos(userName).subscribe(response => {
      this.spinner = false;
      this.repos = response;
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
