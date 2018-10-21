import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AnimationsService, routeAnimations } from '../../core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'gp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [routeAnimations]
})
export class SidebarComponent implements OnInit {
  navigation = [
    { link: 'about', label: 'About', icon: '', auth: true }
  ];
  constructor( public overlayContainer: OverlayContainer,
    public auth: AuthService) { }

  ngOnInit() {
    this.navigation = [
      { link: 'dashboard', label: 'Tablero de trabajo', icon: 'dashboard', auth: true },
      { link: 'admin', label: 'Administrador', icon: 'supervisor_account', auth:  this.auth.isAdmin}
    ];
  }

}
