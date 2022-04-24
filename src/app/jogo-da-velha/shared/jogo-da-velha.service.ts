import { Injectable } from '@angular/core';

/*@Injectable({
  providedIn: 'root'
})*/

@Injectable()
export class JogoDaVelhaService {

  /**
   * Definição dos atributos de classe que serão utilizadas para gerenciar o jogo
  */

  /**
   * O primeiro bloco são constantes
   * readony significa que os atributos não serão modificados
   * Foram criados em letra maiuscula para vidualização de uma constante
   * O X representará uma das peças e O a outra peça
   * O tabuleiro irá trabalhar em três estados, X, O ou vazio
   */
   private readonly TAM_TAB: number = 3;
   private readonly X: number = 1;
   private readonly O: number = 2;
   private readonly VAZIO: number = 0;

   /**
    * Atributos de controle do jogo
    * tabuleiro será um array, será de três linhas por três colunas
    * Controlar os movimentos, serão no máximo de 9, se passar disso é que o jogo está com problema
    * Se chegar no 9 foi impate
    * vitória será destacada em verde, foi colocado para controlar
    */
   private tabuleiro: any;
   private numMovimentos: number;
   private vitoria: any;

  /**
   * Outras informações para mostrar mensagens
   * _jogador, controla o jogador corrente
   * _show... controla qual tela devará ser exibida
   */
   private _jogador: number;
   private _showInicio: boolean;
   private _showTabuleiro: boolean;
   private _showFinal: boolean;

  constructor() { }

  /**
   * Inicializa o jogo. Define exibição da tela inicial.
   *
   * @return void
   */
   inicializar(): void {
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this.numMovimentos = 0;
    this._jogador = this.X;
    this.vitoria = false;
    this.inicializarTabuleiro();
  }

