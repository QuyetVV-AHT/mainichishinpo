import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;
  isLoggedIn = false;
  username?: string;
  isAdmin!: boolean;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(
    private tokenStorageService: TokenStorageService,

  ) {}
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
}
