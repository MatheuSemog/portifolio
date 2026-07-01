/* ==========
   Constantes
========== */

const themeToggle = document.getElementById("themeToggle");

const modal = document.getElementById("modal");
const carouselImage = document.getElementById("carouselImage");
const title = document.getElementById("projectTitle");
const desc = document.getElementById("projectDescription");
const techsContainer = document.getElementById("projectTechs");

const contactForm = document.querySelector(".contact-form");
const copyWhatsapp = document.getElementById("copyWhatsapp");

const icons = {
    HTML: "devicon-html5-plain colored",
    CSS: "devicon-css3-plain colored",
    JavaScript: "devicon-javascript-plain colored",
    PHP: "devicon-php-plain colored",
    Python: "devicon-python-plain colored",
    Flask: "devicon-flask-original",
    CSharp: "devicon-csharp-plain colored",
    Dart: "devicon-dart-plain colored",
    Flutter: "devicon-flutter-plain colored",
    Kotlin: "devicon-kotlin-plain colored",
    Swift: "devicon-swift-plain colored",
    MySQL: "devicon-mysql-original colored"
};

let imagens = [];
let indice = 0;


/* ==========
   Funções
========== */

// Alterna entre tema claro e escuro
function alterarTema() {

    if(themeToggle.checked){

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            "theme",
            "dark"
        );

    }else{

        document.documentElement.removeAttribute(
            "data-theme"
        );

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}

// Realiza uma rolagem suave até a seção correspondente
function rolarSuave(event) {

    event.preventDefault(); 
    
    const destino = document.querySelector(event.currentTarget.getAttribute('href'));
    
    destino.scrollIntoView({
        behavior: 'smooth'
    });
}


// Duplica os itens das habilidades para criar o efeito de rolagem infinita
function duplicarSkills() {
    document.querySelectorAll(".skills-track").forEach(track => {
        track.innerHTML += track.innerHTML;
    });
}

// Atualiza a imagem exibida no carrossel do modal
function atualizarImagem() {
    carouselImage.src = imagens[indice];
}

// Abre o modal e carrega as informações do projeto selecionado
function abrirModal(card) {
    title.textContent = card.dataset.title;
    desc.textContent = card.dataset.description;

    techsContainer.innerHTML = "";

    const techs = card.dataset.techs.split(",");

    techs.forEach(tech => {
        const item = document.createElement("div");
        item.classList.add("tech");

        const icon = document.createElement("i");
        icon.className = icons[tech.trim()] || "";

        const span = document.createElement("span");
        span.textContent = tech.trim();

        item.appendChild(icon);
        item.appendChild(span);

        techsContainer.appendChild(item);
    });

    imagens = card.dataset.images.split(",");
    indice = 0;

    atualizarImagem();

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Fecha o modal e libera a rolagem da página
function fecharModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

// Exibe a próxima imagem do carrossel
function proximaImagem() {
    indice++;

    if (indice >= imagens.length) {
        indice = 0;
    }

    atualizarImagem();
}

// Exibe a imagem anterior do carrossel
function imagemAnterior() {
    indice--;

    if (indice < 0) {
        indice = imagens.length - 1;
    }

    atualizarImagem();
}

// Realiza uma rolagem suave até a seção correspondente
function rolarSuavemente(link) {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// Copia o número de WhatsApp para a área de transferência
async function copiarWhatsapp() {
    const numero = "+55 (31) 98569-0131";

    try {
        await navigator.clipboard.writeText(numero);

        alert(`O número ${numero} foi copiado para sua área de transferência.`);
    } catch (error) {
        const input = document.createElement("input");

        input.value = numero;

        document.body.appendChild(input);

        input.select();

        document.execCommand("copy");

        document.body.removeChild(input);

        alert(`O número ${numero} foi copiado para sua área de transferência.`);
    }
}


/* ==========
   Eventos
========== */

/* ==========
   Inicialização do tema
========== */

const temaSalvo = localStorage.getItem("theme");

if(temaSalvo === "dark"){

    document.documentElement.setAttribute(
        "data-theme",
        "dark"
    );

    themeToggle.checked = true;

}

themeToggle.addEventListener(
    "change",
    alterarTema
);

// Inicializa o efeito de rolagem infinita das habilidades
duplicarSkills();

// Abre o modal ao clicar em um projeto
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        abrirModal(card);
    });
});

// Fecha o modal ao clicar fora dele
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});

// Fecha o modal ao clicar no botão de fechar
document.querySelector(".close").addEventListener("click", fecharModal);

// Avança para a próxima imagem do carrossel
document.querySelector(".next").addEventListener("click", proximaImagem);

// Retorna para a imagem anterior do carrossel
document.querySelector(".prev").addEventListener("click", imagemAnterior);

// Envia o formulário de contato
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    alert("Seu e-mail foi enviado com sucesso!");

    contactForm.reset();
});

// Aplica rolagem suave aos links do menu e aos botões da página inicial
document.querySelectorAll("nav a, .botoes a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        rolarSuavemente(link);
    });
});

// Copia o número de WhatsApp ao clicar no botão
copyWhatsapp.addEventListener("click", copiarWhatsapp);
