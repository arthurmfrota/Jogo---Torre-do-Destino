console.log('Você acorda confuso, em frente a uma torre enorme.\n\nAs lendas dizem que ninguém chegou ao topo dessa torre...\nMas riqueza, poder e glória aguardam no topo.\n\nEscale os 10 andares e sobreviva.\n')

function random(min, max){
return Math.floor(Math.random() * (max - min + 1)) + min
}

function chance(valor){
return random(1,100) <= valor
}

let nome = prompt(
"Diante dessa torre, você ainda lembra seu nome?\nDigite seu nome: "
)

console.log("\nBem-vindo à torre, " + nome + "!")

let escolhaDeClasse = prompt(
"[1] Guerreiro\nMais vida e defesa\n\n[2] Mago\nMais magia e velocidade\n\nEscolha sua classe: "
)
while(escolhaDeClasse !== "1" && escolhaDeClasse !== "2"){
escolhaDeClasse = prompt("Escolha válida: ")
}

const ARMAS = {
guerreiro: [
{
nome: "Espada comum",
min: 6,
max: 11,
preco: 0
},
{
nome: "Espada rara",
min: 9,
max: 14,
preco: 275
},
{
nome: "Espada lendária",
min: 12,
max: 18,
preco: 550
},
{
nome: "Espada do Rei Caído",
min: 22,
max: 35,
preco: 0
}
],

mago: [
{
nome: "Cajado comum",
min: 7,
max: 12,
preco: 0
},
{
nome: "Cajado raro",
min: 9,
max: 14,
preco: 275
},
{
nome: "Cajado lendário",
min: 13,
max: 20,
preco: 550
},
{
nome: "Cajado do Vazio",
min: 24,
max: 37,
preco: 0
}
]
}

const ARMADURAS = [
{
nome: "Armadura de Couro",
hp: 35,
defesa: 4,
preco: 250
},
{
nome: "Armadura de Aço",
hp: 70,
defesa: 8,
preco: 500
}
]

let classe =
escolhaDeClasse === "1" ? "Guerreiro" : "Mago"

let armaAtual =
escolhaDeClasse === "1"
? ARMAS.guerreiro[0]
: ARMAS.mago[0]

let armaduraAtual = {
nome: "Roupas Comuns",
hp: 0,
defesa: 0
}

let player = {
nome,
classe,

hp: classe === "Guerreiro" ? 160 : 100,
maxHp: classe === "Guerreiro" ? 160 : 100,

forca: classe === "Guerreiro" ? 10 : 3,
magia: classe === "Mago" ? 10 : 2,

defesa: classe === "Guerreiro" ? 6 : 2,
velocidade: classe === "Guerreiro" ? 4 : 8,

nivel: 1,
andarAtual: 1,
moedas: 120,

inventario: {
cura: 1,
dano: 0,
velocidade: 0
},

buffDano: 0,
buffVelocidade: 0,

turnosBuffDano: 0,
turnosBuffVelocidade: 0,

turnos: 0,
monstrosMortos: 0,
tesouros: 0,
armadilhas: 0
}

const INIMIGOS = [
{
nome: "Goblin",
hp: 40,
ataqueMin: 5,
ataqueMax: 10,
defesa: 1,
velocidade: 4,
andarMin: 1,
andarMax: 2,
niveis: 1,
moedas: 35
},

{
nome: "Esqueleto",
hp: 70,
ataqueMin: 10,
ataqueMax: 16,
defesa: 3,
velocidade: 5,
andarMin: 2,
andarMax: 4,
niveis: 1,
moedas: 60
},

{
nome: "Orc",
hp: 120,
ataqueMin: 14,
ataqueMax: 22,
defesa: 5,
velocidade: 4,
andarMin: 4,
andarMax: 6,
niveis: 2,
moedas: 100
},

{
nome: "Cavaleiro Amaldiçoado",
hp: 180,
ataqueMin: 20,
ataqueMax: 30,
defesa: 7,
velocidade: 6,
andarMin: 6,
andarMax: 8,
niveis: 2,
moedas: 160
},

{
nome: "Troll da Torre",
hp: 250,
ataqueMin: 28,
ataqueMax: 38,
defesa: 10,
velocidade: 5,
andarMin: 8,
andarMax: 10,
niveis: 3,
moedas: 240
}
]

function mostrarStatus(){
console.log("\n========== STATUS ==========")
console.log("Nome: " + player.nome)
console.log("Classe: " + player.classe)
console.log("Andar: " + player.andarAtual)
console.log("Nível: " + player.nivel)
console.log("HP: " + player.hp + "/" + player.maxHp)
console.log("Força: " + player.forca)
console.log("Magia: " + player.magia)
console.log("Defesa: " + player.defesa)
console.log("Velocidade: " + player.velocidade)
console.log("Moedas: " + player.moedas)
console.log("Arma: " + armaAtual.nome)
console.log("Armadura: " + armaduraAtual.nome)
console.log("============================")
}

