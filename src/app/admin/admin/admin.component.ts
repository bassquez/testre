import { Component, OnInit } from '@angular/core';

import { routeAnimations } from '@app/core';

@Component({
  selector: 'gp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routeAnimations]
})
export class AdminComponent implements OnInit {
  admin = [
    { link: 'admin-user', label: 'Administrar Usuarios' },
    { link: 'register-user', label: 'Registrar Usuario' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
