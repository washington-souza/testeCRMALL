import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, empty } from 'rxjs';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { ViacepService } from '../viacep/service/viacep.service';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Viacep } from '../viacep/viacep';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  dataSaved = false;
  clienteForm: any;
  todosClientesLista!: Observable<Cliente[]>;
  id = 0;
  message = '';

  constructor(private formbulider: FormBuilder, private clienteService:ClienteService, private cepService: ViacepService) { }
  
  ngOnInit() {
    this.clienteForm = this.formbulider.group({
      Nome: ['', [Validators.required]],
      DataDeNascimento: ['', [Validators.required]],
      Sexo: ['', [Validators.required]],
      CEP: ['', []],
      Endereco: ['', []],
      Numero: ['', []],
      Complemento: ['', []],
      Bairro: ['', []],
      Estado: ['', []],
      Cidade: ['', []]
    });
    this.todosClientes();

    this.clienteForm.get('CEP').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.clienteForm.get('CEP').value)
          : empty()
        )
      )
  }

  populaDadosForm(dados: any) {
    this.clienteForm.patchValue({
      Endereco: dados.logradouro,
      Complemento: dados.complemento,
      Bairro: dados.bairro,
      Cidade: dados.localidade,
      Estado: dados.uf
    });
  }

  todosClientes() {
    this.todosClientesLista = this.clienteService.TodosClientes();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const cliente = this.clienteForm.value;
    this.inserirCliente(cliente);
    this.clienteForm.reset();
  }

  carregarCliente(clienteId: number) {  
    this.clienteService.getClientePorId(clienteId).subscribe(cliente=> {
      this.message = '';
      this.dataSaved = false;
      this.id = cliente.Id;
      this.clienteForm.controls['Nome'].setValue(cliente.Nome);
      this.clienteForm.controls['Sexo'].setValue(cliente.Sexo);
      this.clienteForm.controls['DataDeNascimento'].setValue(cliente.DataDeNascimento);
      this.clienteForm.controls['CEP'].setValue(cliente.Cep);
      this.clienteForm.controls['Endereco'].setValue(cliente.Endereco);
      this.clienteForm.controls['Numero'].setValue(cliente.Numero);
      this.clienteForm.controls['Complemento'].setValue(cliente.Complemento);
      this.clienteForm.controls['Bairro'].setValue(cliente.Bairro);
      this.clienteForm.controls['Estado'].setValue(cliente.Estado);
      this.clienteForm.controls['Cidade'].setValue(cliente.Cidade);
    });
  }

  inserirCliente(cliente: Cliente) {
    if (this.id === 0) {
      this.clienteService.inserirCliente(cliente).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Cliente salvo.';
          this.todosClientes();
          this.id = 0;
          this.clienteForm.reset();
        }  
      );  
    } else {  
      cliente.Id = this.id;
      this.clienteService.atualizarCliente(cliente).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Cliente atualizado.';
        this.todosClientes();
        this.id = 0;
        this.clienteForm.reset();
      });
    }
  }
  deletarCliente(id: number) {
    if (confirm("Deseja deletar esse cliente?")) {
    this.clienteService.deletarCliente(id).subscribe(() => {
      this.dataSaved = true;
      this.message = 'Cliente deletado.';
      this.todosClientes();
      this.id = 0;
      this.clienteForm.reset();
    });
  }
}

consultaCEP(cep: any) {
  cep = cep.value;
  if (cep != null && cep !== '') {
    this.cepService.consultaCEP(cep)
    .subscribe(dados => this.populaDadosForm(dados));
  }
}

resetForm() {
  this.clienteForm.reset();
  this.message = '';
  this.dataSaved = false;
}
}