import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalDialogService } from './../../provider/service/modal.service';
import { DashboardComponetsModule } from './../dashboard-components/dashboard-components.module';
import { AttachmentComponent } from './attachment/attachment.component';
import { DatePopupComponent } from './date-popup/date-popup.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IconsModule } from './icon/icon/icon.module';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { IrpvButtonComponent } from './irpv-button/irpv-button.component';
import { IrpvDateFilterComponent } from './irpv-date-filter/irpv-date-filter.component';
import { IrpvNotfoundComponent } from './irpv-notfound/irpv-notfound.component';
import { IrpvPaginatorComponent } from './irpv-paginator/irpv-paginator.component';
import { ParcelFetchComponent } from './irpv-parcel-fetch/irpv-parcel-fetch.component';
import { IrpvSearchComponent } from './irpv-search/irpv-search.component';
import { IrpvSelectComponent } from './irpv-select/irpv-select.component';
import { IrpvSpinnerComponent } from './irpv-spinner/irpv-spinner.component';
import { IrpvStatusDisplayComponent } from './irpv-status-display/irpv-status-display.component';
import { IrpvTableComponent } from './irpv-table/irpv-table.component';
import { LayoutComponent } from './layout/layout.component';
import { MapComponent } from './map/map.component';
import { MessageComponent } from './message/message.component';
import { ModalComponent } from './modal/modal.component';
import { InputValidation } from './provider/directive/input-validation.directive';
import { NumberOnlyDirective } from './provider/directive/number-only.directive';
import { StatusDirective } from './provider/directive/status.directive';
import { TextOnlyDirective } from './provider/directive/text-only.directive';
import { RolePipe } from './provider/pipe/role.pipe';
import { StatusPipe } from './provider/pipe/status.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';

// Declared and exportable @angular/material modules
const materialModules = [
  MatNativeDateModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSidenavModule
];

// pipes
const pipes = [
  StatusPipe,
  RolePipe
]

// directives
const directives = [
  StatusDirective,
  InputValidation,
  NumberOnlyDirective,
  TextOnlyDirective
]

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ModalComponent,
    MessageComponent,
    IrpvButtonComponent,
    IrpvDateFilterComponent,
    IrpvPaginatorComponent,
    IrpvSearchComponent,
    IrpvStatusDisplayComponent,
    IrpvSpinnerComponent,
    IrpvSelectComponent,
    IrpvTableComponent,
    pipes,
    directives,
    ValidationMessageComponent,
    IrpvNotfoundComponent,
    ParcelFetchComponent,
    MapComponent,
    AttachmentComponent,
    DatePopupComponent,
    ImagePreviewComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule,
    materialModules,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponetsModule,
    GoogleMapsModule,
    NgSelectModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MessageComponent,
    ModalComponent,
    IrpvButtonComponent,
    IrpvDateFilterComponent,
    IrpvPaginatorComponent,
    IrpvSearchComponent,
    IrpvStatusDisplayComponent,
    IrpvSpinnerComponent,
    IrpvSelectComponent,
    IrpvTableComponent,
    IconsModule,
    materialModules,
    DashboardComponetsModule,
    pipes,
    directives,
    ValidationMessageComponent,
    IrpvNotfoundComponent,
    ParcelFetchComponent,
    MapComponent,
    AttachmentComponent,
    DatePopupComponent
  ],
  providers: [ModalDialogService, DecimalPipe]
})
export class CoreComponentsModule { }
