import { getProdutos } from './adicionarProdutos.js';
import { getAnexos } from './anexos.js';

export function salvarFornecedor() {
  $('#btn-salvar-fornecedor').on('click', function () {
    const formData = {
      fornecedor: {
        razaoSocial: $('#razao-social').val(),
        nomeFantasia: $('#nome-fantasia').val(),
        cnpj: $('#cnpj').val(),
        inscricaoEstadual: $('#inscricao-estadual').val(),
        inscricaoMunicipal: $('#inscricao-municipal').val(),
        endereco: $('#endereco').val(),
        nomeContato: $('#nome-contato').val(),
        telefone: $('#telefone').val(),
        email: $('#email').val(),
      },
      produtos: getProdutos(),
      anexos: getAnexos()      
    };

    let jsonForm = JSON.stringify(formData, null, 2);
    let isValidAnexos = true;
    let isValidProdutos = true;
    let isValidFornecedor = true;
    const requiredFields = [
      { id: 'razao-social', errorId: 'error-razao-social' },
      { id: 'nome-fantasia', errorId: 'error-nome-fantasia' },
      { id: 'cnpj', errorId: 'error-cnpj' },
      { id: 'cep', errorId: 'error-cep' },
      { id: 'telefone', errorId: 'error-telefone' },
      { id: 'email', errorId: 'error-email' }
    ];

    requiredFields.forEach(field => {
      const input = $(`#${field.id}`);
      const errorSpan = $(`#${field.errorId}`);

      if (!input.val().trim()) {
        input.addClass('error');
        errorSpan.text('Campo obrigatório.');
        isValidFornecedor = false;
      } else {
        input.removeClass('error');
        errorSpan.text('');
      }
    });

    $('#tabela-produtos tbody tr').each(function () {
      const $linha = $(this);
      const descricao = $linha.find('.descricao-produto').val().trim();
      const unidadeMedida = $linha.find('.unidade-medida').val().trim();
      const qtdeEstoque = $linha.find('.qtde-estoque').val().trim();
      const valorUnitario = $linha.find('.valor-unitario').val().trim();

      if (!descricao || !unidadeMedida || !qtdeEstoque || !valorUnitario) {
        alert('Por favor, preencha todos os campos na tabela de produtos.');
        isValidProdutos = false;
        return false;
      }
    });

    if (!isValidFornecedor) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (localStorage.length === 0) {
      alert('Por favor, adicione pelo menos um anexo.');
      isValidAnexos = false;
      return false;
    }

    if (isValidFornecedor && isValidProdutos && isValidAnexos) {
      console.log(jsonForm);

      $('#loadingModal').fadeIn();

      setTimeout(function() {
        $('#loadingModal').fadeOut();
      }, 3000);
      }
  });
}