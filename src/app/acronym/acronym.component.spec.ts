import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcronymComponent } from './acronym.component';

describe('AcronymComponent', () => {
  let component: AcronymComponent;
  let fixture: ComponentFixture<AcronymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcronymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcronymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
