import { TestBed } from '@angular/core/testing';

import { ProjectsEmployeeService } from './projects-employee.service';

describe('ProjectsEmployeeService', () => {
  let service: ProjectsEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
