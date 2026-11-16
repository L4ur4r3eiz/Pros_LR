// Cole aqui o código SHA-256 gerado no Passo 1 (o exemplo abaixo é a senha "admin")
const SENHA_HASH = "eea3923b79b693ffe33a8cbadbddc16a968e210bb4c2bbb32ccdf6b4968396c6";

async function gerarHash(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Mantém desbloqueado na sessão atual do navegador
if (sessionStorage.getItem("prospecta_auth") === "ok") {
  document.getElementById("lockScreen").style.display = "none";
}

document.getElementById("unlockForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const digitada = document.getElementById("passwordInput").value;
  const hashDigitada = await gerarHash(digitada);

  if (hashDigitada === SENHA_HASH) {
    sessionStorage.setItem("prospecta_auth", "ok");
    document.getElementById("lockScreen").style.display = "none";
  } else {
    document.getElementById("lockError").textContent = "Senha incorreta.";
  }
});

let leads = JSON.parse(localStorage.getItem("prospecta_leads")) || [];
let leadSelecionado = null;

// Templates inteligentes por nicho
const NICHOS_CONFIG = {
  hamburgueria: {
    titulo: "Hamburgueria / Delivery",
    estilo: "visual apetitoso, fundo escuro moderno ou quente, fotos grandes em destaque e botões de ação vibrantes",
    secoes: `2. Cardápio Interativo: Categorias (Combos, Artesanais, Acompanhamentos, Bebidas) com foto, descrição e botões "+" e "-" para adicionar ao carrinho.
3. Carrinho Fixo no Rodapé: Mostra quantidade de itens, soma automática do valor total e botão "Finalizar Pedido no WhatsApp" que monta a mensagem detalhada com os itens escolhidos e abre o WhatsApp.
4. Diferenciais (entrega rápida, ingredientes frescos), avaliações de clientes e horário de funcionamento.`,
    abordagem: "onde o cliente monta o lanche e o pedido já chega mastigado no WhatsApp de vocês (sem taxa de aplicativo)"
  },
  doceria: {
    titulo: "Doceria / Confeitaria",
    estilo: "visual acolhedor, elegante e delicado, valorizando fotos de doces, bolos e sobremesas",
    secoes: `2. Vitrine de Sabores e Encomendas: Cards com fotos dos doces/bolos, opções de tamanho ou quantidade com botões "+" e "-" para montar o pedido.
3. Resumo do Pedido: Barra fixa inferior calculando o valor total e botão "Enviar Pedido / Orçamento no WhatsApp" já com os itens formatados.
4. Galeria de encomendas feitas, depoimentos de clientes e informações de entrega/retirada.`,
    abordagem: "onde o cliente escolhe os doces/bolos e já manda o pedido pronto direto pro WhatsApp de vocês"
  },
  petshop: {
    titulo: "Pet Shop / Clínica Veterinária",
    estilo: "visual amigável, confiável e limpo, transmitindo carinho e cuidado com os animais",
    secoes: `2. Seletor de Serviços Pet: Cards interativos onde o tutor pode marcar os serviços desejados (Banho, Tosa Higiênica, Tosa Completa, Consulta, Vacinas) e porte do pet (P, M, G), vendo o valor estimado.
3. Agendamento Rápido: Botão "Agendar pelo WhatsApp" que já envia os serviços marcados e o porte do pet prontos na mensagem.
4. Diferenciais (equipe carinhosa, produtos hipoalergênicos), avaliações de tutores e localização.`,
    abordagem: "onde o tutor escolhe o banho, tosa ou consulta e já manda o agendamento pronto pro WhatsApp de vocês"
  },
  estetica: {
    titulo: "Estética / Beleza / Barbearia",
    estilo: "visual sofisticado, moderno e de alto padrão, focado em autoestima e conversão",
    secoes: `2. Menu de Procedimentos: Lista interativa onde o cliente seleciona os serviços desejados (com duração e preço estimado) e visualiza o total.
3. Botão de Agendamento Inteligente: Ao clicar em "Agendar Horário no WhatsApp", abre a conversa com os procedimentos escolhidos já preenchidos.
4. Seção de resultados (antes e depois / portfólio), avaliações reais de clientes e endereço com horário de atendimento.`,
    abordagem: "onde o cliente vê os procedimentos, seleciona o que deseja e já chama no WhatsApp com o agendamento pronto"
  },
  saude: {
    titulo: "Saúde / Consultório",
    estilo: "visual limpo, profissional e de alta credibilidade, transmitindo segurança e acolhimento",
    secoes: `2. Especialidades e Tratamentos: Cards claros explicando cada atendimento e para quem é indicado.
3. Apresentação do Profissional / Clínica: Destaque para formação, experiência e estrutura do consultório.
4. Botões estratégicos de "Agendar Consulta pelo WhatsApp" com mensagem pré-preenchida, perguntas frequentes (FAQ) e localização.`,
    abordagem: "para transmitir ainda mais credibilidade no Google e facilitar o agendamento de pacientes direto no WhatsApp"
  },
  automotivo: {
    titulo: "Estética Automotiva / Oficina",
    estilo: "visual robusto, tecnológico e contrastante, destacando brilho, cuidado e precisão",
    secoes: `2. Monte seu Pacote: Checkboxes interativos para o cliente marcar os serviços (Lavagem Detalhada, Polimento, Higienização Interna, Vitrificação) e ver o orçamento estimado.
3. Botão "Solicitar Orçamento no WhatsApp" enviando os serviços marcados automaticamente.
4. Galeria de carros atendidos, diferenciais técnicos e avaliações de clientes.`,
    abordagem: "onde o cliente seleciona os serviços pro carro dele e já manda o orçamento pronto no WhatsApp de vocês"
  },
  outro: {
    titulo: "Negócio Local",
    estilo: "visual moderno, responsivo e de alta conversão, com hierarquia visual clara",
    secoes: `2. Catálogo de Serviços / Produtos: Apresentação clara das principais ofertas com opção de selecionar itens ou solicitar orçamento rápido.
3. Chamada para Ação (CTA): Botões diretos para o WhatsApp com mensagem pré-preenchida para acelerar o atendimento.
4. Diferenciais da empresa, prova social (depoimentos) e rodapé completo com localização e horário.`,
    abordagem: "para apresentar o trabalho de vocês com profissionalismo e levar clientes direto para o WhatsApp"
  }
};

