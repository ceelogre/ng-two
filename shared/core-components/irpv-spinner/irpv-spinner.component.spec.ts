import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvSpinnerComponent} from './irpv-spinner.component';

describe('IrpvSpinnerComponent', () => {
  let component: IrpvSpinnerComponent;
  let fixture: ComponentFixture<IrpvSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
