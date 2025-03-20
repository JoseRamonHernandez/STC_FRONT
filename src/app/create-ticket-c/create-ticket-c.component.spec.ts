import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketCComponent } from './create-ticket-c.component';

describe('CreateTicketCComponent', () => {
  let component: CreateTicketCComponent;
  let fixture: ComponentFixture<CreateTicketCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTicketCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
