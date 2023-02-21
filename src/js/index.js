const celulas = document.querySelectorAll (".celula");
const jogador_x = "x";
const jogador_O = "O";
let checarTurno = true;

const combinacoes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

document.addEventListener ("click", (event) => {
    if (event.target.matches(".celula")) {
        jogar (event.target.id);
    }
});

function jogar (id) {
    const celula = document.getElementById (id);
    turno = checarTurno ? jogador_x : jogador_O;
    celula.textContent = turno;
    celula.classList.add (turno);
    checaVencedor (turno);
}

function checaVencedor (turno) {
    const vencedor = combinacoes.some((comb) => {
        return comb.every ((index) => {
            return celulas[index].classList.contains (turno);
        });
    });

    if (vencedor) {
        encerraJogo (turno);
    } else if (checarEmpate ()) {
        encerraJogo ();
    } else {
        checarTurno = !checarTurno;
    }
}

function checarEmpate () {
    let x = 0;
    let o = 0;

    for (index in celulas) {
        if (!isNaN(index)) {
            if (celulas[index].classList.contains(jogador_x)) {
                x++;
            }
            if (celulas[index].classList.contains(jogador_O)) {
                o++;
            }
        }
    }
        return x + o === 9 ? true : false;
}

function encerraJogo (vencedor = null) {
    const telaVermelha = document.getElementById ("telaVermelha");
    const h2 = document.createElement ("h2");
    const h3 = document.createElement ("h3");
    let mensagem = null
    let contador = 3;

    telaVermelha.style.display = ("block");
    telaVermelha.appendChild (h2);
    telaVermelha.appendChild (h3);

    if (vencedor) {
        h2.innerHTML = `O player <span>${vencedor}</span> venceu`;
    } else {
        h2.innerHTML = "Deu empate";
    }

    setInterval (() => {
        h3.innerHTML = `O jogo reiniciará em ${contador--}`
    }, 1000)

    setTimeout (() => location.reload(), 4000);
}