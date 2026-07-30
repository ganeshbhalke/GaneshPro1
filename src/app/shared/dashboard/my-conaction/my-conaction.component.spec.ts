import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConactionComponent } from './my-conaction.component';

describe('MyConactionComponent', () => {
  let component: MyConactionComponent;
  let fixture: ComponentFixture<MyConactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyConactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyConactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