// 1. Garimpo no Google com Search Operators
function abrirBusca(tipo) {
  const nicho = document.getElementById("searchNicho").value.trim();
  const cidade = document.getElementById("searchCidade").value.trim();

  if (!nicho || !cidade) {
    alert("Preencha o Nicho e a Cidade primeiro!");
    return;
  }

  let query = "";
  if (tipo === "maps") {
    query = `https://www.google.com/maps/search/${encodeURIComponent(nicho + " " + cidade)}`;
  } else {
    const operador = `"${nicho}" site:${tipo} "${cidade}"`;
    query = `https://www.google.com/search?q=${encodeURIComponent(operador)}`;
  }

  window.open(query, "_blank");
}

// 2. Salvar Lead no LocalStorage
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const novoLead = {
    id: Date.now(),
    nome: document.getElementById("leadNome").value.trim(),
    nichoKey: document.getElementById("leadNicho").value,
    customNicho: document.getElementById("leadCustomNicho").value.trim(),
    whatsapp: document.getElementById("leadWhatsapp").value.replace(/\D/g, ""),
    cor: document.getElementById("leadCor").value.trim() || "definida de acordo com o nicho, com alto contraste e legibilidade"
  };

  leads.unshift(novoLead);
  salvarStorage();
  renderizarLeads();
  selecionarLead(novoLead.id);
  this.reset();
});

function salvarStorage() {
  localStorage.setItem("prospecta_leads", JSON.stringify(leads));
}

function removerLead(id) {
  leads = leads.filter((l) => l.id !== id);
  salvarStorage();
  renderizarLeads();
  if (leadSelecionado && leadSelecionado.id === id) {
    document.getElementById("generatorBox").style.display = "none";
    leadSelecionado = null;
  }
}

