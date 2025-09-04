import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainFormComponent } from './domain-form.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LookupService } from '../services/lookup.service';
import { HttpClientModule } from '@angular/common/http';

describe('DomainFormComponent without pre domain', () => {
  let component: DomainFormComponent;
  let fixture: ComponentFixture<DomainFormComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainFormComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterTestingModule.withRoutes([{path: 'lookup', component: DomainFormComponent}])
      ],
      providers: [
        LookupService
      ]
    })
    .compileComponents();

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('Should create messageTypes', () => {
    expect(component.messageTypes.Error).toBe(0);
    expect(component.messageTypes.Info).toBe(1);
  });


  it ('Option redirect should redirect the user to the lookup page', ()  => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.isRedirectedResponse = true;
    component.domain = 'testdomainsubmit.com';
    component.submitLookupAction();

    expect(component.domain).toBe('testdomainsubmit.com');
    expect(navigateSpy).toHaveBeenCalledWith('/lookup');
  });

});

describe('DomainFormComponent with pre domain', () => {
  let fixture: ComponentFixture<DomainFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainFormComponent ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([{path: 'lookup', component: DomainFormComponent}])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainFormComponent);
    fixture.detectChanges();
  });

});
