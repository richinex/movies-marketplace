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
    apiServiceMock.addToFavorites.and.returnValue(of({})); // Use of({}) to return an observable
    apiServiceMock.getMovie.and.returnValue(of({}));

    activatedRouteMock = {
      snapshot: {
        params: { id: 1 },
      },
    };

    component = new MovieComponent(apiServiceMock, activatedRouteMock);

    // Mocking $.notify
    window['$'] = {
      notify: jasmine.createSpy('notify')
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToFavorites', () => {
    const mockMovieData = { title: 'Test Movie' };
    component.movie = mockMovieData;

    component.addToFav();

    expect(apiServiceMock.addToFavorites).toHaveBeenCalledWith(mockMovieData);
    expect(window['$'].notify).toHaveBeenCalled();
  });
});