// 3. Renderizar Lista de Leads
function renderizarLeads() {
  const lista = document.getElementById("leadsList");
  const count = document.getElementById("leadCount");
  count.textContent = leads.length;

  if (leads.length === 0) {
    lista.innerHTML = `<p class="empty-msg">Nenhum lead salvo ainda. Use a busca ao lado para começar.</p>`;
    return;
  }

  lista.innerHTML = leads
    .map((lead) => {
      const config = NICHOS_CONFIG[lead.nichoKey] || NICHOS_CONFIG.outro;
      const labelNicho = lead.customNicho || config.titulo;
      return `
      <div class="lead-item ${leadSelecionado && leadSelecionado.id === lead.id ? "active" : ""}">
        <div class="lead-info">
          <strong>${lead.nome}</strong>
          <span>${labelNicho} • WhatsApp: ${lead.whatsapp}</span>
        </div>
        <div class="lead-actions">
          <button class="btn btn-primary btn-sm" onclick="selecionarLead(${lead.id})">Gerar</button>
          <button class="btn-danger" onclick="removerLead(${lead.id})">✕</button>
        </div>
      </div>
    `;
    })
    .join("");
}

// 4. Gerar Prompt Universal por Nicho e Mensagem
function selecionarLead(id) {
  leadSelecionado = leads.find((l) => l.id === id);
  if (!leadSelecionado) return;

  renderizarLeads();
  const box = document.getElementById("generatorBox");
  box.style.display = "block";
  document.getElementById("selectedLeadTitle").textContent = `Gerador para: ${leadSelecionado.nome}`;

  const config = NICHOS_CONFIG[leadSelecionado.nichoKey] || NICHOS_CONFIG.outro;
  const descricaoNicho = leadSelecionado.customNicho
    ? `${config.titulo} (foco em: ${leadSelecionado.customNicho})`
    : config.titulo;

  const promptTexto = `Crie uma Landing Page completa, responsiva (mobile-first) e de alta conversão em Português (PT-BR) para a empresa "${leadSelecionado.nome}", do segmento de ${descricaoNicho}.

Direção Visual e Cores:
- Estilo: ${config.estilo}.
- Paleta de cores: ${leadSelecionado.cor}.

Estrutura e Funcionalidades Obrigatórias:
1. Hero Section: Título forte focado no benefício principal do cliente, subtítulo claro e botão de ação principal.
${config.secoes}
5. Integração WhatsApp: Todos os botões de fechamento/agendamento devem redirecionar para https://wa.me/55${leadSelecionado.whatsapp} já com o texto da mensagem codificado na URL (encodeURIComponent). Inclua também um botão flutuante discreto do WhatsApp no canto inferior.

Use textos persuasivos reais (sem Lorem Ipsum) adaptados ao nicho de ${descricaoNicho}.`;

  document.getElementById("outputPrompt").value = promptTexto;
  atualizarMensagem();
}

function atualizarMensagem() {
  if (!leadSelecionado) return;

  const config = NICHOS_CONFIG[leadSelecionado.nichoKey] || NICHOS_CONFIG.outro;
  const linkPrevia = document.getElementById("previewLink").value.trim() || "[COLE O LINK DA PRÉVIA AQUI]";

  const msg = `Oi, pessoal da ${leadSelecionado.nome}, tudo bem? Me chamo Laura!

Vi o perfil de vocês e achei o trabalho muito bom, mas reparei que vocês ainda não têm uma página própria ${config.abordagem}.

Tomei a liberdade de montar uma prévia funcional usando a marca de vocês — sem compromisso nenhum, só pra vocês verem como ficaria:
${linkPrevia}

Se curtirem a ideia, me avisem que eu explico como funciona para deixarmos ela 100% no ar com os dados certinhos de vocês!`;

  document.getElementById("outputMensagem").value = msg;

  const zapUrl = `https://wa.me/55${leadSelecionado.whatsapp}?text=${encodeURIComponent(msg)}`;
  document.getElementById("btnAbrirWhats").href = zapUrl;
}

function copiarTexto(elementId, btn) {
  const textarea = document.getElementById(elementId);
  textarea.select();
  navigator.clipboard.writeText(textarea.value);

  const textoOriginal = btn.textContent;
  btn.textContent = "✅ Copiado!";
  setTimeout(() => {
    btn.textContent = textoOriginal;
  }, 1500);
}

renderizarLeads();