import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyUserComponent } from './reply-user.component';

describe('ReplyUserComponent', () => {
  let component: ReplyUserComponent;
  let fixture: ComponentFixture<ReplyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
