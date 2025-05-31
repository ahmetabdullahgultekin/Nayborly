import {TestBed} from '@angular/core/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarService, SnackbarType} from './snackbar.service';

class MatSnackBarMock {
  open = jasmine.createSpy('open');
}

describe('SnackbarService', () => {
  let service: SnackbarService;
  let matSnackBar: MatSnackBarMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        {provide: MatSnackBar, useClass: MatSnackBarMock}
      ]
    });
    service = TestBed.inject(SnackbarService);
    matSnackBar = TestBed.inject(MatSnackBar) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call open with correct parameters for success', () => {
    service.show('Success!', SnackbarType.Success);
    expect(matSnackBar.open).toHaveBeenCalledWith(
      'Success!',
      'Close',
      jasmine.objectContaining({panelClass: 'snackbar-success'})
    );
  });

  it('should call open with correct parameters for error', () => {
    service.show('Error!', SnackbarType.Error);
    expect(matSnackBar.open).toHaveBeenCalledWith(
      'Error!',
      'Close',
      jasmine.objectContaining({panelClass: 'snackbar-error'})
    );
  });
});

