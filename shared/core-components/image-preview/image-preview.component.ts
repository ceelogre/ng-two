import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAttachment } from './../../../core/job/providers/model/attachment.model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {
  image: IAttachment = null
  todayDate: Date = new Date(new Date().toLocaleDateString());

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImagePreviewComponent>) {
    this.image = data;
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
