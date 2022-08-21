import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvStatusDisplayComponent} from './irpv-status-display.component';

describe('IrpvStatusDisplayComponent', () => {
  let component: IrpvStatusDisplayComponent;
  let fixture: ComponentFixture<IrpvStatusDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvStatusDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvStatusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
