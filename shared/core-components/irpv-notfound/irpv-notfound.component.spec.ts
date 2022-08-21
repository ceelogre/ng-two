import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvNotfoundComponent} from './irpv-notfound.component';

describe('IrpvNotfoundComponent', () => {
  let component: IrpvNotfoundComponent;
  let fixture: ComponentFixture<IrpvNotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvNotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
