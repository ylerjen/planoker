import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlacePageComponent } from './user-place-page.component';

describe('UserPlacePageComponent', () => {
  let component: UserPlacePageComponent;
  let fixture: ComponentFixture<UserPlacePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPlacePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
