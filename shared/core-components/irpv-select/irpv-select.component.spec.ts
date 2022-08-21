import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvSelectComponent} from './irpv-select.component';

describe('IrpvSelectComponent', () => {
  let component: IrpvSelectComponent;
  let fixture: ComponentFixture<IrpvSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
