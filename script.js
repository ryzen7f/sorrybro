const excuses = [
  { type: 'simples', text: 'Desculpa.' },
  { type: 'simples', text: 'Foi mal, me desculpa.' },
  { type: 'simples', text: 'Errei. Desculpa.' },
  { type: 'simples', text: 'Não foi minha intenção. Me perdoa.' },
  { type: 'simples', text: 'Peço desculpas pelo que aconteceu.' },
  { type: 'sinceras', text: 'Sinto muito por ter te magoado.' },
  { type: 'sinceras', text: 'Eu reconheço que errei e quero aprender com isso.' },
  { type: 'sinceras', text: 'Você não merecia passar por isso. Me desculpa.' },
  { type: 'sinceras', text: 'Não quero inventar desculpas. Quero assumir meu erro.' },
  { type: 'sinceras', text: 'Sei que palavras não resolvem tudo, mas meu pedido é sincero.' },
  { type: 'carinhosas', text: 'Me desculpa, você é muito importante para mim.' },
  { type: 'carinhosas', text: 'Eu queria ter feito diferente. Espero que possa me perdoar.' },
  { type: 'carinhosas', text: 'Sua amizade significa muito para mim. Desculpa.' },
  { type: 'carinhosas', text: 'Não queria te deixar triste. Me perdoa?' },
  { type: 'carinhosas', text: 'Gosto muito de você e sinto muito pelo que fiz.' },
  { type: 'dramaticas', text: 'DESCULPA! MIL VEZES DESCULPA!' },
  { type: 'dramaticas', text: 'Um milhão de desculpas ainda parece pouco!' },
  { type: 'dramaticas', text: 'Venho humildemente pedir o perdão de sua majestade.' },
  { type: 'dramaticas', text: 'Que os registros da história anotem meu arrependimento!' },
  { type: 'dramaticas', text: 'DESCULPA, DESCULPA, DESCULPA!!!' },
  { type: 'engracadas', text: 'Foi mal, meu cérebro estava em modo avião.' },
  { type: 'engracadas', text: 'Peço perdão: meu juízo saiu para tomar água.' },
  { type: 'engracadas', text: 'Desculpa, prometo atualizar meu sistema operacional.' },
  { type: 'engracadas', text: 'Errei rude. Posso reiniciar e tentar de novo?' }
];

const grid = document.querySelector('#excuseGrid');
const count = document.querySelector('#count');
const filterButtons = document.querySelectorAll('.filter');
const randomButton = document.querySelector('#randomBtn');

function render(filter = 'todas') {
  const visible = filter === 'todas' ? excuses : excuses.filter(item => item.type === filter);
  grid.replaceChildren();
  count.textContent = `${visible.length} ${visible.length === 1 ? 'desculpa' : 'desculpas'}`;

  if (!visible.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'Nenhuma desculpa encontrada.';
    grid.append(empty);
    return;
  }

  visible.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'excuse-card';
    card.style.animationDelay = `${index * 35}ms`;

    const phrase = document.createElement('p');
    phrase.className = 'excuse-text';
    phrase.textContent = item.text;

    const bottom = document.createElement('div');
    bottom.className = 'card-bottom';

    const category = document.createElement('span');
    category.className = 'category';
    category.textContent = item.type;

    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'copy-button';
    copy.textContent = 'Copiar';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(item.text);
        copy.textContent = 'Copiado!';
      } catch {
        copy.textContent = 'Selecione o texto';
      }
      window.setTimeout(() => { copy.textContent = 'Copiar'; }, 1400);
    });

    bottom.append(category, copy);
    card.append(phrase, bottom);
    grid.append(card);
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    render(button.dataset.filter);
  });
});

randomButton.addEventListener('click', () => {
  const item = excuses[Math.floor(Math.random() * excuses.length)];
  filterButtons.forEach(button => button.classList.toggle('active', button.dataset.filter === 'todas'));
  render('todas');
  const cards = [...grid.querySelectorAll('.excuse-card')];
  const chosen = cards.find(card => card.querySelector('.excuse-text').textContent === item.text);
  if (chosen) {
    chosen.scrollIntoView({ behavior: 'smooth', block: 'center' });
    chosen.classList.add('highlight');
    chosen.style.borderColor = '#d6a4ff';
    chosen.style.boxShadow = '0 0 24px rgba(199,125,255,.45)';
  }
});

render();
