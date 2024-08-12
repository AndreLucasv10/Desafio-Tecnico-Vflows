export function initAnexos() {
  const $listaAnexos = $('#lista-anexos');
  let anexos = [];

  $('#input-anexos').on('change', function () {
    const files = Array.from(this.files);
    anexos = anexos.concat(files);

    $listaAnexos.empty();
    anexos.forEach((file, index) => {
      const $listItem = $('<li>');
      const url = URL.createObjectURL(file);
      
      const $visualizarBtn = $('<button class="btn btn-info">').text('Visualizar').on('click', function () {
        const a = $('<a>').attr('href', url).attr('download', file.name).get(0);
        a.click();
      });
      
      localStorage.setItem(file.name, url);
      
      const $excluirBtn = $('<button class="btn btn-danger">').text('Excluir').on('click', function () {
        anexos.splice(index, 1);
        $listItem.remove();
        localStorage.removeItem(file.name);
        URL.revokeObjectURL(url);
      });

      $listItem.append($visualizarBtn).append($excluirBtn).append($('<span>').text(file.name));
      $listaAnexos.append($listItem);
    });
  });
} 

export function getAnexos() {
  const anexos = [];
  for (let i = 0; i < localStorage.length; i++) {
    const indice = i;
    const name = localStorage.key(i);
    const url = localStorage.getItem(name);
    anexos.push({ indice, name, url });
  }
  return anexos;
}