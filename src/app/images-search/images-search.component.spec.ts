import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesSearchComponent } from './images-search.component';

describe('ImagesSearchComponent', () => {
  let component: ImagesSearchComponent;
  let fixture: ComponentFixture<ImagesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
