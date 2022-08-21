import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParcelFetchComponent} from './irpv-parcel-fetch.component';

describe('ParcelFetchComponent', () => {
  let component: ParcelFetchComponent;
  let fixture: ComponentFixture<ParcelFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParcelFetchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
