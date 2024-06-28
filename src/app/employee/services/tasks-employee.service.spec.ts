import { TestBed } from '@angular/core/testing';

import { TasksEmployeeService } from './tasks-employee.service';

describe('TasksEmployeeService', () => {
  let service: TasksEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
