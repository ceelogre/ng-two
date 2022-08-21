import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValuationPropertyComponent} from './valuation-property.component';

describe('ValuationPropertyComponent', () => {
  let component: ValuationPropertyComponent;
  let fixture: ComponentFixture<ValuationPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuationPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
