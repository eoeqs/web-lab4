import {RouterModule, Routes} from "@angular/router";
import {DataComponent} from "./components/data/data.component";
import {MainComponent} from "./components/main/main.component";
import {NgModule} from "@angular/core";
import {AuthenticationGuard} from "./authentication.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard], children: [
      {
        path: '',
        component: DataComponent
      },
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
