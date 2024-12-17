import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './error-detail.component.html',
  styleUrls: ['./error-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDetailComponent {
  icon: string = 'circle-exclamation';
  title: string;
  message: string;
  errorsDetail?: string[];
  color?: string = 'warn';

  constructor(public dialogRef: MatDialogRef<ErrorDetailComponent>, @Inject(MAT_DIALOG_DATA) public error: any) {
    if (!navigator.onLine) {
      this.icon = 'wifi-slash';
      this.title = 'Sem Acesso a Rede';
      this.message =
        'Para utilizar essa aplicação e necessário ter acesso à Internet. Verifique seu acesso de rede ou internet. Assim que a conexão for restabelecida tente novamente.';
    } else if (error instanceof HttpErrorResponse) {
      const serverError: HttpErrorResponse = error;

      switch (serverError.status) {
        case 400:
          this.icon = 'circle-exclamation-check';
          this.color = 'alert';
          this.title = 'Falha de Validação';
          this.message = serverError?.error?.errors ? 'Corrija os erros, e tente novamente.' : serverError?.error?.title;
          return;

        case 401:
          this.icon = 'user-slash';
          this.title = 'Falha de Autenticação';
          this.message = 'Seu usuário está sem acesso a esta aplicação. Para tentar corrigir, saia da aplicação e tente acessar novamente.';
          return;

        case 403:
          this.icon = 'lock';
          this.title = 'Falha de Autorização';
          this.message = 'Você não possui permissão para acessar o recurso solicitado.';
          return;

        case 404:
          this.icon = 'circle-question';
          this.title = 'Recurso não encontrado';
          this.message = serverError?.error?.title ?? `O endereço  não pode ser encontrado.`;
          this.errorsDetail = [serverError?.url, serverError?.error?.type];
          return;

        case 500:
          this.title = 'Erro Interno de Servidor';
          this.message = serverError?.error?.detail;
          this.errorsDetail = [serverError?.error?.type, serverError?.error?.instance, serverError?.error?.traceId];
          return;
      }
    }

    this.title = 'Erro Interno de Aplicação.';
    this.message = `Ocorreram erros inesperados na aplicação. Tente novamente repetir esta operação em alguns instantes, e caso o erro persista entre em contato conosco.`;
    this.errorsDetail = [error.message ?? error.toString()];

    console.error(error);
  }
}
