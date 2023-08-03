/* tslint:disable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MovieComponent } from './movie.component';
import { ApiService } from '../api.service';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  // Create a mock for the ApiService
  const apiServiceMock = {
    getMovie: jasmine.createSpy('getMovie').and.returnValue({ subscribe: () => {} }),
    addToFavorites: jasmine.createSpy('addToFavorites').and.returnValue({ subscribe: () => {} }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock }, // Provide the mock ApiService
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 'exampleId' },
            },
          },
        }, // Mock the ActivatedRoute with a snapshot object
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
