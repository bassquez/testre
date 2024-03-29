import browser from 'browser-detect';
import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivationEnd, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import {MediaMatcher} from '@angular/cdk/layout';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  selectorAuth,
  routeAnimations
} from '@app/core';
import { environment as env } from '@env/environment';

import {
  NIGHT_MODE_THEME,
  selectorSettings,
  SettingsState,
  ActionSettingsChangeAnimationsPageDisabled
} from './settings';
import { AuthService } from './core/auth/auth.service';
import { AnimationsService } from './core';

@Component({
  selector: 'gp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  mobileQuery: MediaQueryList;
  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo333.png');

  isAuthenticated;
  private _mobileQueryListener: () => void;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title,
    private animationService: AnimationsService,
    public auth: AuthService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }


  private static trackPageView(event: NavigationEnd) {
    (<any>window).ga('set', 'page', event.urlAfterRedirects);
    (<any>window).ga('send', 'pageview');
  }

  private static isIEorEdge() {
    return ['ie', 'edge'].includes(browser().name);
  }

  ngOnInit(): void {

    this.subscribeToSettings();
    this.subscribeToIsAuthenticated();
    this.subscribeToRouterEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLoginClick() {
    this.store.dispatch(new ActionAuthLogin());
  }

  onLogoutClick() {
    this.auth.logout();
  }

  private subscribeToIsAuthenticated() {
    this.store
      .select(selectorAuth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
  }

  private subscribeToSettings() {
    if (AppComponent.isIEorEdge()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }
    this.store
      .select(selectorSettings)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        this.setTheme(settings);
        this.animationService.updateRouteAnimationType(
          settings.pageAnimations,
          settings.elementsAnimations
        );
      });
  }

  private setTheme(settings: SettingsState) {
    const { theme, autoNightMode } = settings;
    const hours = new Date().getHours();
    const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
      ? NIGHT_MODE_THEME
      : theme
    ).toLowerCase();
    this.componentCssClass = effectiveTheme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  private subscribeToRouterEvents() {
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof ActivationEnd || event instanceof NavigationEnd
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(event => {
        if (event instanceof ActivationEnd) {
          this.setPageTitle(event);
        }

        if (event instanceof NavigationEnd) {
          AppComponent.trackPageView(event);
        }
      });
  }

  private setPageTitle(event: ActivationEnd) {
    let lastChild = event.snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    this.titleService.setTitle(
      title ? `${title} - ${env.appName}` : env.appName
    );
  }
}
