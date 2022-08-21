import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvDateFilterComponent} from './irpv-date-filter.component';

describe('IrpvDateFilterComponent', () => {
  let component: IrpvDateFilterComponent;
  let fixture: ComponentFixture<IrpvDateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvDateFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
