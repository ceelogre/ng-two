import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestLayoutComponent} from './request-layout.component';

describe('RequestLayoutComponent', () => {
  let component: RequestLayoutComponent;
  let fixture: ComponentFixture<RequestLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
