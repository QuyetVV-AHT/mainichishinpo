import { Component, OnInit } from '@angular/core';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { PublicService } from 'src/app/_services/public.service';
import { ResutlsService } from 'src/app/_services/resutls.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-resutl-user',
  templateUrl: './resutl-user.component.html',
  styleUrls: ['./resutl-user.component.scss']
})
export class ResutlUserComponent implements OnInit{

  pageSize = PAGESIZE;
  page = PAGE;
  count = COUNT;
   term = '';
   error = false;
   listResult: any;
   isLoggedIn = false;
   constructor(
    private publicService: PublicService,
    private tokenStorageService: TokenStorageService,
   ){   }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.publicService.getAllResultByUserId(user.id).subscribe(data =>{
        this.listResult = data;
      });
    }

  }

}
