import { VerifyReportComponent } from './components/verify-report/verify-report.component';
import { VerifyComponent } from './components/verify/verify.component';
import { PublicInterfaceComponent } from './components/public-interface/public-interface.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'interface',
        component: PublicInterfaceComponent
      },
      {
        path: 'document-authenticity',
        component: VerifyReportComponent
      },
      {
        path: 'verify/receipt/:financialTransactionId',
        component: VerifyComponent
      },
      {
        path: 'verify/report/:siteVisitId',
        component: VerifyComponent
      },
      {
        path: '',
        redirectTo: '/public/interfce'
      }
    ]
  }
];