function escolherAtributo(){

let escolha = prompt(
"\n[1] HP (+20)\n[2] Força (+3)\n[3] Magia (+3)\n[4] Velocidade (+2)\n\nEscolha um atributo: "
)

while(
escolha !== "1" &&
escolha !== "2" &&
escolha !== "3" &&
escolha !== "4"
){
escolha = prompt("Escolha válida: ")
}

if(escolha === "1"){
player.maxHp += 20
player.hp += 20
console.log("\nHP aumentado!")
}else if(escolha === "2"){
player.forca += 3
console.log("\nForça aumentada!")
}else if(escolha === "3"){
player.magia += 3
console.log("\nMagia aumentada!")
}else{
player.velocidade += 2
console.log("\nVelocidade aumentada!")
}
}

function gerarInimigo(andar){

let possiveis = []

for(let inimigo of INIMIGOS){
if(
andar >= inimigo.andarMin &&
andar <= inimigo.andarMax
){
possiveis.push(inimigo)
}
}

let base = possiveis[random(0, possiveis.length - 1)]

return {
nome: base.nome,
hp: base.hp + andar * 10,
maxHp: base.hp + andar * 10,
ataqueMin: base.ataqueMin + andar,
ataqueMax: base.ataqueMax + andar,
defesa: base.defesa + Math.floor(andar / 2),
velocidade: base.velocidade + Math.floor(andar / 3),
moedas: base.moedas + andar * 10,
niveis: base.niveis
}
}

function calcularDano(atacante, defensor){

let dano = 0

if(atacante === player){

if(player.classe === "Guerreiro"){
dano = player.forca + random(armaAtual.min, armaAtual.max)
}else{
dano = player.magia + random(armaAtual.min, armaAtual.max)
}

let chanceCritica = Math.min(35, player.velocidade * 1.5)

if(chance(chanceCritica)){
console.log("\nACERTO CRÍTICO!")
dano += player.classe === "Guerreiro"
? player.forca
: player.magia
}

}else{

dano = random(
atacante.ataqueMin,
atacante.ataqueMax
)
}

dano -= Math.floor(defensor.defesa * 1.5)

return Math.max(1, dano)
}

function batalha(player, inimigo){

console.log("\nUm " + inimigo.nome + " apareceu!")

while(player.hp > 0 && inimigo.hp > 0){

console.log("\n====================")
console.log(inimigo.nome)
console.log("HP: " + inimigo.hp + "/" + inimigo.maxHp)
console.log("====================")

console.log("\nSeu HP: " + player.hp + "/" + player.maxHp)

console.log("\n[1] Atacar")
console.log("[2] Fugir")

let escolha = prompt("Escolha: ")

while(escolha !== "1" && escolha !== "2"){
escolha = prompt("Escolha válida: ")
}

let playerPrimeiro =
player.velocidade >= inimigo.velocidade

function turnoPlayer(){

if(escolha === "1"){
let dano = calcularDano(player, inimigo)
inimigo.hp -= dano
console.log("\nVocê causou " + dano + " de dano!")
}else{

let chanceFuga = 40 + player.velocidade

if(chance(chanceFuga)){
console.log("\nVocê fugiu!")
return "fugiu"
}

console.log("\nVocê falhou em fugir!")
}
}

function turnoInimigo(){

if(inimigo.hp <= 0){
return
}

let danoInimigo =
calcularDano(inimigo, player)

player.hp -= danoInimigo

if(player.hp < 0){
player.hp = 0
}

console.log(
"\n" + inimigo.nome +
" causou " + danoInimigo +
" de dano!"
)
}

if(playerPrimeiro){

let resultado = turnoPlayer()

if(resultado === "fugiu"){
return true
}

turnoInimigo()

}else{

turnoInimigo()

if(player.hp <= 0){
break
}

let resultado = turnoPlayer()

if(resultado === "fugiu"){
return true
}
}
}

if(player.hp <= 0){
console.log("\nVocê morreu...")
return false
}

console.log("\nVocê derrotou " + inimigo.nome + "!")

let regeneracao =
Math.floor(player.maxHp * 0.08)

player.hp += regeneracao

if(player.hp > player.maxHp){
player.hp = player.maxHp
}

console.log(
"\nVocê recuperou " +
regeneracao + " HP!"
)

player.monstrosMortos++
player.moedas += inimigo.moedas

console.log(
"\nVocê ganhou " +
inimigo.moedas +
" moedas!"
)

for(let i = 0; i < inimigo.niveis; i++){
player.nivel++

console.log(
"\nVocê subiu para o nível " +
player.nivel
)

escolherAtributo()
}

return true
}

while(player.hp > 0){

console.log(
"\n========== ANDAR " +
player.andarAtual +
" =========="
)

mostrarStatus()

let inimigo = gerarInimigo(player.andarAtual)

let venceu = batalha(player, inimigo)

if(!venceu){
break
}

player.andarAtual++

player.maxHp += 15

let recuperacao =
Math.floor(player.maxHp * 0.35)

player.hp += recuperacao

if(player.hp > player.maxHp){
player.hp = player.maxHp
}

console.log(
"\nVocê avançou para o andar " +
player.andarAtual + "!"
)
}
