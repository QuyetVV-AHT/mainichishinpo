import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";


  isLoggedIn = false;
  username?: string;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  isAdmin!: boolean;

  constructor(private classToggler: ClassToggleService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService) {
    super();
  }
  ngOnInit(): void {
    this.isAdmin = false;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      if(user.roles.includes('ROLE_ADMIN')){
        this.isAdmin = true;
      }
    }
  }

  logout(){
    this.router.navigate(['logout']);
  }
}
