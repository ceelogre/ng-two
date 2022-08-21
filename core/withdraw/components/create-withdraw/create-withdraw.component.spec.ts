import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWithdrawComponent } from './create-withdraw.component';

describe('CreateWithdrawComponent', () => {
  let component: CreateWithdrawComponent;
  let fixture: ComponentFixture<CreateWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
