import { TranslationResolver } from './provider/resolver/translation.resolver';
import { AppPreloadingStrategy } from './app-routing.preload';
import { EUserRole } from './provider/enum/user-role.enum';
import { UserResolver } from './provider/resolver/profile.resolver';
import { AuthGuard } from './provider/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./core/public/public.module').then(m => m.PublicModule),
    resolve: { translations: TranslationResolver },
    runGuardsAndResolvers: 'always',
    data: { preload: true }
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule),
    resolve: { translations: TranslationResolver },
    runGuardsAndResolvers: 'always',
    data: { preload: true }
  },
  {
    path: 'credits',
    loadChildren: () => import('./core/credit/credit.module').then(m => m.CreditModule),
    canActivate: [AuthGuard],
    resolve: { translations: TranslationResolver, user: UserResolver },
    data: {
      preload: true,
      roles: [EUserRole.VALUER, EUserRole.BAILIFF, EUserRole.SUPER_ADMIN, EUserRole.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'inspections',
    loadChildren: () => import('./core/job/job.module').then(m => m.JobModule),
    canActivate: [AuthGuard],
    resolve: { translations: TranslationResolver, user: UserResolver },
    data: {
      preload: true,
      roles: [EUserRole.VALUER, EUserRole.BAILIFF, EUserRole.SUPER_ADMIN, EUserRole.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'tokens',
    loadChildren: () => import('./core/token/token.module').then(m => m.TokenModule),
    canActivate: [AuthGuard],
    resolve: { translations: TranslationResolver, user: UserResolver },
    data: {
      preload: true,
      roles: [EUserRole.VALUER, EUserRole.SUPER_ADMIN, EUserRole.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'users',
    loadChildren: () => import('./core/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
    resolve: { translations: TranslationResolver, user: UserResolver },
    data: {
      roles: [EUserRole.SUPER_ADMIN, EUserRole.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'profile',
    loadChildren: () => import('./core/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
    resolve: { translations: TranslationResolver, user: UserResolver },
    data: {
      preload: true,
      roles: [EUserRole.VALUER, EUserRole.BAILIFF, EUserRole.SUPER_ADMIN, EUserRole.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'requests',
    loadChildren: () => import('./core/request/request.module').then(m => m.RequestsModule),
    canActivate: [AuthGuard],
    resolve: { translations: TranslationResolver, user: UserResolver },
    data: {
      preload: true,
      roles: [EUserRole.VALUER, EUserRole.BAILIFF, EUserRole.SUPER_ADMIN, EUserRole.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'reports',
    loadChildren: () => import('./core/report/report.module').then(m => m.ReportModule),
    canActivate: [AuthGuard],
    resolve: { translations: TranslationResolver, user: UserResolver },
    data: {
      preload: true,
      roles: [EUserRole.VALUER, EUserRole.BAILIFF, EUserRole.SUPER_ADMIN, EUserRole.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'withdraws',
    loadChildren: () => import('./core/withdraw/withdraw.module').then(m => m.WithDrawModule),
    canActivate: [AuthGuard],
    resolve: { translations: TranslationResolver, user: UserResolver },
    data: {
      preload: true,
      roles: [EUserRole.SUPER_ADMIN, EUserRole.ADMIN]
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', preloadingStrategy: AppPreloadingStrategy })],
  exports: [RouterModule],
  providers: [AppPreloadingStrategy]
})
export class AppRoutingModule { }
