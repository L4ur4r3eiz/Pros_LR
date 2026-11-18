// ==========================================
// 1. SEGURANÇA (HASH SHA-256)
// ==========================================
// Senha padrão atual: "admin" — troque pelo hash SHA-256 da sua senha
const SENHA_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

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
// 2. DIAGNÓSTICO DE DORES (4 REGRAS HUMANAS)
// ==========================================
const DORES_CONFIG = {
  sem_site: {
    fatoCurto: "Vi vocês no Google sem site próprio",
    problemaSolucao: {
      hamburgueria: "Hoje quem pesquisa vocês no Google não acha um cardápio direto pra pedir e acaba indo pro concorrente ou pro iFood. Uma página própria resolve isso deixando o cliente montar o pedido e mandar direto no seu WhatsApp.",
      doceria: "Hoje quem busca vocês no Google não vê uma vitrine organizada com sabores e tamanhos pra encomendar, e acaba desistindo antes de chamar. Uma página simples resolve isso deixando o cliente escolher e já mandar o pedido pronto.",
      petshop: "Hoje quem procura banho e tosa na região acha o perfil de vocês, mas não vê os serviços claros nem como agendar rápido. Uma página direta resolve isso mostrando tudo organizado e jogando o agendamento pronto pro seu WhatsApp.",
      estetica: "Hoje quem pesquisa vocês no Google não encontra uma página mostrando os procedimentos com clareza, o que faz muita gente desistir antes de pedir horário. Uma apresentação direta resolve isso e já traz a cliente sabendo o que quer agendar.",
      saude: "Hoje quem pesquisa o nome de vocês no Google não acha uma página profissional explicando os atendimentos, o que tira parte da confiança na primeira consulta. Uma página objetiva resolve isso e facilita o agendamento direto.",
      automotivo: "Hoje quem busca estética automotiva na região vê o nome de vocês, mas não acha os serviços explicados pra pedir orçamento rápido. Uma página direta resolve isso deixando o cliente marcar o que precisa pro carro.",
      outro: "Hoje quem pesquisa vocês no Google não encontra uma página própria mostrando o que vocês fazem, e muita gente fecha com quem passa mais estrutura logo de cara. Uma página direta resolve isso e traz o cliente pronto pro seu WhatsApp."
    }
  },
  so_linktree: {
    fatoCurto: "Vi o link da bio de vocês no Insta",
    problemaSolucao: {
      hamburgueria: "Aquele link só com botões soltos obriga o cliente a chamar e ficar perguntando preço e cardápio, o que esfria a venda na hora da fome. Um cardápio próprio resolve isso deixando ele escolher os lanches e mandar o pedido pronto.",
      doceria: "Aquele agregador de links não mostra fotos nem opções de encomenda, então o cliente precisa ficar esperando resposta pra saber valores. Uma vitrine direta resolve isso e já traz o pedido montado pro seu WhatsApp.",
      petshop: "Aquele link de botões na bio não explica os pacotes de banho e tosa, o que faz vocês perderem tempo respondendo a mesma dúvida toda hora. Uma página própria resolve isso e já traz o tutor pronto pra marcar horário.",
      estetica: "Aquela lista de links na bio não valoriza os procedimentos de vocês nem passa a estrutura que o espaço tem. Uma página própria resolve isso mostrando os serviços com clareza e facilitando o agendamento.",
      saude: "Aquele link genérico na bio não passa a credibilidade que um consultório precisa antes da primeira consulta. Uma página limpa resolve isso explicando os atendimentos e direcionando o paciente pro WhatsApp.",
      automotivo: "Aquela lista simples de links não explica os pacotes de cuidado automotivo, fazendo o cliente pedir orçamento no escuro ou desistir. Uma página própria resolve isso e já filtra o serviço que ele quer.",
      outro: "Aquele link com botões soltos na bio não mostra o valor do trabalho de vocês e faz o cliente chegar cheio de dúvidas básicas. Uma página própria resolve isso explicando tudo e trazendo o contato mais quente."
    }
  },
  site_fraco: {
    fatoCurto: "Abri o site de vocês pelo celular",
    problemaSolucao: {
      hamburgueria: "Ele demora pra carregar e dificulta achar os lanches no celular, o que faz muita gente desistir no meio do pedido. Ajustar isso com um cardápio leve e direto pro WhatsApp recupera essas vendas na hora.",
      doceria: "No celular a navegação fica confusa e não valoriza as fotos dos doces, o que segura encomendas que poderiam fechar rápido. Uma página leve e visual resolve isso e facilita o pedido direto.",
      petshop: "No celular as informações ficam espalhadas e o tutor não acha rápido como marcar banho ou consulta. Organizar isso numa página direta pro WhatsApp aumenta muito os agendamentos.",
      estetica: "O visual atual não acompanha a qualidade real do trabalho de vocês e dificulta achar os procedimentos no celular. Atualizar essa apresentação resolve isso e traz mais agendamentos direto no WhatsApp.",
      saude: "No celular a leitura fica cansativa e o botão de agendamento não fica evidente, o que faz pacientes desistirem antes de chamar. Uma estrutura mais limpa e direta resolve isso.",
      automotivo: "No celular o site atual não destaca bem os serviços e dificulta pedir orçamento rápido. Uma página moderna e direta pro WhatsApp resolve isso e filtra melhor os clientes.",
      outro: "No celular a navegação atual acaba atrapalhando quem quer contratar rápido e passa uma imagem abaixo do trabalho real de vocês. Uma estrutura mais limpa e direta resolve isso."
    }
  },
  atendimento_lento: {
    fatoCurto: "Notei que vocês atendem tudo manual",
    problemaSolucao: {
      hamburgueria: "Quando o cliente precisa esperar alguém mandar foto de cardápio no WhatsApp, metade desiste e pede em outro lugar. Um link próprio resolve isso deixando ele montar o pedido sozinho em segundos.",
      doceria: "Ficar mandando tabela e foto de sabor um por um toma tempo e atrasa o fechamento da encomenda. Uma vitrine simples resolve isso deixando o cliente escolher e já mandar tudo mastigado.",
      petshop: "Responder porte por porte e explicar cada banho manualmente toma muito tempo da equipe no balcão. Uma página onde o tutor já marca o porte e o serviço resolve isso.",
      estetica: "Explicar valor e duração de cada procedimento um por um no WhatsApp faz muita cliente esfriar antes de marcar. Uma página clara resolve isso e já traz ela pronta pro horário.",
      saude: "Responder dúvidas básicas sobre atendimento uma por uma atrasa o agendamento de novos pacientes. Uma página objetiva resolve isso e já direciona quem quer marcar.",
      automotivo: "Passar orçamento do zero pra cada mensagem toma tempo e muita gente só está curiosa. Um seletor simples de serviços resolve isso e já traz o cliente decidido.",
      outro: "Explicar todo o serviço do zero em cada conversa toma tempo e faz você perder clientes na espera. Uma página direta resolve isso deixando tudo claro antes de chamarem."
    }
  }
};

