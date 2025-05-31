import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ContactService} from './contact.service';
import {ContactMessage} from '../interfaces/contact';

const mockMessage: ContactMessage = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'Hello!'
};

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a message to JSONBin', () => {
    service.sendMessage(mockMessage).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne(service['jsonBinUrl']);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockMessage);
    req.flush({success: true});
  });
});

