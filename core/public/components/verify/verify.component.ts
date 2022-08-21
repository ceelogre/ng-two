import { DataService } from './../../../../provider/service/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EApplicationState } from './../../../../provider/enum/gender.enum';
import { ETransactionStatus } from './../../../../provider/enum/transaction.enum';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { PublicService } from './../../../../shared/core-components/provider/service/public.service';
import {IRequest} from "../../../job/providers/model/inspection.model";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  isLoading = false;
  isValid = false;
  isReport = true
  docNumber: string;

  constructor(private publicService: PublicService, private route: ActivatedRoute, private dataService: DataService) { }

  get translations() {
    return this.dataService.translations
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param?.siteVisitId) {
        this.isReport = true;
        this.verifyReport(param.siteVisitId);
        return;
      }
      if (param?.financialTransactionId) {
        this.isReport = false;
        this.docNumber = param.financialTransactionId;
        this.verifyReceipt(param.financialTransactionId)
        return;
      }
    })
  }


  // verify report
  verifyReport(id: string): void {
    this.isLoading = true;
    this.publicService.verifyReport(id).subscribe((res: IResponseObject<IRequest>) => {
      this.processResponse(res);
    })
  }

  // verify receipt
  verifyReceipt(id: string): void {
    this.isLoading = true;
    this.publicService.verifyReceipt(id).subscribe((res: IResponseObject<any>) => {
      this.processResponse(res);
    })
  }

  // process response
  processResponse(res: IResponseObject<any>): void {
    this.isLoading = false
    if (res.status) {
      if (this.isReport) {
        this.isValid = res.data?.state === EApplicationState.CLOSED;
        if(this.isValid){
          this.docNumber = res.data?.reportNumber;
        }
      } else {
        this.isValid = res.data?.transactionStatus === ETransactionStatus.SUCCESSFUL;
      }
    } else {
      this.isValid = false
    }
  }

}
