import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EApplicationState, EfilterType } from 'src/app/provider/enum';
import { IParcel, IParcelDto } from '../../../core/job/providers/model/parcel.model';
import { IValuation } from "../../../core/job/providers/model/valuation.model";
import { StateService } from "../../../provider/service/state.service";
import { ValidationService } from '../../../provider/service/validation.service';
import { IResponseObject } from './../../../provider/model/response-object.model';
import { ICordinates } from './../../../provider/model/user.model';
import { DataService } from './../../../provider/service/data.service';
import { PublicService } from './../provider/service/public.service';

@Component({
  selector: 'irpv-parcel-fetch',
  templateUrl: './irpv-parcel-fetch.component.html',
  styleUrls: ['./irpv-parcel-fetch.component.css']
})
export class ParcelFetchComponent implements OnInit, OnChanges {
  @Output() parcelEvent = new EventEmitter<IParcel>();
  @Output() geoDataEvent = new EventEmitter<ICordinates>();
  @Input() currentParcel: IParcel = null;
  @Input() isFull = false
  @Input() preview = false;
  @Input() minimalInfo = false;
  @Input() hasCoordinates = false;
  @Input() currentGeoData: ICordinates = null;
  @Input() inspectionLoading = false;
  @Input() forceEdit = false;
  parceForm: FormGroup;
  coordinateForm: FormGroup;
  parcel: IParcel = null;
  isLoading = false;
  fetchFailed = false;
  valuationDataList: IValuation[];

  constructor(
    private fb: FormBuilder,
    private validation: ValidationService,
    private stateService: StateService,
    private validationService: ValidationService,
    private dataService: DataService,
    private publicService: PublicService) {
    this.initParcelForm();
  }

  ngOnInit(): void {
    this.listenOnValidationEvent();
    if (this.currentGeoData) {
      this.setCoordinates();
    }
  }

  get EFilterType() {
    return EfilterType
  }

  get authUser() {
    return this.stateService.authUser.data
  }

  get translations() {
    return this.dataService.translations
  }

  get selectedSiteVisit() {
    return this.stateService?.selectedInspection?.data?.state;
  }

  get coordinateControls() {
    return this.coordinateForm?.controls;
  }

  get coordinatesValid() {
    return !this.forceEdit && (this.preview && this.currentGeoData?.xCoordinate && this.currentGeoData?.yCoordinate)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.currentParcel) {
      this.parcel = changes.currentParcel.currentValue;
      this.setInputData();
    }
    if (changes?.preview) {
      this.preview = changes.preview.currentValue;
      this.toggleUpiInput();
      this.toggleCoordinateInputs();
    }
    if (changes?.currentGeoData) {
      this.currentGeoData = changes.currentGeoData.currentValue;
      this.setCoordinates();
    }
    if (changes?.hasCoordinates) {
      this.hasCoordinates = changes.hasCoordinates.currentValue;
      this.initCoordinateForm();
    }
    if (changes?.inspectionLoading) {
      this.inspectionLoading = changes.inspectionLoading.currentValue;
    }
    if (changes?.forceEdit) {
      this.forceEdit = changes.forceEdit.currentValue;
      this.toggleCoordinateInputs();
    }
  }

  get isBailiff() {
    return this.stateService.isBailiff;
  }

  // init parcel form group
  initParcelForm(): void {
    this.parceForm = this.fb.group({
      parcelCtrl: new FormControl(null, [Validators.required, this.validation.UPI])
    });
  }

  // init coordinates form group
  initCoordinateForm(): void {
    this.coordinateForm = this.fb.group({
      longitudeCtrl: [null, [Validators.required, this.validation.isLongitude]],
      latitudeCtrl: [null, [Validators.required, this.validation.isLatitude]]
    });
    this.toggleCoordinateInputs();
  }

  // fetch parcel data
  getParcel(): void {
    this.isLoading = true;
    this.fetchFailed = false;
    const upi = this.parceForm.controls.parcelCtrl.value;
    this.publicService.getParcel(upi).subscribe((resp: IResponseObject<IParcelDto>) => {
      this.isLoading = false;
      if (resp.status) {
        const { data } = resp;
        this.parcel = data.parcel;
        const { valuationData } = data;
        this.valuationDataList = valuationData;
        this.emitParcel(data.parcel);
      } else {
        this.parcel = null;
        this.fetchFailed = true;
      }
    });
  }

  // emit parcel data
  emitParcel(parcel: IParcel): void {
    this.parcelEvent.emit(parcel);
  }

  // disable enable parcel input
  toggleUpiInput(): void {
    if (this.preview) {
      this.parceForm.controls?.parcelCtrl.disable();
    } else {
      this.parceForm.controls?.parcelCtrl.enable();
    }
  }

  // toggle coordinate inputs
  toggleCoordinateInputs(): void {
    if (this.coordinatesValid) {
      this.coordinateForm?.controls?.longitudeCtrl.disable();
      this.coordinateForm?.controls?.latitudeCtrl.disable();
    } else {
      this.coordinateForm?.controls?.longitudeCtrl.enable();
      this.coordinateForm?.controls?.latitudeCtrl.enable();
    }
  }

  // set input data
  setInputData(): void {
    if (this.currentParcel) {
      this.parceForm.controls?.parcelCtrl.setValue(this.currentParcel.upi);
    }
  }

  // listen on form validation notification
  listenOnValidationEvent(): void {
    this.validationService.notifyRunValidation.subscribe((val) => {
      this.parceForm.controls.parcelCtrl.markAsDirty();
      if (this.hasCoordinates) {
        this.coordinateForm?.controls?.longitudeCtrl.markAsDirty();
        this.coordinateForm?.controls?.latitudeCtrl.markAsDirty();
      }
    });
  }


  // emit coordinates
  emitCoordinates(): void {
    if (this.coordinateForm?.valid) {
      this.geoDataEvent.emit({
        xCoordinate: this.coordinateControls.longitudeCtrl.value,
        yCoordinate: this.coordinateControls.latitudeCtrl.value
      });
    }
  }

  // set coordinates
  setCoordinates(): void {
    if (this.currentGeoData) {
      this.coordinateForm?.controls?.longitudeCtrl.setValue(this.currentGeoData.xCoordinate);
      this.coordinateForm?.controls?.latitudeCtrl.setValue(this.currentGeoData.yCoordinate);
    }
  }

}
