import { TestBed } from '@angular/core/testing';
import { IncidentesService } from './incidentes';

describe('IncidentesService', () => {
  let service: IncidentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentesService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});
