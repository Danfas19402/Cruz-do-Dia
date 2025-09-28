// Lista de bichos e números exemplo
const bichos = {
  "Galo": ["9852", "8952"],
  "Jacaré": ["9258", "2958", "2859", "8259"],
  "Touro": ["9582", "5982"],
  "Tigre": ["9285", "2985"],
  "Urso": ["9528", "5829"]
};

let cruzAtual = [];

// Função para exibir cruz
function mostrarCruz(numeros) {
  const grid = document.getElementById("cruzGrid");
  grid.innerHTML = "";
  numeros.forEach(num => {
    const div = document.createElement("div");
    div.classList.add("num");
    div.innerText = num;
    grid.appendChild(div);
  });
}

// Gerar cruz aleatória
function gerarCruz() {
  let numeros = [];
  while (numeros.length < 4) {
    let n = Math.floor(Math.random() * 10);
    if (!numeros.includes(n)) {
      numeros.push(n);
    }
  }
  cruzAtual = numeros;
  mostrarCruz(cruzAtual);
}

// Definir cruz manual
function definirCruzManual() {
  let n1 = parseInt(document.getElementById("n1").value);
  let n2 = parseInt(document.getElementById("n2").value);
  let n3 = parseInt(document.getElementById("n3").value);
  let n4 = parseInt(document.getElementById("n4").value);

  if ([n1, n2, n3, n4].some(isNaN)) {
    alert("Digite os 4 números para definir a cruz.");
    return;
  }

  cruzAtual = [n1, n2, n3, n4];
  mostrarCruz(cruzAtual);
}

// Limpar cruz
function limparCruz() {
  cruzAtual = [];
  mostrarCruz([]);
  document.getElementById("n1").value = "";
  document.getElementById("n2").value = "";
  document.getElementById("n3").value = "";
  document.getElementById("n4").value = "";
}

// Gera sugestões com base na cruz
function gerarSugestoes() {
  const lista = document.getElementById("listaBichos");
  lista.innerHTML = "";

  if (cruzAtual.length < 4) {
    alert("Defina a Cruz primeiro!");
    return;
  }

  // Combinações da cruz
  let combinacoes = [
    cruzAtual.join(""),
    cruzAtual.slice().reverse().join(""),
    cruzAtual[0] + "" + cruzAtual[2] + "" + cruzAtual[1] + "" + cruzAtual[3],
    cruzAtual[1] + "" + cruzAtual[0] + "" + cruzAtual[3] + "" + cruzAtual[2]
  ];

  // Primeiro mostra as combinações da cruz
  const blocoCruz = document.createElement("div");
  blocoCruz.classList.add("bicho");
  const tituloCruz = document.createElement("div");
  tituloCruz.classList.add("bicho-name");
  tituloCruz.innerText = "Números da Cruz";
  const btnsCruz = document.createElement("div");
  btnsCruz.classList.add("bicho-buttons");

  combinacoes.forEach(num => {
    const btn = document.createElement("button");
    btn.innerText = num;
    btnsCruz.appendChild(btn);
  });

  blocoCruz.appendChild(tituloCruz);
  blocoCruz.appendChild(btnsCruz);
  lista.appendChild(blocoCruz);

  // Depois mostra os bichos
  Object.entries(bichos).forEach(([nome, numeros]) => {
    const item = document.createElement("div");
    item.classList.add("bicho");

    const bichoName = document.createElement("div");
    bichoName.classList.add("bicho-name");
    bichoName.innerText = nome;

    const btns = document.createElement("div");
    btns.classList.add("bicho-buttons");

    numeros.forEach(num => {
      const btn = document.createElement("button");
      btn.innerText = num;
      btns.appendChild(btn);
    });

    item.appendChild(bichoName);
    item.appendChild(btns);
    lista.appendChild(item);
  });
}

// Limpar sugestões
function limparSugestoes() {
  document.getElementById("listaBichos").innerHTML = "";
}

// Gera cruz automática ao carregar
window.onload = gerarCruz;
