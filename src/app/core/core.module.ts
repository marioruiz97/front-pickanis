import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [SidenavComponent, ToolbarComponent, ConfirmDialogComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [SidenavComponent, ToolbarComponent],
  providers: [],
})
export class CoreModule { }
