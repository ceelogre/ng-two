import { IResponseObject } from './../../../../provider/model/response-object.model';
import { IMessage } from './../../../../provider/model/message.model';
import { DataService } from './../../../../provider/service/data.service';
import { FormBuilder } from '@angular/forms';
import { PublicService } from './../../../../shared/core-components/provider/service/public.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-report',
  templateUrl: './verify-report.component.html',
  styleUrls: ['./verify-report.component.css']
})
export class VerifyReportComponent implements OnInit {
  isLoading = false;
  message: IMessage;
  reportNumber = null;
  repordDoc = null;

  constructor(private publicService: PublicService, private fb: FormBuilder, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations
  }

  ngOnInit(): void {
  }

  getReportDocument(): void {
    this.isLoading = true;
    this.publicService.verifyReportGenerate(this.reportNumber).subscribe((res: IResponseObject<any>) => {
      this.isLoading = false;
      if (res.status) {
        const binaryString = window.atob(res.data);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          const ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        this.repordDoc = this.getPdfFile(bytes);

      } else {
        this.message = { error: !res.status, message: res.message }
      }
    })
  }

  getPdfFile(byte: any): string {
    const blob = new Blob([byte], { type: 'application/pdf' });
    return window.URL.createObjectURL(blob);
  }


}
