import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddelectricityComponent } from './addelectricity.component';

describe('AddelectricityComponent', () => {
  let component: AddelectricityComponent;
  let fixture: ComponentFixture<AddelectricityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddelectricityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddelectricityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
