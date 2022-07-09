import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  title = 'employee';
  currentUrl;
  currentUrlSub:Subscription;
  constructor(private activatedRoute:ActivatedRoute,
    private router:Router) {    
  }

  ngOnInit(): void {   
    this.currentUrlSub = 
    this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        this.currentUrl = evt.url;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.currentUrlSub){
      this.currentUrlSub.unsubscribe();
    }
  }

  routeToPage(url:string){
    this.router.navigateByUrl(url);
  }

  


}

