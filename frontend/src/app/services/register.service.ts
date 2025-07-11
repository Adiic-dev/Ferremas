import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { getRegisterUrl } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {
  }

  register(formValue: any) {
    return firstValueFrom(
      this.httpClient.post<any>(getRegisterUrl(), formValue)
    );
  }
}
