import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './_guards/auth.guard';
import { OrderTicketsComponent } from './components/order-tickets/order-tickets.component';
import { TicketsListComponent } from './components/tickets-list/tickets-list.component';
import { TrainSelectComponent } from './components/train-select/train-select.component';
import {AdminComponent} from "./components/admin/admin.component";

// нашалтування маршрутизації
export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'train-select', component: TrainSelectComponent },
            { path: 'admin', component: AdminComponent },
            { path: 'order-tickets/:train', component: OrderTicketsComponent },
            { path: 'tickets-list', component: TicketsListComponent }
        ]
    },
    { path: '**', component: HomeComponent, pathMatch: 'full' }

];
