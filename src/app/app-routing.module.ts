import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'covid19', pathMatch: 'full' },
  { path: 'covid19', redirectTo: 'covid19', pathMatch: 'full' },
  {
    path:'covid19', 
    children:[
        {
            path:"",
            loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
        },{
            path: ':countrieName',
            loadChildren: () => import('./home/covid-details/covid-details.module').then( m => m.CovidDetailsPageModule)
        }
    ]
  },
  {
    path: 'autor',
    loadChildren: () => import('./autor/autor.module').then( m => m.AutorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
