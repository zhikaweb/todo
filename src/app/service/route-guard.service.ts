import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {HardcodedAuthenticationService} from "./hardcoded-authentication.service";


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.hardcodedAuthenticationService.isUserLoggedIn())
      return true;
    //прежде чем выкинуть false, делаем редирект на логин-пэйдж, для этого в парамаетр метода инжектим РОутер
    this.router.navigate(['login']);
    return false;
  }
}
