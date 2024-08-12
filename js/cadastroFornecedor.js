export function initCadastroFornecedor() {
  $('#cep').on('blur', function () {
    const cep = $(this).val().replace(/\D/g, '');
    if (cep.length === 8) {
      $('#cep').val(cep.replace(/(\d{5})(\d{3})/, '$1-$2'));
      $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        if (!data.erro) {
          $('#endereco').val(`${data.logradouro}`);
          $('#Bairro').val(data.bairro);
          $('#Municipio').val(data.localidade);
          $('#Estado').val(data.uf);
        } else {
          alert('CEP não encontrado.');
        }
      });
    }
  });

    $('#cep').on('input', function () {
      const cep = $(this).val().replace(/\D/g, '');
      if (cep.length === 8) {
        $('#cep').val(cep.replace(/(\d{5})(\d{3})/, '$1-$2'));
      }
    });

    $('#cnpj').on('input', function() {
      var cnpj = $(this).val().replace(/\D/g, '');
      var formattedValue = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      $(this).val(formattedValue);
    });

    $('#telefone').on('input', function() {
      var telefone = $(this).val().replace(/\D/g, '');
      var formattedValue = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      $(this).val(formattedValue);
    });
}