import { Component, OnInit } from '@angular/core';
import { routeAnimations } from '../../core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gp-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [routeAnimations]
})
export class RootComponent implements OnInit {

  switch = true;

  navigationDashboard = [
    { link: 'proyecto', label: 'Proyectos', icon: 'assessment' },
    { link: 'contratista', label: 'Contratista', icon: 'people' },
    { link: 'fuente-financiacion', label: 'Fuentes de Financiación', icon: 'attach_money' },
    { link: 'interventoria', label: 'Interventoria', icon: 'bar_chart' },
    { link: 'factura', label: 'Factura', icon: 'money' }
  ];
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.showBar();
  }
  goToHome() {
    this.router.navigate(['dashboard/home']);
  }
  showBar() {
    if (this.router.url === '/home') {
      this.switch = false;
    }
  }
}
