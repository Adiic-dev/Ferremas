import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://44.207.144.184:8000/register_user/';
  }

  register(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, formValue)
    );
  }
}
