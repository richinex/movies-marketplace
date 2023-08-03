/* tslint:disable */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this
import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule] // Add this line
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.inject(ApiService); // Use inject instead of get, as get is deprecated
    expect(service).toBeTruthy();
  });
});
