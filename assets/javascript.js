const messageContainer = document.getElementById('message-container');
const copyButton = document.getElementById('copy-button');
let totalPedido = 0;
const lanches = [
  { id: 1, nome: 'PRIME CLÁSSICO', preco: 16.00 },
  { id: 2, nome: 'PRIME BACON', preco: 20.00 },
  { id: 3, nome: 'PRIME BBQ', preco: 18.00 },
  { id: 4, nome: 'PRIME DUPLO', preco: 32.00 },
  { id: 5, nome: 'PRIME CHEDDAR', preco: 18.00 },
  { id: 6, nome: 'COCA-COLA LATA - 350ML', preco: 5.00 },
  { id: 7, nome: 'TUCHAUA GUARANÁ - 350ML', preco: 5.00 },
  { id: 8, nome: 'BACON', preco: 3.00 },
  { id: 9, nome: 'BLEND', preco: 6.00 },
  { id: 10, nome: 'MAIONESE', preco: 1.00 },
  { id: 11, nome: 'MAIONESE VERDE', preco: 1.00 },
];

let pedido = [];

function addLancheAoPedido(id) {
  let alert = document.getElementById('alert');
  alert.textContent = 'Item adicionado ao pedido';
  alert.style.display = 'block';
  setTimeout(() => alert.style.opacity = 1, 10);

  setTimeout(() => {
    alert.style.opacity = 0;
    setTimeout(() => {
      alert.textContent = '';
      alert.style.display = 'none';
    }, 2000);
  }, 2000);

  const lanche = lanches.find(lanche => lanche.id === id);
  pedido.push(lanche);
  addItemEmListaPedido();
}
function addItemEmListaPedido() {
  const lista = document.getElementById('lista-pedido');
  lista.innerHTML = '';
  pedido.forEach(lanche => {
    totalPedido += lanche.preco;
    const item = document.createElement('li');
    item.style.marginTop = '10px';
    item.textContent = `${lanche.nome} - R$ ${lanche.preco.toFixed(2)}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.classList.add('btn')
    removeBtn.classList.add('btn-danger')
    removeBtn.classList.add('btn-sm');
    removeBtn.style.marginLeft = '10px';
    removeBtn.onclick = function () {
      removerItemPedido(lanche.id);
    };
    item.appendChild(removeBtn);
    lista.appendChild(item);
  });

  let total = pedido.reduce((acc, lanche) => acc + lanche.preco, 0);
  let element = document.getElementById('total');
  element.textContent = `Total: R$ ${total.toFixed(2)}`;

}

function removerItemPedido(id) {
  const index = pedido.findIndex(pedido => pedido.id === id);
  if (index !== -1) {
    pedido.splice(index, 1);
  }
  addItemEmListaPedido();
}
function validarECopiar() {
  let nome = document.getElementById('nome').value;
  let obs = document.getElementById('obs').value;
  let endereco = document.getElementById('endereco').value;
  let referencia = document.getElementById('referencia').value;
  let formaPagamento = document.getElementById("forma_pagamento").value;
  let troco = document.getElementById('troco').value;
  let pedidoMsg = pedido.map(item => {
    return `${item.nome} - ${item.preco}\n`
  })
  let total = document.getElementById('total');
  // Formatação dos dados para cópia
  var mensagem = `Nome: ${nome}\nobs: ${obs}\nEndereço: ${endereco}\nReferência: ${referencia}\nForma de pagamento: ${formaPagamento}\nTroco: ${troco}\n\n\n----- pedido ---- \n${pedidoMsg}\nTotal ${totalPedido}`;
  navigator.clipboard.writeText(mensagem).then(function () {
    let alert = document.getElementById('alert');
    alert.textContent = 'Pedido copiado';
    alert.style.display = 'block';
    setTimeout(() => alert.style.opacity = 1, 10);

    setTimeout(() => {
      alert.style.opacity = 0;
      setTimeout(() => {
        alert.textContent = '';
        alert.style.display = 'none';
      }, 2000);
    }, 2000);
  }, function (err) {
    console.error('Erro ao copiar pedido:', err);
  });
}
