import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvSearchComponent} from './irpv-search.component';

describe('IrpvSearchComponent', () => {
  let component: IrpvSearchComponent;
  let fixture: ComponentFixture<IrpvSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
