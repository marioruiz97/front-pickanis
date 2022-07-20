import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SeEncuentraEnComponent } from './components/se-encuentra-en/se-encuentra-en.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';


@NgModule({
  declarations: [SidenavComponent, ToolbarComponent, ConfirmDialogComponent, SeEncuentraEnComponent, FooterComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [SidenavComponent, ToolbarComponent, SeEncuentraEnComponent, FooterComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule { }
