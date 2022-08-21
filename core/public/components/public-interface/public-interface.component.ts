import { DataService } from './../../../../provider/service/data.service';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMessage } from './../../../../provider/model/message.model';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { PublicService } from './../../../../shared/core-components/provider/service/public.service';
import { IParcel } from './../../../job/providers/model/parcel.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-interface',
  templateUrl: './public-interface.component.html',
  styleUrls: ['./public-interface.component.css']
})
export class PublicInterfaceComponent implements OnInit {
  publicFormGroup: FormGroup;
  isLoading = false;
  parcel: IParcel = null
  message: IMessage
  constructor(private publicService: PublicService, private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.publicFormGroup = this.fb.group({
      phoneCtrl: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      nationalIDCtrl: [null, [Validators.required, Validators.maxLength(16)]]
    })
  }

  get puBlicControls() {
    return this.publicFormGroup.controls;
  }

  get translations() {
    return this.dataService.translations
  }

  // submit request
  submit(): void {
    this.isLoading = true;
    const phone = this.puBlicControls.phoneCtrl.value;
    const ID = this.puBlicControls.nationalIDCtrl.value;
    this.publicService.createPublicRequest(this.parcel.id, phone, ID).subscribe((res: IResponseObject<any>) => {
      this.isLoading = false;
      this.message = { error: res.status, message: res.message }
      if (res.status) {
        this.publicFormGroup.reset();
        this.isLoading = false;
      }
    })
  }

  receiveParcel(e: IParcel): void {
    this.parcel = e;
  }

}
