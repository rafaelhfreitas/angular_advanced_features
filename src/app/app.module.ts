import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// MODULES
import { ModelModule } from './model/model.module';
import { MessageModule } from './messages/message.module';
import { CoreModule } from './core/core.module';

// COMPONENTS
import { MessageComponent } from './messages/message.component';
import { TableComponent } from './core/table.component';
import { FormComponent } from './core/form.component';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { TermsGuard } from './terms.guard';
import { LoadGuard } from './load.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ModelModule,
    CoreModule,
    MessageModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [TermsGuard, LoadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
