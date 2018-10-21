import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'gp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routeAnimations]
})
export class DashboardComponent implements OnInit {
  navigationDashboard = [
    { link: '../proyecto', label: 'Proyectos', icon: 'assessment' },
    { link: '../contratista', label: 'Contratista', icon: 'people' },
    { link: '../fuente-financiacion', label: 'Fuentes de Financiación', icon: 'attach_money' },
    { link: '../interventoria', label: 'Interventoria', icon: 'bar_chart' },
    { link: '../factura', label: 'Factura', icon: 'money' }
  ];
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goToHome() {
    this.router.navigate(['home'])
  }

}
