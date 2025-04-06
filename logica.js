function formatarCep(cep) {
  cep = cep.replace(/\D/g, "");
  if (cep.length > 5) {
    return cep.substring(0, 5) + "-" + cep.substring(5, 8);
  } else {
    return cep;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const cepInput = document.getElementById("cep");
  const searchBtn = document.getElementById("searchBtn");

  cepInput.addEventListener("input", function () {
    this.value = formatarCep(this.value);
  });

  cepInput.addEventListener("keypress", function (e) {
    const verificar = /[0-9-]/;
    if (!verificar.test(e.key)) {
      e.preventDefault();
    }
  });

  searchBtn.addEventListener("click", function () {
    const cepConsulta = cepInput.value.replace(/\D/g, "");
    if (cepConsulta.length !== 8) {
      alert("CEP inválido");
      return;
    }

    document.getElementById("logradouro").textContent = "";
    document.getElementById("localidade").textContent = "";
    document.getElementById("uf").textContent = "";

    fetch(`https://viacep.com.br/ws/${cepConsulta}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP não encontrado");
        } else {
          document.getElementById("logradouro").textContent = data.logradouro;
          document.getElementById("localidade").textContent = data.localidade;
          document.getElementById("uf").textContent = data.uf;
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao buscar o CEP");
      });
  });
});
