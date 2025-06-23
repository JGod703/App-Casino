import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'captura-datos',
    loadChildren: () => import('./captura-datos/captura-datos.module').then( m => m.CapturaDatosPageModule)
  },
  {
    path: 'black-jack',
    loadChildren: () => import('./black-jack/black-jack.module').then( m => m.BlackJackPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'deportes',
    loadChildren: () => import('./deportes/deportes.module').then( m => m.DeportesPageModule)
  },
  {
    path: 'quienes-somos',
    loadChildren: () => import('./quienes-somos/quienes-somos.module').then( m => m.QuienesSomosPageModule)
  },
  {
    path: 'cajero',
    loadChildren: () => import('./cajero/cajero.module').then( m => m.CajeroPageModule)
  },
  {
    path: 'tragamonedas',
    loadChildren: () => import('./tragamonedas/tragamonedas.module').then( m => m.TragamonedasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'depositar',
    loadChildren: () => import('./depositar/depositar.module').then( m => m.DepositarPageModule)
  },
  {
    path: 'retirar',
    loadChildren: () => import('./retirar/retirar.module').then( m => m.RetirarPageModule)
  },
  {
    path: 'casino',
    loadChildren: () => import('./casino/casino.module').then( m => m.CasinoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'ligamx',
    loadChildren: () => import('./ligamx/ligamx.module').then( m => m.LigamxPageModule)
  },
  {
    path: 'premier',
    loadChildren: () => import('./premier/premier.module').then( m => m.PremierPageModule)
  },
  {
    path: 'serie',
    loadChildren: () => import('./serie/serie.module').then( m => m.SeriePageModule)
  },
  {
    path: 'bundesliga',
    loadChildren: () => import('./bundesliga/bundesliga.module').then( m => m.BundesligaPageModule)
  },
  {
    path: 'nba',
    loadChildren: () => import('./nba/nba.module').then( m => m.NbaPageModule)
  },
  {
    path: 'bonos',
    loadChildren: () => import('./bonos/bonos.module').then( m => m.BonosPageModule)
  },
  {
    path: 'bjinfo',
    loadChildren: () => import('./bjinfo/bjinfo.module').then( m => m.BjinfoPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },  {
    path: 'detallespago',
    loadChildren: () => import('./detallespago/detallespago.module').then( m => m.DetallespagoPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

