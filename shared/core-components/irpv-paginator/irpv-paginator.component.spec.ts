import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IrpvPaginatorComponent} from './irpv-paginator.component';

describe('IrpvPaginatorComponent', () => {
  let component: IrpvPaginatorComponent;
  let fixture: ComponentFixture<IrpvPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrpvPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrpvPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
