import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JogoDaVelhaComponent } from './jogo-da-velha.component';
import { JogoDaVelhaService } from './shared';


@NgModule({
  declarations: [
    JogoDaVelhaComponent
  ],
  imports: [
    CommonModule
  ],
  /**
   * Necessário devido a este projeto não estar utilizado rota
   * Dessa forma a tag da aplicação consiguirá visualizar
   */
  exports:[
    JogoDaVelhaComponent
  ],
  providers:[
    JogoDaVelhaService
  ]
})
export class JogoDaVelhaModule { }
