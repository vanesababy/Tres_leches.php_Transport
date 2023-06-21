import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Core/auth/login/login.component';
import { HomeModule } from './Core/home/home.module';
import { HomeComponent } from './Core/home/home.component';
import { ChargeWheelComponent } from './Modules/Components/charge-wheel/charge-wheel.component';
import { ProgramaFormativoComponent } from './Modules/Components/programa-formativo/programa-formativo.component';
import { AreasComponent } from './Modules/Pages/areas-view/areas/areas.component';
import { ProyectoFormativoComponent } from './Modules/Pages/proyecto-formativo-view/proyecto-formativo/proyecto-formativo.component';
import { PerfilComponent } from './Modules/Pages/perfil/perfil.component';
import { CompetenciasComponent } from './Modules/Pages/competencias/competencias/competencias.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./Core/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: AreasComponent
      },
      {
        path:"proyecto",
        component: ProyectoFormativoComponent
      },
      {
        path:"programa",
        component: ProgramaFormativoComponent
      },
      {
        path:"perfil",
        component: PerfilComponent
      },
      {
        path:"123123",
        component: PerfilComponent
      }
      ,
      {
        path:"competencias",
        component: CompetenciasComponent
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
