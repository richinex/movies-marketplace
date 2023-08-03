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
import { MovieComponent } from './movie.component';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let apiServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getMovie', 'addToFavorites']);

    activatedRouteMock = {
      snapshot: {
        params: { id: 1 },
      },
    };

    // Mocking $.notify
    window['$'] = {
      notify: jasmine.createSpy('notify')
    };
  });

  it('should create', () => {
    apiServiceMock.getMovie.and.returnValue(of({}));
    component = new MovieComponent(apiServiceMock, activatedRouteMock);
    expect(component).toBeTruthy();
  });

  it('should initialize movie object with API response', () => {
    const mockData = { actors: ['a', 'b'], title: 'Test Movie' };
    apiServiceMock.getMovie.and.returnValue(of(mockData));
    component = new MovieComponent(apiServiceMock, activatedRouteMock);

    expect(component.movie.title).toBe('Test Movie');
    expect(component.movie.actors.length).toBe(1); // First actor is shifted
  });

  it('should handle empty actors array', () => {
    const mockData = { title: 'Test Movie', actors: [] };
    apiServiceMock.getMovie.and.returnValue(of(mockData));
    component = new MovieComponent(apiServiceMock, activatedRouteMock);

    expect(component.movie.actors).toEqual([]);
  });

  it('should handle error on getMovie', () => {
    apiServiceMock.getMovie.and.returnValue(of(null));
    component = new MovieComponent(apiServiceMock, activatedRouteMock);

    expect(component.movie).toEqual({});
  });
  it('should call addToFavorites', () => {
    const mockMovieData = { title: 'Test Movie' };
    component.movie = mockMovieData;

    component.addToFav();

    expect(apiServiceMock.addToFavorites).toHaveBeenCalledWith(mockMovieData);
    expect(window['$'].notify).toHaveBeenCalled();
  });


});
