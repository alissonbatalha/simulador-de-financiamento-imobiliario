const btnCalcula = document.querySelector('#calcular');

let labelEntrada = document.querySelector('.label-entrada');
let semEntrada = document.querySelector('input#sem-entrada');
let entrada = document.querySelector('input#entrada');


semEntrada.addEventListener('click', (event) => {
    event.preventDefault;

    labelEntrada.classList.toggle('hidden');
    entrada.classList.toggle('hidden');
    entrada.value = "";
  });

btnCalcula.addEventListener('click', (event) => {
  event.preventDefault();
  

  let valorImovel = document.querySelector('input#valor-imovel');
  let valorImovelValue = Number(valorImovel.value);

  let rendaMensal = document.querySelector('input#renda-mensal');
  let rendaMensalValue = Number(rendaMensal.value);

  let duracao = document.querySelector('input#duracao');
  let duracaoValue = Number(duracao.value);

  let labelEntrada = document.querySelector('.label-entrada');
  let entrada = document.querySelector('input#entrada');
  const entradaValue = Number(entrada.value);
  let semEntrada = document.querySelector('input#sem-entrada');

  const resultado = document.querySelector(".resultado");
  const resumoValor = document.querySelector('#resumo-valor');
  const resumoRenda = document.querySelector('#resumo-renda');
  const resumoDuracao = document.querySelector('#resumo-duracao');
  const resumoEntrada = document.querySelector('#resumo-entrada');
  const resumoFinanciamento = document.querySelector('#resumo-financiamento');
  const resumoDecisao = document.querySelector('#resumo-decisao');
  const resumoBtn = document.querySelector('#resumo-btn');


  if (entradaValue > 0) {
    valorImovelValue -= entradaValue;
  }

  let tercoDoSalario = (rendaMensalValue / 100) * 30;

  const quantidadeParcelas = duracaoValue * 12;

  let valorParcelas = valorImovelValue / quantidadeParcelas;

  let jurosMensais = (valorParcelas / 100) * 50;

  let parcelaComTaxa = valorParcelas + jurosMensais;

  if (parcelaComTaxa >= tercoDoSalario) {
    resumoDecisao.style.backgroundColor = '#c94949';
    resumoDecisao.style.color = '#f1e8e8';
    resumoDecisao.innerText = 'REPROVADO';
  } else {
    resumoDecisao.style.backgroundColor = '#00bf00';
    resumoDecisao.style.color = '#080808';
    resumoDecisao.innerText = 'APROVADO';
  }
	
	
  resultado.classList.add('ativo');

  console.table(`${valorImovel.value}, ${quantidadeParcelas}, ${valorParcelas} ,${parcelaComTaxa}, ${tercoDoSalario}, ${parcelaComTaxa * duracaoValue}`);

  resumoValor.innerHTML = ` R$ ${valorImovelValue + entradaValue},00`;
  resumoRenda.innerHTML = ` R$ ${rendaMensalValue},00`;
  resumoDuracao.innerHTML = ` ${quantidadeParcelas} meses (${duracaoValue} anos)`;
  resumoEntrada.innerHTML = ` R$ ${entradaValue},00`;
  resumoFinanciamento.innerHTML = ` ${quantidadeParcelas} parcelas de R$ ${parcelaComTaxa.toFixed(2).replace('.', ',')}`;
 //resumoDecisao.innerHTML += ` `;
 
	resumoBtn.addEventListener('click', (event) => {
		event.preventDefault(); 
		
		resultado.classList.remove('ativo');
		valorImovel.value= "";
		rendaMensal.value= "";
		entrada.value = "";
		duracao.value = "";
		entrada.value = "";
		
	});
	
});