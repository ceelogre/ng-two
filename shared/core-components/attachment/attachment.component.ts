import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAttachment } from './../../../core/job/providers/model/attachment.model';
import { ModalDialogService } from './../../../provider/service/modal.service';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit, OnChanges {
  attachment: IAttachment = null;
  attachmentForm: FormGroup;
  id = Math.random();
  @Input() currentAttachement: IAttachment
  @Input() name: string = null;
  @Input() validate = true;
  @Input() preview = false;
  @Input() isInvalid = false;
  @Output() attachmentEvent = new EventEmitter<IAttachment>();
  constructor(private fb: FormBuilder, private modalService: ModalDialogService) { }

  ngOnInit(): void {
    this.attachmentForm = this.fb.group({
      inputFileCtrl: [null, [Validators.required]]
    });
    this.removeValidation();
  }

  // track changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.name) {
      this.name = changes.name.currentValue;
    }
    if (changes?.currentAttachement) {
      this.currentAttachement = changes.currentAttachement.currentValue;
      this.attachment = this.currentAttachement;
    }
    if (changes?.validate) {
      this.validate = changes.validate.currentValue;
      this.removeValidation();
    }
    if (changes?.preview) {
      this.preview = changes.preview.currentValue;
    }
    if (changes?.isInvalid) {
      this.isInvalid = changes.isInvalid.currentValue;
    }
  }

  // remove validations
  removeValidation(): void {
    if (!this.validate) {
      this.attachmentForm.controls.inputFileCtrl.setValidators(null);
    }
  }

  onClick(e: any): void {
    if (this.preview) {
      if (this.currentAttachement) {
        this.modalService.openImagePreview(this.currentAttachement);
      }
      return;
    }
    e.click();
  }

  // handle file input
  handleFileInput(files: FileList): void {
    if (this.preview) {
      return;
    }
    const file = files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = () => {
        this.attachment = {
          extension: file.type.split("/")[1],
          fileName: this.name,
          filenameWithExtension: file.name,
          base64StringAttachment: btoa(fileReader.result.toString()),
        };
        this.attachmentEvent.emit(this.attachment);
      }
    }
  }

}
