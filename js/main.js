import { initCadastroFornecedor } from './cadastroFornecedor.js';
import { initAdicionarProdutos } from './adicionarProdutos.js';
import { initAnexos } from './anexos.js';
import { salvarFornecedor } from './salvarFornecedor.js';

$(document).ready(function () {
  localStorage.clear();

  $('#cadastro-fornecedor').load('./componentes/cadastroFornecedor.html', function() {
    initCadastroFornecedor();
  });
  
  $('#adicionar-produtos').load('./componentes/produtos.html', function() {
    initAdicionarProdutos();
  });
  
  $('#anexos').load('./componentes/anexos.html', function() {
    initAnexos();
  });

  $('#modal-loading').load('./componentes/modalLoading.html');
  
  salvarFornecedor();
});