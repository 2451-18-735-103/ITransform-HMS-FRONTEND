import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { BookingComponent } from './Components/booking/booking.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { ForbiddenComponent } from './Components/forbidden/forbidden.component';
import { GuestComponent } from './Components/guest/guest.component';
import { Guest2Component } from './Components/guest2/guest2.component';
import { HomeComponent } from './Components/home/home.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { Inventory2Component } from './Components/inventory2/inventory2.component';
import { LoginComponent } from './Components/login/login.component';
import { ManagerComponent } from './Components/manager/manager.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { OwnerComponent } from './Components/owner/owner.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ReceptionistComponent } from './Components/receptionist/receptionist.component';
import { RegisterComponent } from './Components/register/register.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { Reservation2Component } from './Components/reservation2/reservation2.component';
import { RoomComponent } from './Components/room/room.component';
import { Room2Component } from './Components/room2/room2.component';
import { StaffComponent } from './Components/staff/staff.component';
import { Staff2Component } from './Components/staff2/staff2.component';
import { SuccessComponent } from './Components/success/success.component';

import { AuthGuard } from './_Auth/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'manager', component: ManagerComponent, canActivate:[AuthGuard],data:{roles:['ROLE_MANAGER']} },
  { path: 'receptionist', component: ReceptionistComponent,canActivate:[AuthGuard],data:{roles:['ROLE_RECEPTIONIST']} },
  { path: 'owner', component: OwnerComponent ,canActivate:[AuthGuard],data:{roles:['ROLE_OWNER']}},
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {path:'register',component:RegisterComponent},
  {path:'guest',component:GuestComponent,canActivate:[AuthGuard],data:{roles:['ROLE_RECEPTIONIST']}},
 {path:'inventory',component:InventoryComponent, canActivate:[AuthGuard],data:{roles:['ROLE_MANAGER']}},
  { path: '', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  {path:'room',component:RoomComponent,canActivate:[AuthGuard],data:{roles:['ROLE_RECEPTIONIST','ROLE_MANAGER']}},
  {path:'staff',component:StaffComponent, canActivate:[AuthGuard],data:{roles:['ROLE_MANAGER']}},
  {path:'reservation',component:ReservationComponent,canActivate:[AuthGuard],data:{roles:['ROLE_RECEPTIONIST']}},
  {path:'payment/:totalPrice',component:PaymentComponent,canActivate:[AuthGuard],data:{roles:['ROLE_RECEPTIONIST']}},
  {path:'guest2',component:Guest2Component,canActivate:[AuthGuard],data:{roles:['ROLE_OWNER']}},
  {path:'room2',component:Room2Component,canActivate:[AuthGuard],data:{roles:['ROLE_OWNER']}},
  {path:'reservation2',component:Reservation2Component,canActivate:[AuthGuard],data:{roles:['ROLE_OWNER']}},
  {path:'inventory2',component:Inventory2Component,canActivate:[AuthGuard],data:{roles:['ROLE_OWNER']}},
  {path:'staff2',component:Staff2Component,canActivate:[AuthGuard],data:{roles:['ROLE_OWNER']}},
  {path:'success',component:SuccessComponent},
  {path:'booking',component:BookingComponent,canActivate:[AuthGuard],data:{roles:['ROLE_RECEPTIONIST']}},
  { path: '**', component: NotfoundComponent }
  
  
  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