// ==========================================
// 3. DIREÇÃO DE ARTE POR NICHO (ESTÚDIO)
// ==========================================
let leads = JSON.parse(localStorage.getItem("prospecta_leads")) || [];
let leadSelecionado = null;

const NICHOS_CONFIG = {
  hamburgueria: {
    titulo: "Hamburgueria / Pizzaria / Delivery Gastronômico",
    publico: "Consumidores locais que buscam sabor artesanal, transparência nos ingredientes e agilidade para pedir pelo celular sem taxas de aplicativos.",
    conceitoCriativo: "Editorial Gastronômico Urbano: tratar o cardápio como uma publicação culinária contemporânea, substituindo o visual genérico de fast-food por fotografia macro dramática, tipografia condensada de impacto e ritmo de leitura em colunas.",
    direcaoArte: "Linguagem modular e editorial com alto contraste. Superfícies foscas profundas, linhas divisórias finas (1px), cantos retos ou levemente chanfrados (4px–6px) e total ausência de sombras neon ou gradientes artificiais.",
    tipografia: "Títulos em display condensado ou grotesco expressivo (ex: Syne ou Oswald) contrastando com sans-serif limpa (ex: Plus Jakarta Sans ou Inter) para ingredientes e valores.",
    secoesDetalhadas: `1. Header Compacto: Logotipo à esquerda, navegação mínima e indicador numérico discreto da sacola à direita.
2. Hero Section Assimétrica: Composição 60/40 com título editorial forte, proposta direta sobre pedido sem taxa de aplicativo e fotografia gastronômica sangrada.
3. Manifesto da Cozinha: Faixa horizontal alternada com numeração editorial (01, 02, 03) destacando preparo na hora e insumos.
4. Cardápio Interativo: Categorias em abas limpas, destaques com foto 4:5 e itens em linhas divisórias horizontais com controles táteis "+" e "-".
5. Barra de Checkout Fixa: Aparece ao adicionar itens, soma o total em tempo real, permite observação e dispara o pedido formatado para o WhatsApp.
6. Footer Completo: Horários, área de entrega e endereço.`,
    tratamentoImagens: "Fotografias gastronômicas naturais com iluminação lateral quente integradas ao grid, sem inventar avaliações falsas.",
    diferencialCriativo: "Comanda Digital Integrada ao Grid Editorial que compila itens, quantidades, observações e total direto para o WhatsApp."
  },
  doceria: {
    titulo: "Doceria / Confeitaria Artesanal",
    publico: "Clientes que valorizam confeitaria autoral, estética refinada para presentes e encomendas sob medida.",
    conceitoCriativo: "Lookbook de Confeitaria Editorial: estética inspirada em revistas de gastronomia, com espaço negativo generoso, tipografia serifada elegante e ritmo visual pausado.",
    direcaoArte: "Minimalismo sensorial em tons naturais (off-white, creme quente ou cacau profundo), bordas nítidas (2px–4px) e divisórias finas.",
    tipografia: "Serifada editorial para títulos (ex: Cormorant Garamond ou Playfair Display) pareada com DM Sans para descrições e preços.",
    secoesDetalhadas: `1. Header Editorial Limpo: Marca, navegação discreta e contador sutil da sacola.
2. Hero Section Modular: Fotografia macro vertical sobreposta parcialmente por bloco tipográfico limpo com CTA direto.
3. Vitrine Interativa: Cards verticais refinados com seleção de tamanho/quantidade ("+" e "-").
4. Módulo de Encomendas: Bloco contrastante explicando prazos, embalagens e retirada/entrega.
5. Barra de Resumo & Footer: Soma automática com envio formatado para o WhatsApp.`,
    tratamentoImagens: "Fotografia natural com luz difusa valorizando texturas de doces e bolos.",
    diferencialCriativo: "Montador de Caixa & Encomenda Sob Medida integrado à vitrine."
  },
  petshop: {
    titulo: "Pet Shop / Estética Animal & Clínica Veterinária",
    publico: "Tutores que tratam seus pets como família e buscam segurança, transparência e agendamento rápido.",
    conceitoCriativo: "Cuidado Contemporâneo & Clareza Funcional: fugir de sites infantis cheios de patinhas, adotando identidade acolhedora, limpa e organizada como um estúdio de bem-estar animal.",
    direcaoArte: "Design modular limpo com tons orgânicos suaves, cantos discretos (6px–8px) e hierarquia tipográfica clara.",
    tipografia: "Outfit ou Plus Jakarta Sans SemiBold para títulos + Inter para seletores e textos.",
    secoesDetalhadas: `1. Header Objetivo: Logo, navegação limpa e botão "Agendar Horário".
2. Hero Section Dividida: Headline sobre cuidado sem estresse, CTA principal e fotografia natural.
3. Configurador Interativo por Porte: Tutor escolhe porte (P, M, G) e marca serviços (Banho, Tosa, Hidratação, Consulta) em blocos selecionáveis.
4. Protocolo de Bem-Estar: 3 blocos numerados (01, 02, 03) sobre manejo e produtos.
5. FAQ Accordion & Footer: Dúvidas práticas + barra fixa de agendamento no WhatsApp.`,
    tratamentoImagens: "Fotografias naturais e expressivas de cães e gatos bem cuidados.",
    diferencialCriativo: "Simulador de Atendimento por Porte do Pet com disparo pronto para o WhatsApp."
  },
  estetica: {
    titulo: "Clínica de Estética / Salão / Barbearia / Estúdio",
    publico: "Clientes atentos à imagem pessoal, acabamento técnico e experiência exclusiva.",
    conceitoCriativo: "Direção Editorial de Estúdio Boutique: grids assimétricos, tipografia de alto contraste e ritmo visual sofisticado.",
    direcaoArte: "Minimalismo autoral com espaço negativo intencional, alternância de fundos claros/escuros, linhas finas e bordas retas (0px–4px).",
    tipografia: "Syne ou Montserrat Bold para títulos expressivos + Inter ou DM Sans para especificações.",
    secoesDetalhadas: `1. Header Minimalista: Marca limpa, links suaves e CTA "Reservar Horário".
2. Hero Section Assimétrica: Título de grande escala, fotografia vertical deslocada e CTA direto.
3. Menu Interativo de Procedimentos: Lista editorial com divisórias finas onde o cliente marca múltiplos procedimentos.
4. Galeria Arquitetônica: Módulos assimétricos do espaço e padrão de cuidado.
5. Barra de Pré-Reserva & Footer: Resumo dos procedimentos selecionados com envio direto pro WhatsApp.`,
    tratamentoImagens: "Fotografias editoriais limpas com recortes verticais e horizontais assimétricos.",
    diferencialCriativo: "Curadoria de Sessão Interativa combinando procedimentos direto para o WhatsApp."
  },
  saude: {
    titulo: "Consultório Odontológico / Psicologia / Clínica de Saúde",
    publico: "Pacientes que buscam acolhimento humanizado, clareza técnica e facilidade para agendar consulta.",
    conceitoCriativo: "Arquitetura Clínica Contemporânea: transmitir serenidade, rigor técnico e acolhimento.",
    direcaoArte: "Superfícies em tons naturais suaves (areia, branco gelo, cinza pedra), divisórias precisas e bordas discretas (4px).",
    tipografia: "Lora ou Plus Jakarta Sans para títulos + Inter para leitura confortável.",
    secoesDetalhadas: `1. Header Institucional Limpo: Identidade do consultório, navegação clara e botão "Agendar Consulta".
2. Hero Section de Autoridade Serena: Título focado em atendimento individualizado e fotografia natural.
3. Especialidades em Módulos: Cards explicativos com opção de selecionar o motivo da consulta.
4. Pilares do Atendimento: Escuta ativa e planejamento individualizado (sem números inventados).
5. FAQ & Localização: Dúvidas comuns e CTA direto para WhatsApp.`,
    tratamentoImagens: "Fotografias claras, naturais e acolhedoras.",
    diferencialCriativo: "Triagem Rápida de Primeira Consulta direcionando o assunto no WhatsApp."
  },
  automotivo: {
    titulo: "Estética Automotiva / Detailer / Oficina Especializada",
    publico: "Proprietários que buscam proteção, precisão técnica e transparência no orçamento.",
    conceitoCriativo: "Engenharia & Precisão Visual: estética industrial contemporânea com grids geométricos rigorosos.",
    direcaoArte: "Fundos escuros foscos ou grafite industrial, bordas finas (1px), cantos retos (2px–4px) e numeração técnica.",
    tipografia: "Space Grotesk ou Outfit Bold para títulos + Inter para especificações.",
    secoesDetalhadas: `1. Header Técnico: Logotipo, navegação enxuta e botão "Solicitar Orçamento".
2. Hero Section de Alto Contraste: Fotografia automotiva de detalhe, título técnico e CTA direto.
3. Configurador de Pacote Automotivo: Seleção de porte (Hatch, Sedan, SUV) + serviços (Lavagem, Polimento, Vitrificação, Higienização).
4. Processo Técnico em 4 Etapas: Inspeção, Descontaminação, Execução e Acabamento.
5. Barra de Orçamento & Footer: Envia veículo + serviços estruturados para o WhatsApp.`,
    tratamentoImagens: "Fotografias automotivas focadas em reflexo, acabamento interno e precisão.",
    diferencialCriativo: "Configurador de Serviço por Categoria de Veículo integrado ao WhatsApp."
  },
  outro: {
    titulo: "Negócio Local / Serviços Especializados",
    publico: "Clientes locais que procuram atendimento confiável, rápido e transparente.",
    conceitoCriativo: "Estúdio Digital Modular: layout editorial contemporâneo com grids assimétricos e hierarquia clara.",
    direcaoArte: "Alternância de fundos claros e escuros, bordas de 4px, linhas divisórias estruturais e zero aparência de template.",
    tipografia: "Plus Jakarta Sans Bold ou Syne para títulos + Inter para leitura fluida.",
    secoesDetalhadas: `1. Header Compacto: Logo, navegação enxuta e CTA direto.
2. Hero Section Assimétrica: Título específico sobre a solução entregue e CTA principal.
3. Serviços em Layout Modular: Blocos assimétricos com opção de selecionar itens de interesse.
4. Jornada de Atendimento: 3 passos numerados (01, 02, 03).
5. Conversão & Footer Completo: Chamada direta pro WhatsApp com os itens marcados.`,
    tratamentoImagens: "Fotografias naturais e profissionais coerentes com o segmento.",
    diferencialCriativo: "Seletor de Interesse Integrado ao WhatsApp."
  }
};

