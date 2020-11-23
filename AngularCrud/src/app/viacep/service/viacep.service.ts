import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  constructor(private httpClient: HttpClient) { }

  consultaCEP(cep: string) {
    console.log(cep);
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        return this.httpClient.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}