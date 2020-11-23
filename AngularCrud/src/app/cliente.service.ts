import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = 'http://localhost:62484';
  constructor(private http: HttpClient) { }  
  TodosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + '/TodosClientes');  
  }

  getClientePorId(id: number): Observable<Cliente> {  
    return this.http.get<Cliente>(this.url + '/GetClientePorId/' + id);  
  }

  inserirCliente(cliente: Cliente): Observable<Cliente> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Cliente>(this.url + '/InserirCliente/',  
    cliente, httpOptions);  
  } 

  atualizarCliente(cliente: Cliente): Observable<Cliente> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Cliente>(this.url + '/AtualizarCliente/',  
    cliente, httpOptions);  
  } 

  deletarCliente(id: number): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeletarCliente?id=' + id,  
 httpOptions);
  }
}