import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditelectricityComponent } from './editelectricity.component';

describe('EditelectricityComponent', () => {
  let component: EditelectricityComponent;
  let fixture: ComponentFixture<EditelectricityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditelectricityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditelectricityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
