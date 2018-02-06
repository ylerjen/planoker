import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSessionFormComponent } from './join-session-form.component';

describe('JoinSessionFormComponent', () => {
  let component: JoinSessionFormComponent;
  let fixture: ComponentFixture<JoinSessionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinSessionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinSessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
