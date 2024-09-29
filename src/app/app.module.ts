import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ReceptionistComponent } from './Components/receptionist/receptionist.component';
import { ManagerComponent } from './Components/manager/manager.component';
import { OwnerComponent } from './Components/owner/owner.component';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
import { ForbiddenComponent } from './Components/forbidden/forbidden.component';
import { HomeComponent } from './Components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_Auth/auth.guard';
import { AuthInterceptor } from './_Auth/auth.interceptor';
import { UserService } from './_Services/user.service';
import { RegisterComponent } from './Components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
 import { MatSelectModule } from '@angular/material/select'; 
 import { MatButtonModule } from '@angular/material/button';
 import { MatCardModule } from '@angular/material/card';
import { GuestComponent } from './Components/guest/guest.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { RoomComponent } from './Components/room/room.component';
import { StaffComponent } from './Components/staff/staff.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SuccessComponent } from './Components/success/success.component';
import { MatMenuModule } from '@angular/material/menu';
import { Guest2Component } from './Components/guest2/guest2.component';
import { Room2Component } from './Components/room2/room2.component';
import { Reservation2Component } from './Components/reservation2/reservation2.component';
import { Inventory2Component } from './Components/inventory2/inventory2.component';
import { Staff2Component } from './Components/staff2/staff2.component';
import { BookingComponent } from './Components/booking/booking.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderByPipe } from './Pipes/order-by.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReceptionistComponent,
    ManagerComponent,
    OwnerComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    RegisterComponent,
    GuestComponent,
    InventoryComponent,
    AboutusComponent,
    ContactusComponent,
    RoomComponent,
    StaffComponent,
    ReservationComponent,
    PaymentComponent,
    FooterComponent,
    SuccessComponent,
   
    Guest2Component,
        Room2Component,
        Reservation2Component,
        Inventory2Component,
        Staff2Component,
        BookingComponent,
        NotfoundComponent,
        OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
