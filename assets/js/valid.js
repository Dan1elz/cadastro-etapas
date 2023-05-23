class Mascara {
  constructor(selector, formato) {
    this.element = document.querySelector(selector);
    this.formato = formato;

    this.element.addEventListener("keypress", this.aplicarMascara.bind(this));

    this.element.addEventListener("keypress", (e) => {
      this.ProbibirLetras(e);
    });
  }
  ProbibirLetras(e) {
    const ApenasNumeros = /[0-9]/;
    const teclas = String.fromCharCode(e.keyCode);

    if (!ApenasNumeros.test(teclas)) {
      e.preventDefault();
      return;
    }
  }
  aplicarMascara() {
    const length = this.element.value.length;

    if (this.formato === "XXX.XXX.XXX-XX") {
      if (length === 3 || length === 7) {
        this.element.value += ".";
      } else if (length === 11) {
        this.element.value += "-";
      }
    } else if (this.formato === "(XX) XXXX-XXXX") {
      if (length === 0) {
        this.element.value = "(" + this.element.value;
      } else if (length === 3) {
        this.element.value += ")";
      } else if (length === 9) {
        this.element.value += "-";
      }
    } else if (this.formato === "XXXXX-XXX") {
      if (length === 5) {
        this.element.value += "-";
      }
    }
  }
}

class ValidarCPF {
  constructor(cpfSelector) {
    this.cpf = document.querySelector(cpfSelector);

    this.cpf.addEventListener("keyup", () => {
      this.validacao();
    });
  }

  formatar(cpf) {
    const numeros = cpf.replace(/[-.]/g, "");

    if (numeros.length !== 11) {
      // console.log("Erro: CPF inválido");
      return null;
    }

    const digitos = Array.from(numeros, Number);
    return digitos;
  }

  primeiroDigito() {
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += this.cpfFormatado[i] * (10 - i);
    }

    const resto = (sum * 10) % 11;
    if (resto < 10) {
      return this.cpfFormatado[9] === resto;
    }
    return this.cpfFormatado[9] === 0;
  }

  segundoDigito() {
    let sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += this.cpfFormatado[i] * (11 - i);
    }

    const resto = (sum * 10) % 11;
    if (resto < 10) {
      return this.cpfFormatado[10] === resto;
    }
    return this.cpfFormatado[10] === 0;
  }

  verificarRepetidos() {
    const primeiro = this.cpfFormatado[0];

    for (let i = 1; i < this.cpfFormatado.length; i++) {
      if (this.cpfFormatado[i] !== primeiro) {
        return false;
      }
    }
    return true;
  }

  validacao() {
    this.cpfFormatado = this.formatar(this.cpf.value);
    const cpfAlert = document.querySelector("[data-invalid-cpf]");

    if (!this.cpfFormatado) {
      console.log("Erro: CPF inválido");
      cpfAlert.innerHTML = "CPF inválido";
      return false;
    }
    if (!this.primeiroDigito()) {
      console.log("Erro: Primeiro dígito verificador inválido");
      cpfAlert.innerHTML = "Primeiro dígito verificador inválido";
      return false;
    }
    if (!this.segundoDigito()) {
      console.log("Erro: Segundo dígito verificador inválido");
      cpfAlert.innerHTML = "Segundo dígito verificador inválido";
      return false;
    }
    if (this.verificarRepetidos()) {
      console.log("Erro: CPF possui dígitos repetidos");
      cpfAlert.innerHTML = "CPF possui dígitos repetidos";
      return false;
    }
    console.log("Valido");
    cpfAlert.innerHTML = "";
    return true;
  }
}

class BuscaCEP {
  constructor(formulario, cep, rua, cidade, bairro, estado) {
    this.formulario = document.querySelector(formulario);
    this.cep = document.querySelector(cep);
    this.rua = document.querySelector(rua);
    this.cidade = document.querySelector(cidade);
    this.bairro = document.querySelector(bairro);
    this.estado = document.querySelector(estado);

    this.cep.addEventListener("keyup", (e) => {
      this.formate(e);
    });
  }

  formate(e) {
    const Valor = e.target.value;
    let valorFormatado = "";

    if (Valor.length === 9) {
      valorFormatado = Valor.replace("-", "");
      this.PuxarEndereco(valorFormatado);
    }
  }

  async PuxarEndereco(cep) {
    this.Carregar();
    this.cep.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);
    console.log(data.erro);

    if (data.erro === true) {
      this.formulario.reset();
      this.Carregar();
      this.Mensagem("CEP Inválido, tente novamente.");
      return;
    }
    this.rua.value = data.logradouro;
    this.cidade.value = data.localidade;
    this.bairro.value = data.bairro;
    this.estado.value = data.uf;
    this.Carregar();
    this.Mensagem();
  }
  Carregar() {
    const IconeElement = document.querySelector("[data-load]");
    IconeElement.classList.toggle("carregando");
  }

  Mensagem(msg) {
    const MensagemTexto = document.querySelector("[data-cepalert]");
    if (!msg) {
      msg = "";
    }
    MensagemTexto.innerHTML = msg;
  }
}

const dados = new BuscaCEP(
  "[data-end]",
  "[data-cep]",
  "[data-rua]",
  "[data-cidade]",
  "[data-bairro]",
  "[data-estado]"
);

const cpf = new ValidarCPF("[data-cpf]");
const inputCPF = new Mascara("[data-cpf]", "XXX.XXX.XXX-XX");
const inputTell = new Mascara("[data-telefone]", "(XX) XXXX-XXXX");
const inputCEP = new Mascara("[data-cep]", "XXXXX-XXX");
