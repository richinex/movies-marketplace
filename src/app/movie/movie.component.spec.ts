// /* tslint:disable */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
// import { MovieComponent } from './movie.component';
// import { ApiService } from '../api.service';

// describe('MovieComponent', () => {
//   let component: MovieComponent;
//   let fixture: ComponentFixture<MovieComponent>;

//   // Create a mock for the ApiService
//   const apiServiceMock = {
//     getMovie: jasmine.createSpy('getMovie').and.returnValue({ subscribe: () => {} }),
//     addToFavorites: jasmine.createSpy('addToFavorites').and.returnValue({ subscribe: () => {} }),
//   };

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [MovieComponent],
//       providers: [
//         { provide: ApiService, useValue: apiServiceMock }, // Provide the mock ApiService
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               params: { id: 'exampleId' },
//             },
//           },
//         }, // Mock the ActivatedRoute with a snapshot object
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MovieComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

/* tslint:disable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MovieComponent } from './movie.component';
import { ApiService } from '../api.service';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let apiServiceMock;

  beforeEach(async(() => {
    apiServiceMock = {
      getMovie: jasmine.createSpy('getMovie').and.returnValue({ subscribe: () => {} }),
      addToFavorites: jasmine.createSpy('addToFavorites').and.returnValue({ subscribe: () => {} }),
    };

    TestBed.configureTestingModule({
      declarations: [MovieComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 'exampleId' },
            },
          },
        },
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

  it('should call getMovie and update the movie property', () => {
    const mockMovieData = { title: 'Test Movie' };
    apiServiceMock.getMovie.and.returnValue({ subscribe: (callback: Function) => callback(mockMovieData) });

    fixture.detectChanges();

    expect(apiServiceMock.getMovie).toHaveBeenCalledWith('exampleId');
    expect(component.movie).toEqual(mockMovieData);
  });

  it('should handle error when calling getMovie', () => {
    apiServiceMock.getMovie.and.returnValue({
      subscribe: (successCallback: Function, errorCallback: Function) => errorCallback(),
    });

    fixture.detectChanges();

    expect(component.movie).toEqual({});
  });

  it('should call addToFavorites', () => {
    const mockMovieData = { title: 'Test Movie' };
    component.movie = mockMovieData;
    apiServiceMock.addToFavorites.and.returnValue({ subscribe: (callback: Function) => callback() });

    component.addToFav();

    expect(apiServiceMock.addToFavorites).toHaveBeenCalledWith(mockMovieData);
  });
});
