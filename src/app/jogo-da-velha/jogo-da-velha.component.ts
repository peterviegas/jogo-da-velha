import { Component, OnInit } from '@angular/core';

import { JogoDaVelhaService } from './shared';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css']
})
export class JogoDaVelhaComponent implements OnInit {

  constructor(private jogoDaVelhaService: JogoDaVelhaService) { }

  ngOnInit(): void  {
    this.jogoDaVelhaService.inicializar();          //Chamar o método de inicializar do serviço
  }

  /**
   * Tornar os serviços visíveis
   */

  /**
   * Retorna se a tela de início deve ser exibida
   *
   * @retun boolean
   */
  get showInicio():boolean{
    return this.jogoDaVelhaService.showInicio;
  }

  /**
   * Retorna se o tabuleiro deve ser exibido
   *
   * @retun boolean
   */
   get showTabuleiro():boolean{
    return this.jogoDaVelhaService.showTabuleiro;
  }

  /**
   * Retorna se a tela de fim de jogo deve ser exibida
   *
   * @retun boolean
   */
   get showFinal():boolean{
    return this.jogoDaVelhaService.showFinal;
  }

  /**
   * Inicializa os dados de um jogo
   *
   * @return void
   */
  iniciarJogo(): void{
    this.jogoDaVelhaService.iniciarJogo();
  }

  /**
   * Realiza uma jogada ao clicar um local do tabuleiro
   *
   * @param number posX
   * @param number posY
   * @return void
   */
  jogar(posX: number, posY:number):void{                //Recebe do HTML
    this.jogoDaVelhaService.jogar(posX, posY);          //Envia para o serviço
  }

  /**
   * Retorna se a peça X deve ser exibida para a cordenada informada
   *
   * @param posX
   * @param posY
   * @return void
   */
  exibirX(posX: number, posY: number):void{
    this.jogoDaVelhaService.exibirX(posX, posY);
  }

  /**
   * Retorna se a peça O deve ser exibida para a cordenada informada
   *
   * @param posX
   * @param posY
   * @return void
   */
   exibirO(posX: number, posY: number):void{
    this.jogoDaVelhaService.exibirO(posX, posY);
  }

  /**
   * Retorna se a marcação de Vitória deve ser exibida para a cordenada informada
   *
   * @param posX
   * @param posY
   * @return void
   */
   exibirVitoria(posX: number, posY: number):void{
    this.jogoDaVelhaService.exibirVitoria(posX, posY);
  }

  /**
   * Retorna o número de jogador a jogar
   *
   * @return number
   */
  get jogador(): number{
    return this.jogoDaVelhaService.jogador;
  }

  /**
   * Inicia um novo jogo
   * @return void
   */
  novoJogo(): void{
    this.jogoDaVelhaService.novoJogo();
  }

}
