import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template8Component } from './template8.component';

describe('Template8Component', () => {
  let component: Template8Component;
  let fixture: ComponentFixture<Template8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
