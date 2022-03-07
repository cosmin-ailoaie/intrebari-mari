import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  public test() {
    return this.httpClient.get(`http://localhost:8080/test`);
  }
}