// ==========================================
// 4. GARIMPO NO GOOGLE (COM BAIRRO/REGIÃO)
// ==========================================
// ==========================================
// 4. GARIMPO DE ALTA EFICIÊNCIA NO GOOGLE
// ==========================================
function abrirBusca(tipo) {
  const nicho = document.getElementById("searchNicho").value.trim();
  const cidade = document.getElementById("searchCidade").value.trim();
  const bairro = document.getElementById("searchBairro").value.trim();

  if (!nicho || !cidade) {
    alert("Preencha pelo menos o Nicho e a Cidade!");
    return;
  }

  // Sem aspas rígidas na região para não cortar perfis que usam "SP" ou endereço da rua
  const local = bairro ? `${bairro} ${cidade}` : `${cidade}`;
  let query = "";

  if (tipo === "maps") {
    query = `https://www.google.com/maps/search/${encodeURIComponent(`${nicho} ${local}`)}`;
  } else if (tipo === "instagram.com") {
    // Busca perfis do nicho na região que já têm link de WhatsApp na bio (leads quentes sem site)
    const operador = `${nicho} ${local} site:instagram.com ("wa.me" OR "whatsapp" OR "agende" OR "delivery")`;
    query = `https://www.google.com/search?q=${encodeURIComponent(operador)}`;
  } else {
    // Busca agregadores de links (Linktree, Beacons, Bio) do nicho na região
    const operador = `${nicho} ${local} (site:linktr.ee OR site:beacons.ai OR site:bio.link)`;
    query = `https://www.google.com/search?q=${encodeURIComponent(operador)}`;
  }

  window.open(query, "_blank");
}

