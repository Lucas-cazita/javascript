// Dados Iniciais   
    // Controle de Interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

    // Controle de Ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];
let candidato = '';

// Funções
function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numerosHtml = '';
    numero = '';
    votoBranco = false;

    for (let i=0;i<etapa.numeros;i++) {
        if (i === 0) {
            numerosHtml += '<div class="numero pisca"></div>';
        } else {
            numerosHtml += '<div class="numero"></div>';
        };
    };

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numerosHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        };
    });

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';

    if (candidato.length > 0) {
        candidato = candidato[0];

        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`;
        
        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.legenda}</div>`;
            }
            
        }
        
        lateral.innerHTML = fotosHtml;
    } else {
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');

    if(elNumero) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        };
    };
}

function branco() {
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'; 
    lateral.innerHTML = ''; 
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco) {
        votoConfirmado = true;
        console.log('Confirmando voto BRANCO...')
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        if (candidato.length <= 0) {
            numero = 'NULO'
        }
        console.log('Confirmando voto em', numero)
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual]) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante">FIM</div>'; 
            console.log(votos)
        }
    }
}

comecarEtapa();