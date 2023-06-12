import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CartComponent } from './cart/cart.component';
import { ShippingAddressComponent } from './cart/shipping-address/shipping-address.component';
import { CartItemsComponent } from './cart/cart-items/cart-items.component';
import { MainPageModule } from './mainPage/main-page.module';
import { FBaseService } from './services/fbase.service';
import { LocalDataService } from './services/localData.service';
import { AdminMainModule } from './admin-main/admin-main.module';
@NgModule({
  declarations: [AppComponent, NavigationComponent, CartComponent, ShippingAddressComponent, CartItemsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MainPageModule,
    AdminMainModule,
  ],
  providers: [{ provide: FBaseService, useClass: environment.production ? FBaseService : LocalDataService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
