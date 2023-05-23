class Validacao {
  constructor() {
    this.containers = document.querySelectorAll(".container__translate");
    this.btns = document.querySelectorAll("[data-btn]");
    this.form = document.querySelector("[data-user]");
    this.end = document.querySelector("[data-end]");

    this.container0 = document.querySelector(".container");
    this.container1 = document.querySelector(".container__1");
    this.container2 = document.querySelector(".container__2");

    this.nome = document.querySelector("[data-nome]");
    this.sobrenome = document.querySelector("[data-sobrenome]");
    this.email = document.querySelector("[data-email]");
    this.CPF = document.querySelector("[data-cpf]");
    this.data = document.querySelector("[data-data]");
    this.telefone = document.querySelector("[data-telefone]");
    this.senha = document.querySelector("[data-senha]");
    this.senha2 = document.querySelector("[data-senha2]");
    this.generos = document.querySelectorAll("[data-radio]");

    this.CEP = document.querySelector("[data-cep]");
    this.rua = document.querySelector("[data-rua]");
    this.numero = document.querySelector("[data-numero]");
    this.complemento = document.querySelector("[data-complemento]");
    this.bairro = document.querySelector("[data-bairro]");
    this.estado = document.querySelector("[data-estado]");
    this.cidade = document.querySelector("[data-cidade]");

    this.form.addEventListener("change", () => this.ValidarForm());
    this.end.addEventListener("change", () => this.ValidarEndereco());
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => this.Translate());
    });
    this.ValidarForm();
    this.ValidarEndereco();
  }
  Translate() {
    this.containers.forEach((container) => {
      if (
        container.style.transform === "" ||
        container.style.transform === "translateY(0px)"
      ) {
        container.style.transform = "translateY(-100vh)";
        this.container0.style.height = "100vh";
        this.container1.style.height = "100vh";
        this.container2.style.display = "flex";
      } else if (container.style.transform === "translateY(-100vh)") {
        container.style.transform = "translateY(0)";
        this.container0.style.height = "100%";
        this.container1.style.height = "100%";
        this.container2.style.display = "none";
      }
    });
  }

  ValidarForm() {
    let Todos = false;
    let Senhas = false;
    let Radios = false;

    this.generos.forEach((genero) => {
      if (genero.checked) {
        Radios = true;
      }
    });

    if (
      this.nome.checkValidity() &&
      this.sobrenome.checkValidity() &&
      this.email.checkValidity() &&
      this.CPF.checkValidity() &&
      this.data.checkValidity() &&
      this.telefone.checkValidity()
    ) {
      Todos = true;
    }

    if (this.senha.value === this.senha2.value) {
      Senhas = true;
    }
    this.Desativar(Todos && Senhas && Radios);
  }
  ValidarEndereco() {
    let EnderecoV = false;
    let EstadoV = false;

    if (this.estado.selectedIndex !== -1) {
      EstadoV = true;
    }
    if (
      this.CEP.checkValidity() &&
      this.rua.checkValidity() &&
      this.numero.checkValidity() &&
      this.bairro.checkValidity() &&
      this.cidade.checkValidity()
    ) {
      EnderecoV = true;
    }

    this.Submit(EnderecoV && EstadoV);
  }
  Desativar(Usuario) {
    this.btns.forEach((btn) => {
      if (!Usuario) {
        btn.disabled = true;
        btn.classList.remove("ativado");
        this.form.addEventListener("submit", function (event) {
          event.preventDefault();
        });
      } else {
        btn.disabled = false;
        btn.classList.add("ativado");
      }
    });
  }

  Submit(Endereco) {
    const submit = document.querySelector("[data-submit]");
    if (!Endereco) {
      submit.disabled = true;
      submit.classList.remove("ativado");
      this.form.addEventListener("submit", function (event) {
        event.preventDefault();
      });
    } else {
      submit.disabled = false;
      submit.classList.add("ativado");
    }
  }
}

const formulario = new Validacao();
