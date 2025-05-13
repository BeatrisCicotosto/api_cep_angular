import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cep: string = '';
  endereco: any = null;
  mensagemErro: string = '';

  constructor(private http: HttpClient) {}

  consultarCEP() {
    this.mensagemErro = '';
    this.endereco = null;
    const cepLimpo = this.cep.replace(/\D/g, '');

    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;
    this.http.get<any>(url).subscribe({
      next: (dados) => {
        if (dados.erro) {
          this.mensagemErro = 'CEP inválido ou endereço não encontrado.';
        } else {
          this.endereco = dados;
        }
      },
      error: () => {
        this.mensagemErro = 'Erro ao buscar o CEP.';
      }
    });
  }
}