// ==========================================
// 5. GERENCIAMENTO DE LEADS
// ==========================================
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const novoLead = {
    id: Date.now(),
    nome: document.getElementById("leadNome").value.trim(),
    nichoKey: document.getElementById("leadNicho").value,
    dorKey: document.getElementById("leadDor").value,
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
      return `
      <div class="lead-item ${leadSelecionado && leadSelecionado.id === lead.id ? "active" : ""}">
        <div class="lead-info">
          <strong>${lead.nome}</strong>
          <span>${config.titulo} • ${lead.whatsapp}</span>
        </div>
        <div class="lead-actions">
          <button class="btn btn-primary btn-sm" onclick="selecionarLead(${lead.id})">Abrir</button>
          <button class="btn-danger" onclick="removerLead(${lead.id})">✕</button>
        </div>
      </div>
    `;
    })
    .join("");
}

// ==========================================
// 6. GERADOR DE ABORDAGEM HUMANA + PROMPT
// ==========================================
function selecionarLead(id) {
  leadSelecionado = leads.find((l) => l.id === id);
  if (!leadSelecionado) return;

  renderizarLeads();
  const box = document.getElementById("generatorBox");
  box.style.display = "block";
  document.getElementById("selectedLeadTitle").textContent = `Estratégia para: ${leadSelecionado.nome}`;

  const config = NICHOS_CONFIG[leadSelecionado.nichoKey] || NICHOS_CONFIG.outro;
  const segmentoCompleto = leadSelecionado.customNicho
    ? `${config.titulo} (Detalhe: ${leadSelecionado.customNicho})`
    : config.titulo;

  const paletaTexto = leadSelecionado.cor
    ? `Utilize prioritariamente as cores "${leadSelecionado.cor}" como identidade da marca, construindo uma paleta complementar com superfícies neutras, contrastes nítidos e uma cor de destaque estratégica para ações principais, sem gradientes gratuitos.`
    : `Desenvolva uma paleta de cores autoral e coerente com o universo de ${segmentoCompleto}, alternando fundos claros e escuros ou tons naturais com contraste elevado e uma cor de destaque pontual para CTAs.`;

  const promptTexto = `Atue como um Diretor de Arte Digital, Senior UI/UX Designer e Engenheiro Front-end Sênior de um estúdio de design premiado. Desenvolva uma Landing Page demonstrativa completa, responsiva (mobile-first) e totalmente funcional em Português (PT-BR) para a empresa "${leadSelecionado.nome}".

1. CONTEXTO E OBJETIVO ESTRATÉGICO
- Empresa: ${leadSelecionado.nome}
- Segmento: ${segmentoCompleto}
- Público-alvo: ${config.publico}
- Objetivo: Criar uma prévia visual e funcional de nível de estúdio que resolva a falha atual de presença digital da empresa e conduza o visitante até o envio de pedido/agendamento estruturado no WhatsApp (55${leadSelecionado.whatsapp}).

2. CONCEITO CRIATIVO E DIREÇÃO DE ARTE
- Conceito: ${config.conceitoCriativo}
- Direção visual: ${config.direcaoArte}
- Paleta: ${paletaTexto}
- Tipografia: ${config.tipografia}

3. ARQUITETURA E DESCRIÇÃO VISUAL DAS SEÇÕES
${config.secoesDetalhadas}

4. TRATAMENTO DE IMAGENS E DIFERENCIAL CRIATIVO
- Imagens: ${config.tratamentoImagens}
- Diferencial: ${config.diferencialCriativo}

5. CONVERSÃO WHATSAPP E RESPONSIVIDADE
- Todos os botões de conversão devem direcionar para https://wa.me/55${leadSelecionado.whatsapp} utilizando encodeURIComponent() com uma mensagem clara contendo os itens ou serviços escolhidos pelo visitante.
- Reorganize grids assimétricos e controles táteis para smartphones (áreas de toque mínimas de 44px).

6. PROIBIÇÕES ESTRITAS (FUJA DO DESIGN GENÉRICO DE IA)
- NÃO crie Hero Sections genéricas excessivamente centralizadas com efeitos luminosos aleatórios.
- NÃO repita o mesmo padrão de 3 ou 4 cards arredondados em todas as seções.
- NÃO transforme todos os botões em cápsulas, não use glassmorphism indiscriminado nem sombras pesadas.
- NÃO invente depoimentos, avaliações, estatísticas ou certificações fictícias sobre "${leadSelecionado.nome}".`;

  document.getElementById("outputPrompt").value = promptTexto;
  atualizarMensagens();
}

