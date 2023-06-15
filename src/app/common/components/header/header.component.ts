import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoginUser: boolean = false;
  isUsersCurrentRoute: boolean = false;

  ngOnInit(): void {
    this.isLoginUser = localStorage.getItem("userData") ? true : false;
  }

  constructor(
    public router: Router,
  ) {
    if (router.routerState.snapshot.url === '/users') {
      this.isUsersCurrentRoute = true;
    }
    // console.log(router.routerState.snapshot.url);
    
  }


  logOut() {
    localStorage.removeItem("userData");
    this.router.navigate(["/"]);
    window.location.reload();
  }
}
