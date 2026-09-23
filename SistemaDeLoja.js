let estoque = 500;
let reposicoes = 0;
let vendasParciais = 0;

for (let dia = 1; dia <= 30; dia++) {
    let venda = Number(prompt(`Dia ${dia} - Quantidade vendida:`));

    if (venda > estoque) {
        console.log(`VENDA PARCIAL no dia ${dia}: solicitado ${venda}, vendido ${estoque}`);
        venda = estoque;
        vendasParciais++;
    }

    estoque -= venda;

    if (estoque === 0) {
        console.log(`RUPTURA DE ESTOQUE no dia ${dia}`);
        break;
    }

    if (estoque < 80) {
        if (reposicoes < 2) {
            estoque += 200;
            reposicoes++;
            console.log(`Reposição realizada no dia ${dia}`);
        } else {
            console.log(`REPOSICAO ESGOTADA no dia ${dia} --- estoque critico`);
        }
    }
}


console.log("\n--- RESULTADO FINAL ---");
console.log(`Estoque final: ${estoque}`);
console.log(`Total de reposicoes: ${reposicoes}`);
console.log(`Total de dias com venda parcial: ${vendasParciais}`);