function atualizarMensagens() {
  if (!leadSelecionado) return;

  const dorObj = DORES_CONFIG[leadSelecionado.dorKey] || DORES_CONFIG.sem_site;
  const nichoKey = leadSelecionado.nichoKey || "outro";
  const textoDor = dorObj.problemaSolucao[nichoKey] || dorObj.problemaSolucao.outro;
  const detalheExtra = leadSelecionado.customNicho ? ` (${leadSelecionado.customNicho})` : "";

  // 1ª MENSAGEM: Regra dos 40 chars na 1ª linha, zero links, dor + solução, fecha com "é assim mesmo?"
  const msg1 = `${dorObj.fatoCurto}${detalheExtra}.

Oi, pessoal da ${leadSelecionado.nome}, tudo bem?

${textoDor}

Hoje vocês ainda dependem só do atendimento manual no WhatsApp, é assim mesmo?`;

  document.getElementById("outputMensagem").value = msg1;
  document.getElementById("btnAbrirWhats").href = `https://wa.me/55${leadSelecionado.whatsapp}?text=${encodeURIComponent(msg1)}`;

  // 2ª MENSAGEM: Para enviar SOMENTE depois que o cliente responder "sim / é assim mesmo"
  const linkPrevia = document.getElementById("previewLink").value.trim() || "[COLE O LINK DA PRÉVIA AQUI]";
  const msg2 = `Imaginei! Como eu trabalho montando páginas diretas pra resolver exatamente isso, fiz um rascunho rápido usando o nome de vocês pra te mostrar na prática como ficaria:

${linkPrevia}

Dá uma olhada pelo celular e me diz o que achou.`;

  document.getElementById("outputMensagemLink").value = msg2;
  document.getElementById("btnAbrirWhatsLink").href = `https://wa.me/55${leadSelecionado.whatsapp}?text=${encodeURIComponent(msg2)}`;
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