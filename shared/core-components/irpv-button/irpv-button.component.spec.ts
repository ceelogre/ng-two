import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvButtonComponent} from './irpv-button.component';

describe('IrpvButtonComponent', () => {
  let component: IrpvButtonComponent;
  let fixture: ComponentFixture<IrpvButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
