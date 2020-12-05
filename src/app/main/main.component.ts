import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public isLoading=false;
  faCoffee = faCoffee;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.isLoading = false;
      }
      if(event instanceof NavigationError && event.error.status === 404){
        this.router.navigate(["/404"]);
      }
    })
  }

}
