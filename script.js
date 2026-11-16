// ==========================================
// 1. SEGURANÇA (HASH SHA-256)
// ==========================================
// Senha padrão atual: "admin" — troque pelo hash SHA-256 da sua senha
const SENHA_HASH = "8eea3923b79b693ffe33a8cbadbddc16a968e210bb4c2bbb32ccdf6b4968396c6";

async function gerarHash(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

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

// ==========================================
// 2. CONFIGURAÇÃO ESTRATÉGICA POR NICHO
// ==========================================
let leads = JSON.parse(localStorage.getItem("prospecta_leads")) || [];
let leadSelecionado = null;

const NICHOS_CONFIG = {
  hamburgueria: {
    titulo: "Hamburgueria / Pizzaria / Delivery Gastronômico",
    publico: "Consumidores locais que buscam praticidade, agilidade no pedido pelo celular e experiência gastronômica marcante.",
    direcaoArte: "Estética gastronômica contemporânea e envolvente, com atmosfera urbana/artesanal, contraste elevado para destacar fotografias de alimentos em alta resolução, iluminação quente e sensação de apetite imediato.",
    tipografia: "Títulos display com personalidade forte e impacto (ex: Oswald, Plus Jakarta Sans Bold ou Syne) combinados com fonte limpa e de leitura instantânea para preços e descrições (ex: Inter ou DM Sans).",
    arquitetura: `1. Header Flutuante Minimalista: Logotipo em destaque, links rápidos (Cardápio, Diferenciais, Localização) e badge interativo mostrando a quantidade de itens no carrinho.
2. Hero Section de Alto Impacto: Composição assimétrica com headline persuasiva focada no sabor artesanal, subtítulo curto, botão primário "Montar Meu Pedido" (scroll suave para o cardápio) e destaque visual fotográfico com profundidade.
3. Cardápio Interativo com Montagem de Pedido: Dividido por abas ou categorias claras (Destaques da Casa, Artesanais, Acompanhamentos, Bebidas). Cada card possui foto ilustrativa de alta qualidade, descrição sensorial dos ingredientes, preço legível e controles táteis de "+" e "-" com feedback visual imediato.
4. Barra de Checkout Fixa (Mobile & Desktop): Aparece dinamicamente assim que o cliente adiciona o primeiro item, exibindo subtotal em tempo real, campo opcional para observações (ex: ponto da carne/retirar ingrediente) e botão de conversão "Finalizar Pedido no WhatsApp".
5. Seção "Por que pedir direto conosco": Grid em bento-box destacando preparo na hora, entrega ágil e vantagem de pedir sem taxas extras de aplicativos.
6. Footer Completo: Horário de funcionamento, área de entrega, endereço e botão flutuante discreto do WhatsApp.`,
    diferencialCriativo: "Simulador de Pedido Instantâneo integrado à página: ao adicionar itens no cardápio, o sistema calcula automaticamente o valor total e compila um resumo formatado (itens, quantidades, observações e total) que abre diretamente o WhatsApp da empresa pronto para envio.",
    abordagem: "onde o cliente monta o pedido no celular e ele já chega mastigado no WhatsApp de vocês (sem taxa de aplicativo)"
  },

  doceria: {
    titulo: "Doceria / Confeitaria Artesanal",
    publico: "Clientes que buscam sobremesas gourmet, presentes afetivos e bolos/doces sob encomenda com apresentação impecável.",
    direcaoArte: "Estética sensorial, sofisticada e acolhedora, com composição editorial limpa, amplo uso de espaço negativo, bordas suaves, sombras difusas e destaque absoluto para texturas e detalhes dos doces.",
    tipografia: "Combinação editorial elegante entre serifada moderna para títulos (ex: Playfair Display ou Cormorant Garamond) e sans-serif geométrica limpa para descrições e preços (ex: Plus Jakarta Sans).",
    arquitetura: `1. Header Editorial Limpo: Identidade da marca centralizada ou alinhada à esquerda, navegação objetiva (Vitrine, Encomendas, Sobre, Contato) e botão de pedido rápido.
2. Hero Section Sensorial: Título emotivo destacando o preparo artesanal, subtítulo convidativo, CTA "Explorar Cardápio" e composição visual elegante com fotografia macro de confeitaria.
3. Vitrine Interativa de Sabores e Encomendas: Cards refinados com foto, descrição dos ingredientes selecionados, seleção de tamanho/unidade e botões "+" e "-" para montar uma sacola de pedido ou orçamento de festa.
4. Resumo Inteligente de Encomenda: Barra inferior discreta que soma os itens escolhidos e permite enviar o pedido estruturado direto para o WhatsApp.
5. Seção de Experiência & Encomendas Personalizadas: Explicação visual de como funciona o prazo de encomenda, embalagens para presente e retirada/entrega.
6. Footer Sofisticado: Horários de atendimento, endereço, links sociais e acesso direto ao WhatsApp.`,
    diferencialCriativo: "Montador de Caixa / Encomenda Personalizada com cálculo automático e envio direto para o WhatsApp, eliminando a troca demorada de tabelas em PDF no atendimento.",
    abordagem: "onde o cliente escolhe os doces e tamanhos e já manda o pedido pronto direto pro WhatsApp de vocês"
  },

  petshop: {
    titulo: "Pet Shop / Estética Animal & Clínica Veterinária",
    publico: "Tutores de pets que tratam seus animais como membros da família e priorizam segurança, carinho e transparência nos serviços.",
    direcaoArte: "Direção visual amigável, confiável e contemporânea, equilibrando limpeza clínica com calor humano, ícones personalizados, cards com cantos arredondados e hierarquia visual clara.",
    tipografia: "Fonte amigável e moderna com excelente legibilidade (ex: Plus Jakarta Sans ou Outfit para títulos + Inter para textos e seletores).",
    arquitetura: `1. Header Acolhedor e Objetivo: Logo, navegação (Serviços, Diferenciais, Dúvidas, Localização) e CTA direto "Agendar Horário".
2. Hero Section de Confiança: Título focado no bem-estar e cuidado sem estresse para o pet, subtítulo tranquilizador para o tutor, CTA principal e composição visual calorosa.
3. Configurador Interativo de Serviços Pet: O tutor seleciona o porte do pet (Pequeno, Médio, Grande) e marca os serviços desejados (Banho, Tosa Higiênica, Tosa na Tesoura, Hidratação, Consulta) em cards interativos com feedback visual.
4. Barra de Agendamento Rápido: Gera automaticamente o resumo do porte e serviços escolhidos e abre o WhatsApp com a solicitação de horário pronta.
5. Pilares de Cuidado (Diferenciais): Grid estruturado mostrando produtos hipoalergênicos, ambiente monitorado e manejo carinhoso.
6. Perguntas Frequentes (FAQ) em Accordion & Footer: Respostas rápidas sobre vacinas, tempo de banho e táxi dog, seguidas pelo rodapé com endereço e horário.`,
    diferencialCriativo: "Simulador de Atendimento por Porte do Pet: permite que o tutor selecione o tamanho do animal e combine serviços de estética ou saúde em segundos antes de chamar no WhatsApp.",
    abordagem: "onde o tutor escolhe o porte do pet, marca banho ou tosa e já manda o agendamento pronto pro WhatsApp de vocês"
  },

  estetica: {
    titulo: "Clínica de Estética / Salão / Barbearia / Estúdio",
    publico: "Público atento à imagem pessoal, autoestima e qualidade técnica, que valoriza ambientes modernos e agendamento sem burocracia.",
    direcaoArte: "Direção de arte de alto padrão, sofisticada e autoral, com grids assimétricos, microinterações fluidas, iluminação sutil, alto contraste e sensação de exclusividade de estúdio boutique.",
    tipografia: "Tipografia de alto contraste e elegância contemporânea (ex: Syne, Cormorant ou Montserrat SemiBold para títulos + Inter para leitura fluida).",
    arquitetura: `1. Header Minimalista Premium: Logotipo refinado, links de navegação suave e CTA "Reservar Horário".
2. Hero Section Editorial: Headline magnética focada em transformação e autoestima, subtítulo direto, CTA de agendamento e composição visual impactante com camadas e profundidade.
3. Menu Interativo de Procedimentos: Lista categorizada onde o cliente pode selecionar um ou mais serviços/procedimentos (com duração média e descrição clara do benefício) para montar seu atendimento.
4. Resumo de Reserva Direta: Barra ou card lateral que reúne os procedimentos marcados e envia a solicitação formatada direto para o WhatsApp da recepção.
5. Galeria Visual / Portfólio do Espaço: Grid moderno apresentando o ambiente, equipamentos e padrão de acabamento (usando imagens ilustrativas coerentes com o segmento, sem falsos resultados).
6. Protocolo de Atendimento & Footer: Passo a passo da experiência do cliente, endereço completo, horário e botão flutuante de WhatsApp.`,
    diferencialCriativo: "Monte Seu Atendimento: experiência interativa estilo boutique onde o visitante combina procedimentos e dispara a pré-reserva formatada direto para o WhatsApp.",
    abordagem: "onde o cliente vê os procedimentos, seleciona o que deseja fazer e já chama no WhatsApp com o agendamento pronto"
  },

  saude: {
    titulo: "Consultório Odontológico / Psicologia / Clínica de Saúde",
    publico: "Pacientes em busca de profissionais qualificados, acolhimento humanizado, clareza nos tratamentos e facilidade para agendar consulta.",
    direcaoArte: "Estética médica/terapêutica contemporânea, transmite serenidade, autoridade técnica e transparência. Uso inteligente de espaços em branco, superfícies limpas, bordas sutis e contraste impecável para leitura.",
    tipografia: "Combinação que equilibra autoridade e acolhimento (ex: Plus Jakarta Sans ou Lora para títulos + Inter para textos informativos).",
    arquitetura: `1. Header Institucional Limpo: Identidade do consultório/profissional, navegação clara (Tratamentos, Sobre, Dúvidas, Localização) e botão de destaque "Agendar Consulta".
2. Hero Section de Autoridade: Título focado em saúde, bem-estar e atendimento humanizado, descrição objetiva do propósito do consultório, CTA principal para WhatsApp e composição visual serena.
3. Especialidades e Tratamentos: Cards organizados em grid limpo, explicando de forma acessível cada especialidade, sintomas/indicações e como funciona a primeira avaliação.
4. Abordagem e Estrutura (Diferenciais): Seção que destaca atendimento individualizado, tecnologia/conforto do espaço e ética profissional (sem inventar números ou certificados).
5. FAQ Interativo (Accordion): Dúvidas comuns sobre primeira consulta, convênios/reembolso e preparo para o atendimento.
6. Seção Final de Agendamento & Footer: Chamada acolhedora para iniciar o atendimento pelo WhatsApp, endereço com referência e horários.`,
    diferencialCriativo: "Triagem Rápida de Primeira Consulta: seletor intuitivo onde o paciente escolhe a especialidade ou motivo do contato e inicia a conversa no WhatsApp já direcionado para o tipo de atendimento.",
    abordagem: "para transmitir ainda mais credibilidade no Google e facilitar o agendamento de pacientes direto no WhatsApp"
  },

  automotivo: {
    titulo: "Estética Automotiva / Detailer / Oficina Especializada",
    publico: "Proprietários de veículos apaixonados por carros ou que buscam proteção, valorização e manutenção confiável para seu automóvel.",
    direcaoArte: "Visual tecnológico, preciso e de alta performance, com superfícies escuras sofisticadas, detalhes metálicos ou luminosos sutis, grids geométricos e sensação de precisão técnica.",
    tipografia: "Tipografia geométrica forte e técnica para títulos (ex: Space Grotesk ou Outfit Bold) combinada com fonte limpa para especificações (ex: Inter).",
    arquitetura: `1. Header Técnico: Logotipo em destaque, links (Serviços, Pacotes, Processo, Contato) e CTA "Solicitar Orçamento".
2. Hero Section de Performance: Headline impactante sobre proteção, brilho e cuidado técnico automotivo, subtítulo objetivo, CTA direto e composição visual marcante.
3. Monte Seu Pacote Automotivo (Interativo): Checkboxes visuais onde o motorista escolhe o tipo de veículo (Hatch, Sedan, SUV/Picape) e marca os serviços desejados (Lavagem Detalhada, Polimento Técnico, Vitrificação, Higienização Interna).
4. Gerador de Orçamento WhatsApp: Compila o porte do veículo e os serviços escolhidos em uma mensagem técnica pronta para envio direto no WhatsApp.
5. Etapas do Processo Técnico: Linha do tempo visual mostrando inspeção, preparação, execução e acabamento final.
6. Footer Completo: Localização de fácil acesso, horário de funcionamento e canal rápido de WhatsApp.`,
    diferencialCriativo: "Configurador de Estética Automotiva: permite ao cliente selecionar a categoria do veículo e combinar serviços de detalhamento, gerando um pedido de orçamento estruturado no WhatsApp.",
    abordagem: "onde o cliente escolhe o tipo de carro, marca os serviços desejados e já manda o orçamento pronto no WhatsApp de vocês"
  },

  outro: {
    titulo: "Negócio Local / Prestação de Serviços Especializados",
    publico: "Clientes locais que pesquisam soluções confiáveis na região e preferem atendimento rápido e transparente pelo WhatsApp.",
    direcaoArte: "Design contemporâneo de estúdio digital, layout limpo em bento-grid, hierarquia visual forte, contraste equilibrado, microinterações sutis e foco total em clareza e conversão.",
    tipografia: "Combinação moderna e versátil (ex: Plus Jakarta Sans para títulos + Inter para textos e botões).",
    arquitetura: `1. Header Profissional: Logotipo, menu de navegação enxuto e botão de contato rápido.
2. Hero Section Estratégica: Headline clara comunicando a proposta de valor da empresa, subtítulo objetivo, CTA principal e composição visual moderna com camadas.
3. Apresentação dos Serviços / Soluções: Cards interativos detalhando o que a empresa resolve, com opção para o visitante selecionar os itens de interesse.
4. Diferenciais Competitivos: Grid destacando agilidade, atendimento personalizado, qualidade técnica e compromisso com o cliente.
5. Jornada de Atendimento (Como Funciona): 3 passos visuais simples (Contato -> Orçamento/Planejamento -> Execução).
6. Seção de Conversão & Footer: Chamada final persuasiva direcionando para o WhatsApp com mensagem pré-preenchida, endereço, horários e botão flutuante.`,
    diferencialCriativo: "Seletor Interativo de Interesse: o visitante marca exatamente qual serviço ou solução precisa antes de clicar no botão do WhatsApp, tornando o primeiro contato comercial muito mais objetivo.",
    abordagem: "para apresentar o trabalho de vocês com profissionalismo e levar clientes direto para o WhatsApp"
  }
};

// ==========================================
// 3. GARIMPO NO GOOGLE
// ==========================================
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

// ==========================================
// 4. GERENCIAMENTO DE LEADS (LOCALSTORAGE)
// ==========================================
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const novoLead = {
    id: Date.now(),
    nome: document.getElementById("leadNome").value.trim(),
    nichoKey: document.getElementById("leadNicho").value,
    customNicho: document.getElementById("leadCustomNicho").value.trim(),
    whatsapp: document.getElementById("leadWhatsapp").value.replace(/\D/g, ""),
    cor: document.getElementById("leadCor").value.trim()
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

// ==========================================
// 5. GERADOR DE PROMPT DE ALTO IMPACTO
// ==========================================
function selecionarLead(id) {
  leadSelecionado = leads.find((l) => l.id === id);
  if (!leadSelecionado) return;

  renderizarLeads();
  const box = document.getElementById("generatorBox");
  box.style.display = "block";
  document.getElementById("selectedLeadTitle").textContent = `Gerador para: ${leadSelecionado.nome}`;

  const config = NICHOS_CONFIG[leadSelecionado.nichoKey] || NICHOS_CONFIG.outro;
  const segmentoCompleto = leadSelecionado.customNicho
    ? `${config.titulo} — Especialidade/Foco: ${leadSelecionado.customNicho}`
    : config.titulo;

  const paletaInstrucao = leadSelecionado.cor
    ? `Utilize prioritariamente as cores "${leadSelecionado.cor}" como identidade principal da marca, construindo uma paleta complementar harmônica (cores de superfície, neutras de suporte e cor de destaque para CTAs) com contraste WCAG adequado.`
    : `Desenvolva uma paleta de cores autoral, harmônica e coerente com o segmento de ${segmentoCompleto}, equilibrando fundo, superfícies de cards, tipografia legível e uma cor de destaque estratégica para botões de conversão.`;

  const promptTexto = `Atue como um Diretor Criativo Digital e Engenheiro Front-end Sênior. Desenvolva uma Landing Page demonstrativa de alto impacto, responsiva (mobile-first) e totalmente funcional em Português (PT-BR) para a empresa "${leadSelecionado.nome}".

1. CONTEXTUALIZAÇÃO E OBJETIVO ESTRATÉGICO
- Empresa: ${leadSelecionado.nome}
- Segmento: ${segmentoCompleto}
- Público-alvo: ${config.publico}
- Objetivo comercial: Criar uma prévia visual e funcional de nível de estúdio que demonstre profissionalismo imediato, valorize a marca e converta visitantes em atendimentos diretos via WhatsApp (55${leadSelecionado.whatsapp}).

2. DIREÇÃO DE ARTE E IDENTIDADE VISUAL
- Personalidade visual: ${config.direcaoArte}
- Paleta de cores: ${paletaInstrucao}
- Tipografia: ${config.tipografia} Aplique hierarquia clara entre headlines, subtítulos, labels e corpo de texto.
- Composição: Utilize grids modernos (bento-grid ou assimétricos), espaçamento negativo generoso, camadas com profundidade sutil e zero aparência de template genérico.

3. ARQUITETURA E DESCRIÇÃO VISUAL DAS SEÇÕES
${config.arquitetura}

4. DIFERENCIAL CRIATIVO E INTERATIVIDADE
- ${config.diferencialCriativo}
- Recursos de UI/UX: Adicione microinterações suaves em botões e cards (hover/active states), transições fluidas, feedback visual imediato nas seleções do usuário e animações discretas ao rolar a página, sem comprometer a velocidade ou a usabilidade.

5. ESTRATÉGIA DE CONVERSÃO (WHATSAPP)
- Todos os fluxos de conversão devem direcionar para o número oficial https://wa.me/55${leadSelecionado.whatsapp} utilizando encodeURIComponent() para gerar uma mensagem clara, educada e já preenchida com as escolhas feitas pelo visitante na página.
- Posicione CTAs de forma natural ao longo da jornada, sem poluir a tela.

6. RESPONSIVIDADE E CRITÉRIOS DE QUALIDADE
- Reorganize grids, tipografia e navegação especialmente para smartphones (onde ocorre a maioria dos acessos via link de WhatsApp), garantindo áreas de toque confortáveis e leitura perfeita.
- Utilize código limpo, semântico e sem elementos quebrados.
- Utilize imagens ilustrativas de alta qualidade e coerentes com o segmento (via Unsplash ou placeholders elegantes), sem inventar depoimentos falsos, certificações inexistentes ou números fictícios sobre a empresa.`;

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