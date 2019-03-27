import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { DialogModule} from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { CoreModule } from './core/core.module';
import { InputTextModule} from 'primeng/inputtext';
import { CursosComponent } from './cursos/cursos.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './core/components/notification/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    CursosComponent
  ],
  imports: [
    BrowserModule,  
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    DialogModule,
    EditorModule,
    CoreModule,
    InputTextModule,
    HttpClientModule
  ],
  providers: [NotificationService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
