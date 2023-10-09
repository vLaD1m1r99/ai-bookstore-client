import { Route } from '@angular/router';
import { SettingsComponent } from './components/settings.component';

export const settingsRoutes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    data: { title: 'Settings' },
  },
];
