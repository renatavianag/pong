//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(color(0, 140, 0));
  mostraBolinha();
  movimentaBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoBorda();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolaNaoFicarPresa();
  bolaNaoFicarPresa2();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (yRaquete >0){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;}
  }
  if (yRaquete <310){
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;}
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,
xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
    calculaChanceDeErrar();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = (yBolinha -yRaqueteOponente - raqueteComprimento) / 2 - chanceDeErrar;
  yRaqueteOponente += velocidadeYOponente
}

function incluiPlacar() {
  stroke(color(0, 70, 0));
  textAlign(CENTER);
  fill(color(0, 90, 0));
  textSize(20);
  textStyle(BOLD);
  rect(233, 9, 50, 30);
  fill(255);
  text(meusPontos, 258, 30);
  fill(color(0, 90, 0));
  rect(317, 9, 50, 30);
  fill(255);
  text(pontosDoOponente, 341, 30);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
    velocidadeXBolinha += (meusPontos / 100);
    velocidadeYBolinha += (meusPontos / 100);
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
    calculaChanceDeErrar();
  }
}

function bolaNaoFicarPresa() {
  if (xBolinha - raio < 1) {
    xBolinha = 30;
    
  }
}

function bolaNaoFicarPresa2() {
  if (xBolinha + raio > 599) {
    xBolinha = 570;
  }
}

function calculaChanceDeErrar(){
  if(xBolinha < 300){
    chanceDeErrar = round(random(-30,30));
  }else{
    chanceDeErrar = 0;
  }
}



