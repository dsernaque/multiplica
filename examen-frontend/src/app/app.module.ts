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
import { InputTextModule} from 'primeng/inputtext';
import { CursosComponent } from './cursos/cursos.component';
import { HttpClientModule } from '@angular/common/http';

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
    InputTextModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
