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

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ModelModule,
    CoreModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [TableComponent, FormComponent, MessageComponent]
})
export class AppModule { }
