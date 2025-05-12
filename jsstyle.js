function generateQRCode(data) {
    const qrContainer = document.getElementById("qrcode");

    // Limpa qualquer QR Code gerado anteriormente
    qrContainer.innerHTML = "";

    // Gera o QR Code
    new QRCode(qrContainer, {
        text: data,
        width: 200,
        height: 200,
        colorDark: "#000",
        colorLight: "#fff"
    });
}

function openModal(event) {
    event.preventDefault(); // Previne comportamento padrão do botão
    const modal = document.getElementById("qrModal");
    
    // Gera o QR Code com a URL atual
    const data = window.location.href;
    generateQRCode(data);

    // Mostra o modal
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("qrModal");
    modal.style.display = "none";
}

// Evento ao clicar no botão QR Code
document.querySelector(".buttonqrcode").addEventListener("click", openModal);

// Evento para fechar o modal ao clicar no "x"
document.querySelector(".close").addEventListener("click", closeModal);

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener("click", function(event) {
    const modal = document.getElementById("qrModal");
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById('cpf').addEventListener('input', function() {
    this.value = formatCPF(this.value);
});

function formatCPF(value) {
    value = value.replace(/\D/g, '');
    
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    return value;
};
function verificarSenha() {
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmar-senha").value;
    var mensagem = document.getElementById("mensagem");
    var button = document.querySelector("button");

    if (senha !== confirmarSenha) {
        mensagem.classList.add("error");
        mensagem.classList.remove("success");
        mensagem.style.color='red';
        mensagem.innerHTML = "Senhas incorretas!";
        button.disabled = true;
    } else {
        mensagem.classList.add("success");
        mensagem.style.color = "green";
        mensagem.classList.remove("error");
        mensagem.innerHTML = "Senhas corretas.";
        button.disabled = false;
    }
};

function togglePasswordVisibility(id) {
    var input = document.getElementById(id);
    var eyeIcon = document.getElementById('eye-icon-' + id);

    if (input.type === "password") {
        input.type = "text";
        eyeIcon.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
        input.type = "password";
        eyeIcon.innerHTML = '<i class="bi bi-eye"></i>';
    }
};
// Carregar os dados assim que a página for carregada
window.onload = carregarDados;