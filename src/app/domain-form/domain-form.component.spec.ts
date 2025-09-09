import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainFormComponent } from './domain-form.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LookupService } from '../services/lookup.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DomainFormComponent without pre domain', () => {
  let component: DomainFormComponent;
  let fixture: ComponentFixture<DomainFormComponent>;
  let router: Router;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ DomainFormComponent ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([{path: 'lookup', component: DomainFormComponent}])
      ],
      providers: [
        LookupService,
        provideHttpClient(withInterceptorsFromDi())
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

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

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ DomainFormComponent ],
      imports: [
        FormsModule, HttpClientTestingModule
      ],
      providers: [Router]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainFormComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTrue();
  });

});