  /**
   * Inicializa o tabuleiro do jogo com vazio para todas
   * as posições.
   *
   * @return void
   */
   inicializarTabuleiro(): void {
    this.tabuleiro = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.tabuleiro[i] = [this.VAZIO, this.VAZIO, this.VAZIO];
    }
  }

  /**
   * Retorna se a tela de início deve ser exibida.
   *
   * @return boolean
   * Vamos utilizar métodos utilitários
   * showInicio é uma variável privada
   * Será acessa pela View
   * Para isso vamos utilizar o declaração get e o nome do método (showInicio)
   * Será só uma acessor se devo exibir ou não a tela inicial
   */
   get showInicio(): boolean {
    return this._showInicio;
  }

  /**
   * Retorna se o tabuleiro deve ser exibido.
   *
   * @return boolean
   * Mesmo comentário do anterior para o tabuleiro
   */
   get showTabuleiro(): boolean {
    return this._showTabuleiro;
  }

  /**
   * Retorna se a tela de fim de jogo deve ser exibida.
   *
   * @return boolean
   */
   get showFinal(): boolean {
    return this._showFinal;
  }

  /**
   * Retorna o número do jogador a jogar.
   *
   * @return number
   */
   get jogador(): number {
    return this._jogador;
  }

  /**
   * Exibe o tabuleiro.
   *
   * @return void
   *
   * Ação para inicializar o jogo
   * Será associado ao botão de inicializar o jogo
   * Esconde a tela inicial e mostra o tabuleiro
   */
   iniciarJogo(): void {
    this._showInicio = false;
    this._showTabuleiro = true;
  }

  /**
   * Realiza uma jogada dado as coordenadas do tabuleiro.
   * Este é o método principal
   *
   * @param number posX
   * @param number posY
   * @return void
   *
   * Ação ocorre quando recebe um click na tela em uma determinada posição
   */

  jogar(posX: number, posY: number): void {
    // Verifica jogada inválida, também vai ignorar se ficar apertando após uma finalização do jogo
    if (this.tabuleiro[posX][posY] !== this.VAZIO ||
      this.vitoria) {
      return;
    }

    // Passando a verificação ele atribui a posição selecionada ao jogador
    this.tabuleiro[posX][posY] = this._jogador;
    this.numMovimentos++;
    // Verifica se o jogo terminou
    this.vitoria = this.fimJogo(posX, posY,
      this.tabuleiro, this._jogador);
    // Inverte o jogador
    this._jogador = (this._jogador === this.X) ? this.O : this.X;

    //Verifica se existe posição vazia para a CPU jogar
    if (!this.vitoria && this.numMovimentos < 9) {
      this.cpuJogar();
    }

    // houve vitória
    if (this.vitoria !== false) {
      this._showFinal = true;
    }

    // empate
    if (!this.vitoria && this.numMovimentos === 9) {
      this._jogador = 0;
      this._showFinal = true;
    }
  }

  /**
   * Verifica e retorna se o jogo terminou.
   *
   * @param number linha
   * @param number coluna
   * @param any tabuleiro
   * @param number jogador
   * @return array
   *
   * Faz verificação de linhas e colunas
   */
  fimJogo(linha: number, coluna: number,
    tabuleiro: any, jogador: number) {
    let fim: any = false;

    // valida a linha
    if (tabuleiro[linha][0] === jogador &&
      tabuleiro[linha][1] === jogador &&
      tabuleiro[linha][2] === jogador) {
      fim = [[linha, 0], [linha, 1], [linha, 2]];
    }

    // valida a coluna
    if (tabuleiro[0][coluna] === jogador &&
      tabuleiro[1][coluna] === jogador &&
      tabuleiro[2][coluna] === jogador) {
      fim = [[0, coluna], [1, coluna], [2, coluna]];
    }

    // valida as diagonais
    if (tabuleiro[0][0] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][2] === jogador) {
      fim = [[0, 0], [1, 1], [2, 2]];
    }

    if (tabuleiro[0][2] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][0] === jogador) {
      fim = [[0, 2], [1, 1], [2, 0]];
    }

    return fim;
  }

  /**
   * Lógica para simular jogada do computador em modo aleatório.
   *
   * @return void
   */
   cpuJogar(): void {
    // verifica jogada de vitória
    let jogada: number[] = this.obterJogada(this.O);

    if (jogada.length <= 0) {
      // tenta jogar para evitar derrota
      jogada = this.obterJogada(this.X);
    }

    //Caso ele não tenha condição da vitória e evitar a derrota ele faz uma jogada aleatória
    if (jogada.length <= 0) {
      // joga aleatório
      let jogadas: any = [];
      for (let i=0; i<this.TAM_TAB; i++) {
        for (let j=0; j<this.TAM_TAB; j++) {
          if (this.tabuleiro[i][j] === this.VAZIO) {
            jogadas.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (jogadas.length - 1)));
      jogada = [jogadas[k][0], jogadas[k][1]];
    }

    this.tabuleiro[jogada[0]][jogada[1]] = this._jogador;
    this.numMovimentos++;
    //Verifica se a jogada foi suficiente para vencer o jogo
    this.vitoria = this.fimJogo(jogada[0], jogada[1],
        this.tabuleiro, this._jogador);
    //Inverte o jogador para passar a vez para o usuário
    this._jogador = (this._jogador === this.X) ? this.O : this.X;
  }

  /**
   * Obtém uma jogada válida para vitória de um jogador.
   *
   * @param number jogador
   * @return number[]
   */

   obterJogada(jogador: number): number[] {
    let tab = this.tabuleiro;
    for (let lin = 0; lin < this.TAM_TAB; lin++) {
      for (let col = 0; col < this.TAM_TAB; col++) {
        if (tab[lin][col] !== this.VAZIO) {
          continue;
        }
        tab[lin][col] = jogador;
        if (this.fimJogo(lin, col, tab, jogador)) {
          return [lin, col];
        }
        tab[lin][col] = this.VAZIO;
      }
    }
    return [];
  }
   /**
   * Retorna se a peça X deve ser exibida para a
   * coordena informada.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
    exibirX(posX: number, posY: number): boolean {
      return this.tabuleiro[posX][posY] === this.X;
    }

    /**
   * Retorna se a peça O deve ser exibida para a
   * coordena informada.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  exibirO(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.O;
  }
  /**
   * Retorna se a marcação de vitória deve ser exibida para a
   * coordena informada.
   * Será marcada como verde
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
   exibirVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.vitoria) {
      return exibirVitoria;
    }

    for (let pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }

    return exibirVitoria;
  }

  /**
   * Inicializa um novo jogo, assim como exibe o tabuleiro.
   * Vai mostrar novamente o botão
   *
   * @return void
   */
   novoJogo(): void {
    this.inicializar();
    this._showFinal = false;
    this._showInicio = false;
    this._showTabuleiro = true;
  }

}
