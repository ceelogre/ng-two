import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EStatePartial } from 'src/app/provider/enum/state-partial.enum';
import { DataService } from "../../../../provider/service/data.service";
import { EValuationMethod } from '../../providers/enum/valuation-method.enum';
import { EfilterType } from './../../../../provider/enum/filter-type.enum';
import { EApplicationState } from './../../../../provider/enum/gender.enum';
import { IResponseObject } from './../../../../provider/model/response-object.model';
import { IGenValue, IGenValueData } from './../../../../provider/model/status.model';
import { ICordinates, IInspectionDto, IUpdateInspectionDto, IUser } from './../../../../provider/model/user.model';
import { StateService } from './../../../../provider/service/state.service';
import { ValidationService } from './../../../../provider/service/validation.service';
import { paginateSearch } from './../../../../provider/util/paginate.util';
import { EBuildingService } from './../../providers/enum/building-service.enum';
import { EBuildingCat, EBuildingType, ELandType, EResidenceCategory } from './../../providers/enum/building-types.enum';
import { EConstructionProp } from './../../providers/enum/construction-property.enum';
import { EPropertyAccess } from './../../providers/enum/property-access.enum';
import { EPropertyType } from './../../providers/enum/property-type.enum';
import { EValuationProperty } from './../../providers/enum/valuation-property.enum';
import { EValuationType } from './../../providers/enum/valuation-type.enum';
import { IAttachment } from './../../providers/model/attachment.model';
import { IDraft } from './../../providers/model/draft.model';
import { IInspection, IRequest } from './../../providers/model/inspection.model';
import { IParcel } from './../../providers/model/parcel.model';
import { IValuation } from './../../providers/model/valuation.model';
import { DraftService } from './../../providers/service/draft.service';
import { InspectionService } from './../../providers/service/job.service';
import { ValuationDataService } from './../../providers/service/valuation-data.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit, OnDestroy {
  parcel: IParcel = null;
  valuationFormGroup: FormGroup;
  valuationData = new Map<EValuationProperty, any>();
  residencecategories: IGenValue<EResidenceCategory>[];
  valuationProperties: IGenValueData<EValuationProperty, boolean>[];
  otherAttachments: IAttachment[] = [];
  otherAttachmentsArr = [];
  insectionId: string = null;
  draftLoading = false;
  pageLoading = false;
  valuationLoading = false;
  preview = false;
  showValuationForm = true;
  draft: IDraft = null;
  message: string;
  hasError = false;
  draftOb$: Subscription = null;
  subject = new Subject();
  certifyChecked = false;
  currentSiteVisit: IRequest = null;
  notFound = false;
  autoSave = true;
  todayDate = new Date();
  geolocation: ICordinates;
  editable = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public valuationDataService: ValuationDataService,
    private ValidationService: ValidationService,
    private inspectionService: InspectionService,
    private stateService: StateService,
    private dataService: DataService,
    private draftService: DraftService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.initValuationForm();
    this.activatedRoute.params.subscribe((params) => {
      const ID = params['id'];
      if (ID) {
        this.insectionId = ID;
        this.fetchSiteVisiById(ID);
      }
    });
    this.triggerDraftUpdate();
    this.initOtherAttachments();
  }

  ngOnDestroy(): void {
    this.draft = null;
    this.valuationData = null;
    this.autoSave = false;
    this.preview = false;
    if (this.draftOb$) {
      this.draftOb$.unsubscribe();
    }
    this.setInspectionData(null);
  }


  get valuationCtrls() {
    return this.valuationFormGroup.controls;
  }

  get EPropertyType() {
    return EPropertyType;
  }

  get valuationPropertiesValid(): boolean {
    return Object.keys(this.valuationData)?.filter(d => this.valuationData[d] === null)?.length === 0;
  }

  get applicationIsValid(): boolean {
    return this.valuationFormGroup?.valid && this.valuationPropertiesValid && !!this.parcel;
  }

  get selectedInspection(): any {
    return this.stateService.selectedInspection.data;
  }

  get inspectionLoading(): boolean {
    return this.stateService.selectedInspection.isLoading;
  }

  get authUser(): IUser {
    return this.stateService.authUser.data;
  }

  get EfilterType() {
    return EfilterType;
  }

  get EApplicationState() {
    return EApplicationState;
  }

  get applicationState() {
    return this.siteVisitId ? this.currentSiteVisit?.state : EApplicationState.NEW;
  }

  get isClosed() {
    return this.applicationState === EApplicationState.CLOSED;
  }

  get isPending() {
    return this.applicationState === EApplicationState.PENDING;
  }

  get isNew() {
    return this.applicationState === EApplicationState.NEW;
  }

  get siteVisitId() {
    return this.insectionId ?? this.selectedInspection?.id;
  }

  get showDetails(): boolean {
    return this.valuationCtrls?.propertyTypeCtrl?.value && (this.valuationCtrls?.propertyTypeCtrl?.value !== EPropertyType.MINING_AND_QUARRIES &&
      this.valuationCtrls?.propertyTypeCtrl?.value !== EPropertyType.OTHER_INFRASTRUCTURES);
  }

  get notLocked(): boolean {
    return this.isClosed && !this.currentSiteVisit?.locked
  }

  get isAdmin() {
    return this.stateService.isAdmin;
  }

  get showPreview(): boolean {
    return (this.preview && !this.editable) || this.isAdmin
  }

  get translations() {
    return this.dataService.translations
  }

  initValuationForm(): void {
    this.valuationFormGroup = this.fb.group({
      // valuation category fields
      valuationTypeCtrl: [null, [Validators.required]],
      propertyTypeCtrl: [null, [Validators.required]],
      valuationMethodCtrl: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      propertyAccessCtrl: [null, [Validators.required]],
      clientsNamesCtrl: [null, [Validators.required]],
      inspectionDateCtrl: [null, [Validators.required]],

      // valuation values
      openMarketValueCtrl: [null, [Validators.required]],
      insuranceValueCtrl: [null, [Validators.required]],
      forcedSaleValueCtrl: [null, [Validators.required]],

      // Building details
      buildingTypeCtrl: [null, [Validators.required]],
      residenceCategoryCtrl: [null],
      constructionPropertyCtrl: [null, [Validators.required, Validators.minLength(1)]],
      buildingServiceCtrl: [null],
      buildingUtilityCtrl: [null],
      landValueCtrl: [null, [Validators.required]],

      observationCtrl: [null],
      frontViewCtrl: [null, [Validators.required]],
      realViewCtrl: [null, [Validators.required]]
    });
  }

  // receive parcel
  receiveParcel(event: IParcel): void {
    this.parcel = event;
    this.valuationCtrls.clientsNamesCtrl.setValue(event?.ownerName);
    this.updateInspection();
  }

  // update inspection
  updateInspection(): void {
    if (this.geolocation && this.siteVisitId) {
      const mutation = EStatePartial.SELECTED_INSPECTION;
      this.stateService.setState(mutation);
      const { xCoordinate, yCoordinate } = this.geolocation;
      let inspection: IUpdateInspectionDto = {
        parcelId: this.parcel.id,
        siteVisitId: this.siteVisitId,
        xCoordinate,
        yCoordinate
      }
      this.inspectionService.update(inspection).subscribe((response: IResponseObject<IInspection>) => {
        this.inspectionResponse(response, true);
      });
    }
  }

  // receive coordinates
  receiveCoordinates(event: ICordinates): void {
    this.geolocation = event;
    if (!this.siteVisitId) {
      this.createInspection(false, event);
    } else {
      this.updateInspection();
    }
  }

  // on valuation type selected
  onValuationTypeSelected(e: EValuationType): void {
    this.valuationCtrls.valuationTypeCtrl.setValue(e);
  }

  // on property type selected
  onPropertyTypeSelected(e: EPropertyType): void {
    this.valuationCtrls.propertyTypeCtrl.setValue(e);
    this.resetValuationProperties();
    this.resetResidenceCategories();
    if (this.valuationCtrls?.propertyTypeCtrl?.value === EPropertyType.LAND) {
      this.removeBuildingCtrls();
    } else {
      this.addBuildingCtrls();
    }

    if (!this.showDetails) {
      this.removeBuildingCtrls();
      this.valuationCtrls.buildingTypeCtrl.setValidators(null);
      this.valuationCtrls.buildingTypeCtrl.updateValueAndValidity();
      this.validateObservation();
    } else {
      this.valuationCtrls.buildingTypeCtrl.setValidators(Validators.required);
      this.valuationCtrls.buildingTypeCtrl.updateValueAndValidity();
    }

  }

  // remove buildingControls
  removeBuildingCtrls(): void {
    this.removeField('residenceCategoryCtrl');
    this.removeField('constructionPropertyCtrl');
    this.removeField('buildingServiceCtrl');
    this.removeField('buildingUtilityCtrl');
    this.removeField('landValueCtrl');
  }

  // add buildingControls
  addBuildingCtrls(): void {
    this.addField('residenceCategoryCtrl', null);
    this.addField('constructionPropertyCtrl');
    this.addField('buildingServiceCtrl', null);
    this.addField('buildingUtilityCtrl', null);
    this.addField('landValueCtrl');
  }

  // on valuationMethod
  onValuationMethodSelected(e: EValuationMethod): void {
    this.valuationCtrls.valuationMethodCtrl.setValue(e);
  }

  // on property access
  onPropertyAccessSelected(e: EPropertyAccess): void {
    this.valuationCtrls.propertyAccessCtrl.setValue(e);
  }

  // on construction
  onConstructionSelected(e: EConstructionProp): void {
    this.valuationCtrls.constructionPropertyCtrl.setValue(e);
  }

  // on building services selcted
  onServiceSelected(e: EBuildingService): void {
    this.valuationCtrls.buildingServiceCtrl.setValue(e);
  }

  // on building utilities
  onUtilitySelected(e: EBuildingService): void {
    this.valuationCtrls.buildingUtilityCtrl.setValue(e);
  }

  // on building type selected
  onBuildingTypeSelected(e: EBuildingType): void {
    this.resetResidenceCategories();
    this.resetValuationProperties();
    this.valuationCtrls.buildingTypeCtrl.setValue(e);
    const cats = this.valuationDataService.buildingTypes.find(({ value }) => value === e)?.type;
    this.residencecategories = this.valuationDataService.initSubCategoryMultiple(cats);
    if (this.residencecategories?.length === 0) {
      this.getPropertiesByType(e);
    }
  }

  onLandTypeSelected(e: ELandType): void {
    this.valuationCtrls.buildingTypeCtrl.setValue(e);
    this.resetValuationProperties();
    this.getPropertiesByType(e);
  }

  // residence category selected
  onResidenceCategorySelected(e: EResidenceCategory): void {
    this.valuationCtrls.residenceCategoryCtrl.setValue(e);
    this.resetValuationProperties();
    this.getPropertiesByType(e);
  }

  // receive dynamic building details
  receiveBuildingProp(data: any): void {
    const { type, value } = data;
    this.valuationData[type] = value;

  }


  // get properties by building categories
  getPropertiesByType(e: EResidenceCategory | EBuildingType | ELandType): void {
    let filter = [];
    switch (e) {
      case EResidenceCategory.APARTMENT:
      case EResidenceCategory.SINGLE_FAMILY_HOUSE:
        filter = this.valuationDataService.apartmentHouse();
        break;
      case EResidenceCategory.DUPLEX:
        filter = this.valuationDataService.duplex();
        break;
      case EResidenceCategory.OFFICES:
        filter = this.valuationDataService.offices();
        break;
      case EResidenceCategory.MALLS:
        filter = this.valuationDataService.malls();
        break;
      case EResidenceCategory.RETAIL_SHOPS_KIOSK:
        filter = this.valuationDataService.retail();
        break;
      case EResidenceCategory.HOTEL:
        filter = this.valuationDataService.hotel();
        break;
      case EResidenceCategory.WAREHOUSES:
        filter = this.valuationDataService.warehouse();
        break;
      case EResidenceCategory.GAS_PETROL_STATION:
        filter = this.valuationDataService.gas();
        break;
      case EResidenceCategory.STADIUMS:
        filter = this.valuationDataService.stadium();
        break;
      case EResidenceCategory.AIRPORT:
        filter = this.valuationDataService.airport();
        break;
      case EBuildingType.INDUSTRIAL:
        filter = this.valuationDataService.industrial();
        break;
      case EBuildingType.RECREATIONAL_FACILITIES:
        filter = this.valuationDataService.recreational();
        break;
      case ELandType.VACANT_LAND:
        filter = this.valuationDataService.vacant();
        break;
      case ELandType.LAND_IMPROVEMENT:
        filter = this.valuationDataService.improved();
        break;
      case ELandType.FOREST:
        filter = this.valuationDataService.forest();
        break;
      case ELandType.CULTIVABLE_LAND:
        filter = this.valuationDataService.cultivable();
        break;
      default:
        this.resetValuationProperties();
        break;
    }
    this.valuationProperties = this.valuationDataService.initPropertiesMultiple(filter);
    this.validateObservation(this.valuationProperties?.length === 0);
  }

  // reset valuation properties
  resetValuationProperties(): void {
    this.initValuationData();
    this.valuationProperties = undefined;
  }

  // reset categories
  resetResidenceCategories(): void {
    this.initValuationData();
    this.residencecategories = undefined;
  }

  // init valuation data
  initValuationData(): void {
    this.valuationData = new Map<EValuationProperty, any>();
  }

  // set selected site visit state
  setInspectionData(data: IInspection): void {
    const mutation = EStatePartial.SELECTED_INSPECTION;
    this.stateService.setState(mutation, { isLoading: false, data });
  }


  inspectionResponse(res: IResponseObject<IInspection>, createDraft = false): void {
    this.showValuationForm = res.status;
    this.draftLoading = false;
    this.valuationLoading = false;
    if (res.status) {
      this.dataService.changeMessage(EStatePartial.SELECTED_INSPECTION.toString());
      const { data } = res;
      const { xCoordinate, yCoordinate } = data;
      this.geolocation = {
        xCoordinate,
        yCoordinate
      }
      this.setInspectionData(data);
      this.dispatchAction(createDraft);
    } else {
      this.message = res.message;
      this.hasError = !res.status;
      this.setInspectionData(null);
    }
  }

  //  create submit or draft
  createInspection(createDraft = false, geolocation: ICordinates): void {
    if (this.parcel?.id && !this.siteVisitId && geolocation?.xCoordinate && geolocation?.yCoordinate) {
      const mutation = EStatePartial.SELECTED_INSPECTION;
      this.stateService.setState(mutation);
      if (!createDraft) {
        this.valuationLoading = true;
      }
      this.draftLoading = createDraft;
      const { xCoordinate, yCoordinate } = geolocation;
      let inspectionDto: IInspectionDto = {
        parcelId: this.parcel?.id,
        userId: this.authUser?.id,
        xCoordinate,
        yCoordinate
      };

      this.inspectionService.create(inspectionDto).subscribe((res: IResponseObject<IInspection>) => {
        this.inspectionResponse(res, createDraft);
      });
    } else {
      this.dispatchAction(createDraft);
    }
  }

  // dispatch action [submit/draft]
  dispatchAction(draft: boolean): void {
    if (draft) {
      this.saveDraft();
    } else {
      this.saveDraft(false);
    }
  }

  // submit valuation
  submitValuation(draft: IDraft = this.draft): void {
    if (this.applicationIsValid) {
      this.valuationLoading = true;
      const building_land = this.valuationCtrls.buildingTypeCtrl?.value ?? null;

      // add building details
      if (this.valuationCtrls?.propertyTypeCtrl?.value === EPropertyType.BUILDING) {
        this.receiveBuildingProp({
          type: EPropertyType.BUILDING.toLocaleLowerCase(),
          value: building_land
        });
        if (this.residencecategories?.length > 0) {
          const cat = this.valuationCtrls.residenceCategoryCtrl?.value ?? null;
          this.receiveBuildingProp({
            type: EBuildingCat.BUILDING_CATEGORY,
            value: cat
          });
        }

        // construct construction wall props
        this.valuationDataService.constructionProperties.forEach(({ value }) => {
          if (!value) return;
          this.receiveBuildingProp({
            type: value.toLocaleLowerCase(),
            value: this.propFilter('constructionPropertyCtrl', value)
          });
        });

        //  construct building services props
        this.valuationDataService.buildingServices.forEach(({ value }) => {
          if (!value) return;
          this.receiveBuildingProp({
            type: value.toLocaleLowerCase(),
            value: this.propFilter('buildingServiceCtrl', value)
          });
        });

        //  construct building services props
        this.valuationDataService.buildingUtilities.forEach(({ value }) => {
          if (!value) return;
          this.receiveBuildingProp({
            type: value.toLocaleLowerCase(),
            value: this.propFilter('buildingUtilityCtrl', value)
          });
        });

      }
      // add land details
      if (this.valuationCtrls?.propertyTypeCtrl?.value === EPropertyType.LAND) {
        this.receiveBuildingProp({
          type: EPropertyType.LAND,
          value: building_land
        });
      }
      let request: IValuation = {
        siteVisitId: this.siteVisitId,
        propertyType: this.valuationCtrls.propertyTypeCtrl?.value,
        valuationType: this.valuationCtrls.valuationTypeCtrl?.value,
        insuranceValue: parseInt(this.noComma(this.valuationCtrls.insuranceValueCtrl?.value)),
        openMarketValue: parseInt(this.noComma(this.valuationCtrls.openMarketValueCtrl?.value)),
        forcedSaleValue: parseInt(this.noComma(this.valuationCtrls.forcedSaleValueCtrl?.value)),
        landValue: parseInt(this.noComma(this.valuationCtrls.landValueCtrl?.value)),
        observation: this.valuationCtrls.observationCtrl?.value,
        draft: draft,
        properties: this.valuationData,
        valuationMethods: this.valuationCtrls.valuationMethodCtrl?.value,
        propertyAccess: this.valuationCtrls.propertyAccessCtrl?.value,
        clientNames: this.valuationCtrls.clientsNamesCtrl?.value,
        inspectionDate: this.valuationCtrls.inspectionDateCtrl?.value,
        attachments: [
          this.valuationCtrls.realViewCtrl?.value,
          this.valuationCtrls.frontViewCtrl?.value,
          ...this.otherAttachments
        ]
      };
      if (this.isClosed) {
        this.inspectionService.editValuation(request).subscribe((res: IResponseObject<IValuation>) => {
          this.valuationResponse(res);
        });
      } else {
        this.inspectionService.createValuation(request).subscribe((res: IResponseObject<IValuation>) => {
          this.valuationResponse(res);
        });
      }
    }
  }

  // valuation response
  valuationResponse(res: IResponseObject<IValuation>): void {
    this.valuationLoading = false;
    if (res.status) {
      this.dataService.changeMessage(EStatePartial.SELECTED_INSPECTION.toString());
      this.goToInspections();
    } else {
      this.message = res.message;
      this.hasError = !res.status;
    }
  }

  // save draft
  saveDraft(save: boolean = true): Promise<any> {
    if (this.parcel?.id && this.siteVisitId && (!this.isClosed || this.notLocked)) {
      return new Promise((resolve) => {
        this.draftLoading = true;
        const request: IDraft = {
          siteVisitId: this.siteVisitId,
          userId: this.authUser?.id,
          time: new Date().toISOString(),
          data: {
            parcel: this.parcel || null,
            valuationData: this.valuationData || null,
            ...(this.valuationCtrls && {
              formData: {
                buildingTypeCtrl: this.valuationCtrls.buildingTypeCtrl?.value || null,
                residenceCategoryCtrl: this.valuationCtrls.residenceCategoryCtrl?.value || null,
                propertyTypeCtrl: this.valuationCtrls.propertyTypeCtrl?.value || null,
                valuationTypeCtrl: this.valuationCtrls.valuationTypeCtrl?.value || null,
                valuationMethodCtrl: this.valuationCtrls.valuationMethodCtrl?.value || null,
                constructionPropertyCtrl: this.valuationCtrls.constructionPropertyCtrl?.value || null,
                propertyAccessCtrl: this.valuationCtrls.propertyAccessCtrl?.value || null,
                buildingServiceCtrl: this.valuationCtrls.buildingServiceCtrl?.value || null,
                buildingUtilityCtrl: this.valuationCtrls.buildingUtilityCtrl?.value || null,
                insuranceValueCtrl: this.noComma(this.valuationCtrls.insuranceValueCtrl?.value) || null,
                openMarketValueCtrl: this.noComma(this.valuationCtrls.openMarketValueCtrl?.value) || null,
                forcedSaleValueCtrl: this.noComma(this.valuationCtrls.forcedSaleValueCtrl?.value) || null,
                landValueCtrl: this.noComma(this.valuationCtrls.landValueCtrl?.value) || null,
                observationCtrl: this.valuationCtrls.observationCtrl?.value || null,
                frontViewCtrl: this.valuationCtrls.frontViewCtrl?.value || null,
                realViewCtrl: this.valuationCtrls.realViewCtrl?.value || null,
                clientsNamesCtrl: this.valuationCtrls.clientsNamesCtrl?.value || null,
                inspectionDateCtrl: this.valuationCtrls.inspectionDateCtrl?.value || null
              },
              otherAttachmentsArr: this.otherAttachmentsArr ?? null,
              otherAttachments: this.otherAttachments
            })
          }
        };
        if (save) {
          if (!this.draft?.siteVisitId) {
            this.draftService.createDraft(request).subscribe((res: IResponseObject<IDraft>) => {
              this.draftResponse(res);
              this.fetchSiteVisiById(request.siteVisitId, false);
              resolve({});
            });
          } else {
            this.draftService.updateDraft(request).subscribe((res: IResponseObject<IDraft>) => {
              this.draftResponse(res);
              resolve({});
            });
          }
        } else {
          this.submitValuation(request);
        }
      });
    }
  }

  // process draft response
  draftResponse(res: IResponseObject<IDraft>): void {
    this.draftLoading = false;
    if (res.status) {
      this.dataService.changeMessage(EStatePartial.SELECTED_INSPECTION.toString());
      this.draft = res.data;
    } else {
      this.message = res.message;
      this.hasError = !res.status;
    }
  }

  // fetch draft by visit id
  fetchDraftByVisitID(id: string, load = true): void {
    this.pageLoading = load;
    this.draftService.getBySiteVisits(id).subscribe((res: IResponseObject<IDraft>) => {
      this.pageLoading = false;
      if (res.status && res.data) {
        this.draft = res.data;
        setTimeout(() => {
          this.populateDraft(this.draft);
        }, 1);
      }
    });
  }

  // save and close
  saveAndClose(): void { }

  // receive front view attachment
  onFrontViewAttachment(e: IAttachment): void {
    this.valuationCtrls.frontViewCtrl.setValue(e);
  }

  // receive front view attachment
  onRealViewAttachment(e: IAttachment): void {
    this.valuationCtrls.realViewCtrl.setValue(e);
  }

  // run manual validation
  runValidation(): void {
    this.ValidationService.notifyChildComponents();
    Object.keys(this.valuationCtrls).forEach(ctrl => {
      if (this.valuationCtrls[ctrl].errors) {
        this.valuationCtrls[ctrl].markAsDirty();
      }
    });
  }

  // trigger auto update
  triggerDraftUpdate(): void {
    if (this.isClosed !== undefined && !this.isClosed && !this.isAdmin) {
      const source = timer(5000, 1000 * 15); // auto update every 15 sec
      this.draftOb$ = source.pipe(takeUntil(this.subject)).subscribe(() => {
        this.createInspection(true, this.geolocation);
        if (this.applicationIsValid) {
          this.stopAutoUpdate();
        }
      });
    }
  }

  // stop auto update
  stopAutoUpdate(): void {
    this.subject.next();
    this.autoSave = false;
  }

  // toggle preview
  togglePreview(bool: boolean): void {
    if (bool && !this.applicationIsValid) {
      this.runValidation();
    } else {
      this.preview = bool;
      if (this.editable) {
        this.editable = false;
      }
    }
  }

  // change editable state
  toggleEditable(bool: boolean) {
    this.editable = bool;
  }

  //  toggle certify
  toggleCertify(): void {
    this.certifyChecked = !this.certifyChecked;
  }

  // navigate to jobs on create succesifull
  goToInspections(message = true): void {
    this.router.navigateByUrl('/inspections', {
      state: {
        ...(message && { message: `${this.translations.valuation_success_1} ${this.parcel.upi} ${this.translations.valuation_success_2} ${this.isPending ? '1000' : '6000'} ${this.translations.valuation_success_3}` })
      }
    });
  }

  // enforce observation
  validateObservation(enforce = true): void {
    if (enforce) {
      this.valuationCtrls.observationCtrl.setValidators([Validators.required]);
      this.valuationCtrls.observationCtrl.updateValueAndValidity();
    } else {
      this.valuationCtrls.observationCtrl.setValidators(null);
      this.valuationCtrls.observationCtrl.updateValueAndValidity();
    }
  }

  // go back
  goBack(): void {
    this.location.back();
  }

  // get valuer site visits
  fetchSiteVisiById(ID: string, load = true): void {
    if (!this.isNew) {
      this.pageLoading = load;
      const paylaod = paginateSearch();
      paylaod.id = ID;
      paylaod.userId = this.authUser.id;
      this.inspectionService.getUserVisits(paylaod).subscribe((res: IResponseObject<IRequest[]>) => {
        if (res.status && res.data?.length > 0) {
          this.currentSiteVisit = res.data[0];
          this.parcel = res.data[0].parcel;
          const { state, xCoordinate, yCoordinate } = this.currentSiteVisit;
          this.geolocation = {
            xCoordinate,
            yCoordinate
          };
          switch (state) {
            case EApplicationState.CLOSED:
              this.fetchDraftByVisitID(ID, false);
              this.preview = true;
              break;
            case EApplicationState.STARTED:
              this.fetchDraftByVisitID(ID, false);
              break;
            case EApplicationState.PENDING:
              if (this.dataService.platform !== 'web') {
                this.receiveParcel(this.currentSiteVisit?.parcel);
              }
              this.fetchDraftByVisitID(ID);
              break;
            default:
              this.currentSiteVisit = null;
              this.parcel = null;
              this.valuationData = null;
              this.pageLoading = false;
          }
        } else {
          this.notFound = true;
        }
      });
    }
  }

  // populate draft
  populateDraft(draft: IDraft): void {
    const { data } = draft;
    if (data?.formData) {
      const form = data?.formData;
      Object.keys(form).forEach(ctrl => {
        this.valuationCtrls[ctrl].setValue(form[ctrl]);
      });
      if (form.propertyTypeCtrl) {
        this.onPropertyTypeSelected(form.propertyTypeCtrl)
      }
      if (form.propertyTypeCtrl === EPropertyType.LAND) {
        this.onLandTypeSelected(form.buildingTypeCtrl);
      } else {
        if (form.buildingTypeCtrl) {
          this.onBuildingTypeSelected(form.buildingTypeCtrl);
        }
        if (form.residenceCategoryCtrl) {
          this.getPropertiesByType(form.residenceCategoryCtrl);
        }
      }
    }
    this.otherAttachmentsArr = data?.otherAttachmentsArr;
    this.otherAttachments = data?.otherAttachments;
  }

  // remove field
  removeField(ctrl: string): void {
    this.valuationFormGroup.removeControl(ctrl);
  }

  // add field
  addField(ctrl: string, val = [Validators.required]): void {
    this.valuationFormGroup.addControl(ctrl, new FormControl(null, val));
  }

  // init other attachment
  initOtherAttachments(index = 0): void {
    if (!this.otherAttachmentsArr[index]) {
      this.otherAttachmentsArr.push({ name: this.translations.other_image, index: index });
    }
  }

  // receive other attachments
  onOtherAttachment(e: IAttachment, i: number): void {
    this.otherAttachments[i] = e;
    this.initOtherAttachments(i + 1)
  }

  // return yes/no
  propFilter(scope: string, value: any): string {
    return !!this.valuationCtrls[scope].value?.find(_v => _v === value) ? this.translations.yes : this.translations.no;
  }

  // replace comma
  noComma(value: string): string {
    return value?.replace(/,/g, "");
  }

}

