export function initAdicionarProdutos() {
  $('#btn-adicionar-linha').on('click', function () {
    const $row = $('<tr>').html(`
    <td>
      <input class="descricao-produto form-control" type="text" required placeholder="Nome do produto">
      <span class="error-message error-descricao-produto"></span>
    </td>
    <td>
      <div class="input-group">
        <input type="text" class="unidade-medida form-control" required placeholder="Unidade de medida">
        <div class="input-group-btn">
          <button type="button" class="btn-dropdown btn btn-primary">Action <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li><a href="#" data-value="M">M</a></li>
            <li><a href="#" data-value="L">L</a></li>
            <li><a href="#" data-value="Kg">Kg</a></li>
          </ul>
        </div>
        <span class="error-message error-unidade-medida"></span>
      </div>
    </td>
    <td>
      <input class="qtde-estoque form-control" type="number" required placeholder="Quantidade em estoque">
      <span class="error-message error-qtde-estoque"></span>
    </td>
    <td>
      <input class="valor-unitario form-control" type="number" required placeholder="Valor unitário">
      <span class="error-message error-valor-unitario"></span>
    </td>
    <td>
      <input class="valor-total form-control" type="number" readonly placeholder="Valor total">
      <span class="error-message error-valor-total"></span>
    </td>
    <td>
      <button type="button" class="btn btn-danger btn-sm btn-excluir">Excluir</button>
    </td>
    `);

    $row.find('.btn-dropdown').on('click', function() {
      $(this).siblings('.dropdown-menu').toggle();
    });

    $(document).on('click', function(event) {
      if (!$(event.target).closest('.input-group').length) {
        $('.dropdown-menu').hide();
      }
    });

    $row.find('.dropdown-menu a').on('click', function(event) {
      event.preventDefault();
      const selectedValue = $(this).data('value');
      $(this).closest('.input-group').find('.unidade-medida').val(selectedValue);
      $(this).closest('.dropdown-menu').hide();
    });

    $row.find('.btn-excluir').on('click', function () {
      if (getProdutos().length > 1) {
        $row.remove();
      } else {
        alert('Não é possível remover esta linha pois é obrigatório pelo menos um produto');
      }
    });

    // Event handler to calculate total value
    $row.find('input').on('input', function () {
      const $linha = $(this).closest('tr');
      const quantidade = parseFloat($linha.find('.qtde-estoque').val()) || 0;
      const valorUnitario = parseFloat($linha.find('.valor-unitario').val()) || 0;
      $linha.find('.valor-total').val((quantidade * valorUnitario).toFixed(2));
    });

    $('#tabela-produtos tbody').append($row);
  });

  $('#btn-adicionar-linha').trigger('click');
}

export function getProdutos() {
  const produtos = [];
  $('#tabela-produtos tbody tr').each(function () {
    const $linha = $(this);
    produtos.push({
      descricao: $linha.find('.descricao-produto').val().trim(),
      unidadeMedida: $linha.find('.unidade-medida').val().trim(),
      quantidadeEstoque: $linha.find('.qtde-estoque').val().trim(),
      valorUnitario: $linha.find('.valor-unitario').val().trim(),
      valorTotal: $linha.find('.valor-total').val().trim()
    });
  });
  return produtos;
}