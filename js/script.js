// Elementos do formulário
const form = document.getElementById('form-financiamento');
const inputValorImovel = document.getElementById('valor-imovel');
const inputRendaMensal = document.getElementById('renda-mensal');
const inputDuracao = document.getElementById('duracao');
const inputTaxaJuros = document.getElementById('taxa-juros');
const inputEntrada = document.getElementById('entrada');
const inputSemEntrada = document.getElementById('sem-entrada');
const selectSistema = document.getElementById('sistema');
const labelEntrada = document.querySelector('.label-entrada');

// Elementos do resultado
const resultado = document.getElementById('resultado');
const resumoValor = document.getElementById('resumo-valor');
const resumoRenda = document.getElementById('resumo-renda');
const resumoDuracao = document.getElementById('resumo-duracao');
const resumoEntrada = document.getElementById('resumo-entrada');
const resumoFinanciado = document.getElementById('resumo-financiado');
const resumoSistema = document.getElementById('resumo-sistema');
const resumoPrimeiraParcela = document.getElementById('resumo-primeira-parcela');
const resumoUltimaParcela = document.getElementById('resumo-ultima-parcela');
const resumoTotal = document.getElementById('resumo-total');
const resumoDecisao = document.getElementById('resumo-decisao');
const resumoBtn = document.getElementById('resumo-btn');

// Formatar valor em Real brasileiro
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

// Limpar mensagens de erro
function limparErros() {
  document.querySelectorAll('.erro').forEach(el => el.textContent = '');
}

// Mostrar erro em campo específico
function mostrarErro(campoId, mensagem) {
  const erroEl = document.getElementById(`erro-${campoId}`);
  if (erroEl) erroEl.textContent = mensagem;
}

// Validar todos os campos do formulário
function validarFormulario(dados) {
  limparErros();
  let valido = true;

  if (!dados.valorImovel || dados.valorImovel <= 0) {
    mostrarErro('valor-imovel', 'Informe um valor válido para o imóvel');
    valido = false;
  }

  if (!dados.rendaMensal || dados.rendaMensal <= 0) {
    mostrarErro('renda-mensal', 'Informe uma renda mensal válida');
    valido = false;
  }

  if (!dados.duracao || dados.duracao <= 0 || dados.duracao > 35) {
    mostrarErro('duracao', 'Duração deve ser entre 1 e 35 anos');
    valido = false;
  }

  if (!dados.taxaJuros || dados.taxaJuros <= 0 || dados.taxaJuros > 30) {
    mostrarErro('taxa-juros', 'Taxa de juros deve ser entre 0.1% e 30%');
    valido = false;
  }

  if (dados.entrada < 0) {
    mostrarErro('entrada', 'Valor da entrada não pode ser negativo');
    valido = false;
  }

  if (dados.entrada >= dados.valorImovel) {
    mostrarErro('entrada', 'Entrada não pode ser maior ou igual ao valor do imóvel');
    valido = false;
  }

  return valido;
}

// Calcular Tabela Price (parcelas fixas)
function calcularPrice(valorFinanciado, taxaMensal, numParcelas) {
  const parcelaFixa = valorFinanciado * 
    (taxaMensal * Math.pow(1 + taxaMensal, numParcelas)) / 
    (Math.pow(1 + taxaMensal, numParcelas) - 1);

  return {
    primeiraParcela: parcelaFixa,
    ultimaParcela: parcelaFixa,
    totalPago: parcelaFixa * numParcelas,
  };
}

// Calcular SAC (amortização constante, parcelas decrescentes)
function calcularSAC(valorFinanciado, taxaMensal, numParcelas) {
  const amortizacaoConstante = valorFinanciado / numParcelas;
  
  const primeiraParcela = amortizacaoConstante + (valorFinanciado * taxaMensal);
  
  const saldoDevedorFinal = valorFinanciado - (amortizacaoConstante * (numParcelas - 1));
  const ultimaParcela = amortizacaoConstante + (saldoDevedorFinal * taxaMensal);

  // Soma todas as parcelas pra saber o total pago
  let totalPago = 0;
  let saldoDevedor = valorFinanciado;
  
  for (let i = 0; i < numParcelas; i++) {
    const juros = saldoDevedor * taxaMensal;
    const parcela = amortizacaoConstante + juros;
    totalPago += parcela;
    saldoDevedor -= amortizacaoConstante;
  }

  return { primeiraParcela, ultimaParcela, totalPago };
}

// Coletar dados do formulário
function coletarDados() {
  const semEntrada = inputSemEntrada.checked;

  return {
    valorImovel: Number(inputValorImovel.value),
    rendaMensal: Number(inputRendaMensal.value),
    duracao: Number(inputDuracao.value),
    taxaJuros: Number(inputTaxaJuros.value),
    entrada: semEntrada ? 0 : Number(inputEntrada.value || 0),
    sistema: selectSistema.value,
  };
}

// Processar e exibir resultado
function processarSimulacao(event) {
  event.preventDefault();

  const dados = coletarDados();

  if (!validarFormulario(dados)) return;

  const valorFinanciado = dados.valorImovel - dados.entrada;
  const numParcelas = dados.duracao * 12;
  const taxaMensal = Math.pow(1 + dados.taxaJuros / 100, 1 / 12) - 1;

  const resultadoCalculo = dados.sistema === 'price'
    ? calcularPrice(valorFinanciado, taxaMensal, numParcelas)
    : calcularSAC(valorFinanciado, taxaMensal, numParcelas);

  // Regra de aprovação: parcela não pode passar de 30% da renda
  const limiteRenda = dados.rendaMensal * 0.3;
  const aprovado = resultadoCalculo.primeiraParcela <= limiteRenda;

  exibirResultado(dados, valorFinanciado, numParcelas, resultadoCalculo, aprovado);
}

// Atualizar DOM com o resultado
function exibirResultado(dados, valorFinanciado, numParcelas, calculo, aprovado) {
  resumoValor.textContent = formatarMoeda(dados.valorImovel);
  resumoRenda.textContent = formatarMoeda(dados.rendaMensal);
  resumoDuracao.textContent = `${numParcelas} meses (${dados.duracao} anos)`;
  resumoEntrada.textContent = formatarMoeda(dados.entrada);
  resumoFinanciado.textContent = formatarMoeda(valorFinanciado);
  resumoSistema.textContent = dados.sistema === 'price' ? 'Tabela Price' : 'SAC';
  resumoPrimeiraParcela.textContent = formatarMoeda(calculo.primeiraParcela);
  resumoUltimaParcela.textContent = formatarMoeda(calculo.ultimaParcela);
  resumoTotal.textContent = formatarMoeda(calculo.totalPago);

  resumoDecisao.textContent = aprovado ? 'APROVADO' : 'REPROVADO';
  resumoDecisao.className = aprovado ? 'aprovado' : 'reprovado';

  resultado.classList.add('ativo');
}

// Resetar formulário para nova simulação
function resetarFormulario() {
  form.reset();
  resultado.classList.remove('ativo');
  limparErros();
  labelEntrada.classList.remove('hidden');
  inputEntrada.classList.remove('hidden');
}

// Toggle campo de entrada
inputSemEntrada.addEventListener('change', () => {
  labelEntrada.classList.toggle('hidden');
  inputEntrada.classList.toggle('hidden');
  inputEntrada.value = '';
});

form.addEventListener('submit', processarSimulacao);
resumoBtn.addEventListener('click', resetarFormulario);