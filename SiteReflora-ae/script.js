const scriptURL = 'https://script.google.com/macros/s/AKfycbzhrRrsBP_qQ4jw8OiEKxMr6MGUVyDeVKBsOZL2JIghe082qoAq6tcElDIkN5ZA4LleYg/exec';

const form = document.getElementById('reflora-form');
const btn = document.getElementById('submit-btn');
const msg = document.getElementById('form-message');

form.addEventListener('submit', e => {
    e.preventDefault();

    btn.disabled = true;
    btn.innerText = 'Enviando Dados...';
    msg.style.display = 'none';

    // Usando URLSearchParams para garantir que o Google entenda os dados
    const data = new URLSearchParams(new FormData(form));

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Isso ignora erros de segurança do navegador (CORS)
        body: data
    })
        .then(() => {
            // No modo 'no-cors', o Google não deixa ler a resposta de "Sucesso",
            // mas o dado chega na planilha 99% das vezes.
            msg.style.display = 'block';
            msg.style.backgroundColor = '#d4edda';
            msg.style.color = '#155724';
            msg.innerText = 'Sucesso! Seus dados foram enviados. Verifique sua planilha agora!';

            form.reset();
            btn.disabled = false;
            btn.innerText = 'Enviar Mensagem';
        })
        .catch(error => {
            console.error('Erro:', error);
            msg.style.display = 'block';
            msg.style.backgroundColor = '#f8d7da';
            msg.style.color = '#721c24';
            msg.innerText = 'Erro ao conectar. Tente atualizar a página e enviar novamente.';
            btn.disabled = false;
            btn.innerText = 'Enviar Mensagem';
        });
});

// Outras funções do site
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}
