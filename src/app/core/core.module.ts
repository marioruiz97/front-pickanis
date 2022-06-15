import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SeEncuentraEnComponent } from './components/se-encuentra-en/se-encuentra-en.component';


@NgModule({
  declarations: [SidenavComponent, ToolbarComponent, ConfirmDialogComponent, SeEncuentraEnComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [SidenavComponent, ToolbarComponent, SeEncuentraEnComponent],
  providers: [],
})
export class CoreModule { }
