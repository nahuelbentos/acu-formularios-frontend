import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavCustomComponent } from './components/nav-custom/nav-custom.component';
import { GestionCustomComponent } from './components/gestion-custom/gestion-custom.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RadioBooleanCustomComponent } from './components/radio-boolean-custom/radio-boolean-custom.component';
import { RadioGroupCustomComponent } from './components/radio-group-custom/radio-group-custom.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    NavCustomComponent,
    GestionCustomComponent,
    FooterComponent,
    HeaderComponent,
    RadioBooleanCustomComponent,
    RadioGroupCustomComponent,
    SpinnerComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavCustomComponent,
    RadioBooleanCustomComponent,
    RadioGroupCustomComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,

    MaterialModule,
    FormsModule,
    BlockUIModule.forRoot({
      delayStart: 1000,
      delayStop: 1000,
      message: 'Cargando',
    }),
  ],
})
export class SharedModule {}
