import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvTableComponent} from './irpv-table.component';

describe('IrpvTableComponent', () => {
  let component: IrpvTableComponent;
  let fixture: ComponentFixture<IrpvTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
