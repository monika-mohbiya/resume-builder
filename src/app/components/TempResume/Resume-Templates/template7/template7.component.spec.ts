import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template7Component } from './template7.component';

describe('Template7Component', () => {
  let component: Template7Component;
  let fixture: ComponentFixture<Template7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
