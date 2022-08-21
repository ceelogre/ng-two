import { ImagePreviewComponent } from './../../shared/core-components/image-preview/image-preview.component';
import { IAttachment } from './../../core/job/providers/model/attachment.model';
import { DatePopupComponent } from './../../shared/core-components/date-popup/date-popup.component';
import { ModalComponent } from '../../shared/core-components/modal/modal.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {

  dialogRef: any = {};
  isOpen = false;

  constructor(private dialog: MatDialog) {
  }

  // message dialog
  openMessageDialog(message: string): void {
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '20%',
      data: {
        message
      },
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(() => { });
  }

  // open date filter dialog
  openDateDialog(startDate: string, endDate: string): void {
    this.dialogRef = this.dialog.open(DatePopupComponent, {
      width: '25%',
      data: {
        endDate,
        startDate
      }
    });
    this.dialogRef.afterClosed().subscribe({});
  }

  // image preview
  openImagePreview(image: IAttachment): void {
    this.dialogRef = this.dialog.open(ImagePreviewComponent, {
      width: '50%',
      data: image
    });
    this.dialogRef.afterClosed().subscribe({});
  }

}
