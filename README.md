# Simulador de Financiamento Imobiliário

Simulador que calcula parcelas de financiamento de imóveis usando os dois sistemas de amortização mais usados no mercado brasileiro: **Tabela Price** e **SAC**. Também avalia se a simulação seria aprovada, com base na regra de que a parcela não pode ultrapassar 30% da renda mensal.

## 🎯 Sobre o projeto

Você informa o valor do imóvel, sua renda mensal, quantos anos quer financiar, a taxa de juros anual e o valor de entrada (ou marca a opção sem entrada). O simulador calcula:

- Valor financiado (imóvel menos entrada)
- Valor da primeira e da última parcela
- Total pago ao final do financiamento
- Se a simulação seria aprovada ou reprovada

## 🏦 Sistemas de amortização

**Tabela Price** — parcelas fixas do início ao fim. Mais previsível pro orçamento, mas o total pago em juros costuma ser maior.

**SAC** — amortização constante, parcelas decrescentes (começam mais altas e vão caindo). No geral, paga-se menos juros no total comparado à Price.

O usuário escolhe qual sistema simular.

## 🧮 Como o cálculo funciona

A taxa de juros é informada em % ao ano e convertida internamente pra taxa mensal equivalente (juros compostos):

taxa mensal = (1 + taxa anual) ^ (1/12) - 1

**Price:**

parcela = valor financiado × [i × (1+i)^n] / [(1+i)^n - 1]

**SAC:**

amortização = valor financiado / número de parcelas
parcela = amortização + (saldo devedor × taxa mensal)

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (flexbox, responsivo)
- JavaScript vanilla (sem frameworks/dependências)

## 🚀 Como usar

```bash
git clone https://github.com/alissonbatalha/financiamento-imobiliario.git
cd financiamento-imobiliario
# Abrir index.html no navegador, não precisa de build

📁 Estrutura

financiamento-imobiliario/
├── index.html
├── style.css
├── script.js
├── predio.jpg
└── README.md

✅ Regra de aprovação
A primeira parcela do financiamento não pode ultrapassar 30% da renda mensal informada. Essa é a regra usada pela maioria dos bancos brasileiros na análise de crédito imobiliário (comprometimento de renda).
🔄 Possíveis melhorias futuras
[ ] Gráfico comparativo Price vs SAC
[ ] Exportar simulação em PDF
[ ] Simulação com correção monetária (TR, IPCA)
[ ] Histórico de simulações (localStorage)
[ ] Comparar com financiamentos de diferentes bancos


Desenvolvido por Alisson Batalha
