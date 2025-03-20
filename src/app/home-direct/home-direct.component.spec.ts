import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDirectComponent } from './home-direct.component';

describe('HomeDirectComponent', () => {
  let component: HomeDirectComponent;
  let fixture: ComponentFixture<HomeDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
