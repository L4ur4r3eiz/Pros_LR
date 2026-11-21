// ==========================================
// 1. SEGURANÇA (HASH SHA-256)
// ==========================================
// Senha padrão atual: "admin" — troque pelo hash SHA-256 da sua senha
const SENHA_HASH = "a3afbad90a2b5393c995bd8f924c15e2c4a1a2417cef029d2eef2d47c06612c6";

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
    label: "Ausência de site próprio (depende apenas de Maps/redes sociais)",
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
    label: "Uso exclusivo de agregador de links (Linktree/bio) sem experiência de marca",
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
    label: "Site atual lento, desatualizado ou com navegação ruim no celular",
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
    label: "Atendimento manual sem catálogo/triagem prévia no WhatsApp",
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
// 3. ARQUITETURA ESTRATÉGICA POR NICHO
// ==========================================
let leads = JSON.parse(localStorage.getItem("prospecta_leads")) || [];
let leadSelecionado = null;

const NICHOS_CONFIG = {
  hamburgueria: {
    titulo: "Hamburgueria / Pizzaria / Delivery Gastronômico",
    publico: "Consumidores locais que acessam majoritariamente pelo smartphone em momentos de decisão rápida, buscando clareza nos ingredientes, facilidade para personalizar itens e agilidade no pedido direto sem taxas de aplicativos.",
    direcaoArte: "Estética gastronômica contemporânea e editorial urbano. Superfícies foscas profundas (estilo carvão ou papel texturizado escuro) alternadas com blocos claros de respiro, linhas divisórias finas (1px), cantos definidos (border-radius máximo de 4px a 6px) e contraste elevado para destacar fotografias de alimentos.",
    tipografia: "Display condensado ou grotesco expressivo para títulos (ex: Syne ou Oswald) com tracking controlado, pareado com sans-serif de alta legibilidade (ex: Plus Jakarta Sans ou Inter) usando tabular-nums para valores.",
    arquitetura: `1. Header Compacto e Fixo: Logotipo da marca à esquerda, navegação por âncoras (Cardápio, Diferenciais, Horários e Localização) e indicador dinâmico da sacola de pedidos à direita.
2. Hero Section Assimétrica (60/40): Headline específica focada no preparo artesanal e pedido direto, subtítulo objetivo, botão primário "Montar Pedido" (rolagem suave até o cardápio) e fotografia gastronômica sangrada integrada ao layout.
3. Manifesto e Diferenciais da Cozinha: Faixa horizontal com alternância de superfície e numeração editorial (01, 02, 03) destacando preparo na hora, seleção de insumos e pedido direto sem intermediários.
4. Cardápio Interativo Categorizado: Filtro por categorias (Destaques, Lanches/Pratos Principais, Acompanhamentos, Bebidas). Combine itens principais com foto em proporção 4:5 e itens complementares em lista editorial com divisórias horizontais e controles táteis "+" e "-".
5. Gaveta / Barra de Checkout Dinâmica: Exibida na base da tela quando há itens selecionados, mostrando lista resumida, campo opcional de observações (ex: ponto da carne, retirar ingrediente), tipo de entrega (Entrega ou Retirada) e botão de conversão para o WhatsApp.
6. Informações de Funcionamento e Footer: Espaço estruturado para endereço, horários e área de atendimento com marcações provisórias claras ([INSERIR ENDEREÇO], [INSERIR HORÁRIO]).`,
    imagens: "Fotografias gastronômicas ilustrativas de alta qualidade com iluminação lateral quente e profundidade de campo natural, claramente tratadas como ilustrativas da categoria sem atribuir autoria falsa.",
    interatividade: `- Filtro de Categorias: Ao clicar em uma aba de categoria, o estado ativo muda visualmente e a lista exibe apenas os itens correspondentes (ou "Todos") sem recarregar a página.
- Controle de Carrinho em Memória: Clicar em "+" ou "-" atualiza um array de estado em JavaScript, recalcula instantaneamente a quantidade total no badge do header e o valor/resumo na barra inferior.
- Disparo para WhatsApp: Clicar em "Finalizar Pedido no WhatsApp" valida se há pelo menos 1 item, monta uma string formatada com itens, quantidades, observação e modalidade escolhida, codifica via encodeURIComponent() e abre https://wa.me/55{WHATSAPP}?text={MENSAGEM}.`
  },

  doceria: {
    titulo: "Doceria / Confeitaria Artesanal",
    publico: "Clientes que buscam sobremesas artesanais, presentes sofisticados e encomendas personalizadas para eventos, valorizando apresentação visual e praticidade na cotação.",
    direcaoArte: "Direção editorial sensorial e acolhedora. Fundos em tons naturais (off-white, creme quente ou cacau profundo), amplo espaço negativo, bordas nítidas (2px–4px), divisórias finas e composição inspirada em lookbooks gastronômicos.",
    tipografia: "Serifada editorial de alto contraste para títulos (ex: Cormorant Garamond ou Playfair Display) combinada com sans-serif humanista limpa (ex: DM Sans) para descrições e controles.",
    arquitetura: `1. Header Editorial Limpo: Identidade visual, links discretos (Vitrine, Sob Encomenda, Atendimento, Localização) e contador da sacola de encomendas.
2. Hero Section Modular: Fotografia macro vertical à direita sobreposta parcialmente por bloco tipográfico limpo à esquerda com proposta de valor e CTA "Explorar Vitrine".
3. Vitrine Interativa de Sabores e Encomendas: Layout assimétrico apresentando categorias (Pronta Entrega, Bolos & Tortas, Caixas Presente) com seleção de tamanho/quantidade ("+" e "-") integrada abaixo de cada item.
4. Módulo de Encomendas Sob Medida: Bloco horizontal explicando etapas de solicitação, personalização e retirada/entrega (usando placeholders para prazos e políticas reais).
5. Resumo Dinâmico de Encomenda & Footer: Barra inferior com os itens escolhidos, campo de data desejada e botão de envio direto ao WhatsApp, seguido pelo rodapé institucional.`,
    imagens: "Fotografias macro naturais com luz difusa valorizando texturas de confeitaria, alternando proporções verticais e quadradas integradas ao grid.",
    interatividade: `- Seleção de Variantes e Quantidade: Permite alternar opções de tamanho/caixa e ajustar quantidades, atualizando o estado da sacola em tempo real.
- Resumo de Encomenda: Compila itens escolhidos e data pretendida em mensagem estruturada via encodeURIComponent() para envio no WhatsApp.`
  },

  petshop: {
    titulo: "Pet Shop / Estética Animal & Clínica Veterinária",
    publico: "Tutores de cães e gatos que priorizam segurança, manejo carinhoso, transparência nos serviços e agilidade para agendar horários pelo celular.",
    direcaoArte: "Design modular contemporâneo e acolhedor, distante de clichês infantis. Superfícies limpas em tons orgânicos suaves com um ponto de contraste vibrante para ação, cantos discretos (6px–8px) e hierarquia clara.",
    tipografia: "Sans-serif geométrica amigável e firme para títulos (ex: Outfit ou Plus Jakarta Sans SemiBold) combinada com Inter para seletores e textos informativos.",
    arquitetura: `1. Header Objetivo: Logotipo, navegação limpa (Serviços, Banho & Tosa, Protocolo de Cuidado, Localização) e botão retangular "Agendar Horário".
2. Hero Section Dividida: Headline focada no bem-estar e atendimento sem estresse para o pet, subtítulo claro, CTA principal e fotografia natural integrada à composição.
3. Configurador Interativo de Serviços & Banho e Tosa: Fluxo guiado em etapas na própria página — (1) seleção do porte do pet (Pequeno, Médio, Grande), (2) seleção múltipla de serviços (Banho, Tosa Higiênica, Tosa na Tesoura, Hidratação, Consulta/Vacinas) e (3) campo opcional para nome/raça do pet.
4. Protocolo de Bem-Estar & Estrutura: 3 blocos horizontais numerados (01, 02, 03) detalhando cuidados com higiene, produtos adequados e manejo individualizado, além de espaço reservado para apresentação da equipe ([INSERIR EQUIPE/VETERINÁRIO]).
5. Galeria Ilustrativa, FAQ em Accordion & Footer: Respostas rápidas sobre carteira de vacinação e horários, localização ([INSERIR ENDEREÇO]) e barra fixa de agendamento no WhatsApp.`,
    imagens: "Fotografias naturais e expressivas de cães e gatos bem cuidados em ambiente limpo, sem apresentar imagens ilustrativas como clientes reais.",
    interatividade: `- Configurador de Porte e Serviços: Clicar em um porte marca o estado ativo (radio visual); clicar nos cards de serviço alterna seleção múltipla (checkbox visual) e atualiza imediatamente o resumo inferior.
- Agendamento via WhatsApp: Valida a escolha de pelo menos 1 serviço, monta a mensagem com porte, nome do pet e serviços marcados usando encodeURIComponent() e abre o WhatsApp.`
  },

  estetica: {
    titulo: "Clínica de Estética / Salão / Barbearia / Estúdio",
    publico: "Clientes atentos à imagem pessoal, acabamento técnico e atendimento exclusivo, que buscam conhecer os procedimentos e reservar horários sem burocracia.",
    direcaoArte: "Direção editorial de estúdio boutique. Grids assimétricos, amplo espaço negativo, alternância equilibrada de superfícies claras e escuras, divisórias finas (1px) e bordas retas ou discretas (0px–4px).",
    tipografia: "Tipografia expressiva de alto contraste para títulos (ex: Syne, Cormorant Garamond ou Montserrat Bold) pareada com Inter ou DM Sans para descrições técnicas.",
    arquitetura: `1. Header Minimalista: Identidade visual limpa, links de âncora suaves (Procedimentos, Espaço, Atendimento, Contato) e CTA retangular "Pré-Reservar Horário".
2. Hero Section Editorial Assimétrica: Título de grande escala com quebra intencional, fotografia vertical deslocada no grid, proposta de valor objetiva e CTA direto.
3. Menu Interativo de Procedimentos & Pré-Reserva: Lista categorizada (Facial, Corporal, Cabelo/Barba/Estúdio conforme especialidade) com linhas divisórias finas onde o visitante pode selecionar um ou mais procedimentos desejados.
4. Galeria Visual do Ambiente & Padrão Técnico: Módulos assimétricos apresentando a atmosfera de cuidado e equipamentos (imagens ilustrativas coerentes, sem falsos resultados de "antes e depois").
5. Informações de Atendimento & Barra de Pré-Reserva: Seção clara para endereço, horários ([INSERIR ENDEREÇO E HORÁRIOS]) e resumo dinâmico dos procedimentos selecionados com envio formatado ao WhatsApp.`,
    imagens: "Fotografias editoriais com luz natural ou controlada, recortes verticais e horizontais assimétricos integrados à composição.",
    interatividade: `- Seleção Múltipla de Procedimentos: Ao clicar em um procedimento, o item recebe estado visual selecionado e é adicionado ao resumo de pré-reserva.
- Pré-Reserva WhatsApp: Compila os procedimentos escolhidos e preferência de turno (Manhã/Tarde/Noite) em link wa.me codificado com encodeURIComponent().`
  },

  saude: {
    titulo: "Consultório Odontológico / Psicologia / Clínica de Saúde",
    publico: "Pacientes que buscam acolhimento humanizado, clareza técnica sobre especialidades e facilidade para agendar uma primeira avaliação com confiança.",
    direcaoArte: "Arquitetura clínica contemporânea. Superfícies em tons naturais suaves (areia, branco gelo, cinza pedra), tipografia de alta legibilidade, divisórias precisas e bordas discretas (4px), transmitindo serenidade e rigor ético.",
    tipografia: "Serifada humanista ou sans-serif editorial para títulos (ex: Lora ou Plus Jakarta Sans) combinada com Inter para leitura acessível.",
    arquitetura: `1. Header Institucional Limpo: Identidade da clínica/consultório, navegação clara (Especialidades, Abordagem, Profissionais, Dúvidas, Localização) e botão "Agendar Consulta".
2. Hero Section de Autoridade Serena: Título focado em cuidado individualizado e saúde, descrição objetiva, CTA principal para WhatsApp e fotografia natural acolhedora.
3. Especialidades & Triagem de Atendimento: Módulos organizados explicando cada área de atuação, permitindo ao paciente selecionar qual especialidade ou motivo de consulta procura.
4. Abordagem Clínica & Espaço para Corpo Clínico: Blocos explicando o fluxo de acolhimento e avaliação, além de card estruturado pronto para inserir dados reais do profissional responsável ([INSERIR NOME E REGISTRO PROFISSIONAL]).
5. FAQ Interativo (Accordion) & Localização: Dúvidas práticas sobre primeira consulta, endereço ([INSERIR ENDEREÇO]) e botão de agendamento direto no WhatsApp.`,
    imagens: "Fotografias claras, naturais e acolhedoras que transmitam confiança, sem simular pacientes ou profissionais reais.",
    interatividade: `- Seletor de Especialidade / Triagem: Permite ao paciente escolher a área de interesse e modalidade (Presencial ou Online, se aplicável), atualizando o botão de agendamento.
- Accordion de FAQ & WhatsApp: Expansão suave das perguntas frequentes e disparo de mensagem pré-estruturada via wa.me com encodeURIComponent().`
  },

  automotivo: {
    titulo: "Estética Automotiva / Detailer / Oficina Especializada",
    publico: "Proprietários de veículos que buscam proteção, precisão técnica e transparência para solicitar orçamentos rápidos pelo celular.",
    direcaoArte: "Engenharia & precisão visual. Fundos escuros foscos ou grafite industrial delimitados por bordas finas (1px), cantos retos (2px–4px), numeração técnica e contraste elevado.",
    tipografia: "Sans-serif geométrica técnica para títulos (ex: Space Grotesk ou Outfit Bold) combinada com Inter para especificações.",
    arquitetura: `1. Header Técnico: Logotipo em destaque, links rápidos (Serviços, Configurador, Processo, Localização) e botão "Solicitar Orçamento".
2. Hero Section de Alto Contraste: Fotografia automotiva de detalhe, título técnico objetivo, proposta de valor e CTA direto para o configurador.
3. Configurador Interativo por Porte de Veículo: Fluxo em 2 etapas — (1) seleção da categoria do veículo (Hatch, Sedan, SUV/Picape) e (2) seleção múltipla de serviços (Lavagem Detalhada, Polimento Técnico, Vitrificação, Higienização Interna).
4. Processo Técnico em 4 Etapas Numeradas: Inspeção, Preparação, Execução e Acabamento apresentados em sequência modular.
5. Barra de Orçamento & Footer: Compila categoria do veículo + serviços escolhidos em mensagem pronta para WhatsApp, com espaço para endereço e horários ([INSERIR DADOS]).`,
    imagens: "Fotografias automotivas focadas em reflexo, acabamento e precisão técnica integradas ao grid.",
    interatividade: `- Configurador Veículo + Serviços: Atualiza em tempo real a categoria selecionada e a lista de serviços marcados, habilitando o resumo de orçamento.
- Envio para WhatsApp: Gera link wa.me com a especificação completa codificada via encodeURIComponent().`
  },

  outro: {
    titulo: "Negócio Local / Serviços Especializados",
    publico: "Clientes locais que procuram atendimento confiável, rápido e transparente na região.",
    direcaoArte: "Design modular contemporâneo com alternância equilibrada de superfícies claras e escuras, bordas definidas (4px), linhas divisórias estruturais e hierarquia tipográfica clara.",
    tipografia: "Plus Jakarta Sans Bold ou Syne para títulos expressivos pareada com Inter para leitura fluida.",
    arquitetura: `1. Header Compacto: Logotipo, navegação enxuta (Serviços, Como Funciona, Dúvidas, Contato) e CTA direto.
2. Hero Section Assimétrica: Título específico comunicando a proposta de valor da empresa, subtítulo objetivo, CTA principal e composição visual forte.
3. Apresentação Interativa de Serviços: Módulos assimétricos detalhando os serviços com opção para o visitante marcar os itens de interesse.
4. Processo de Atendimento & Diferenciais: Sequência numerada (01, 02, 03) mostrando como funciona o atendimento do contato à entrega.
5. Conversão & Footer Completo: Resumo dos itens selecionados com disparo direto para o WhatsApp e campos marcados para endereço e horários ([INSERIR ENDEREÇO E HORÁRIO]).`,
    imagens: "Fotografias naturais e profissionais coerentes com o segmento, tratadas como ilustrativas sem atribuir autoria falsa.",
    interatividade: `- Seletor de Interesse: Permite marcar um ou mais serviços e atualizar o resumo de contato.
- Integração WhatsApp: Constrói mensagem dinâmica com os itens selecionados usando encodeURIComponent() e abre wa.me.`
  }
};

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

  const local = bairro ? `${bairro} ${cidade}` : `${cidade}`;
  let query = "";

  if (tipo === "maps") {
    query = `https://www.google.com/maps/search/${encodeURIComponent(`${nicho} ${local}`)}`;
  } else if (tipo === "instagram.com") {
    const operador = `${nicho} ${local} site:instagram.com ("wa.me" OR "whatsapp" OR "agende" OR "delivery")`;
    query = `https://www.google.com/search?q=${encodeURIComponent(operador)}`;
  } else {
    const operador = `${nicho} ${local} (site:linktr.ee OR site:beacons.ai OR site:bio.link)`;
    query = `https://www.google.com/search?q=${encodeURIComponent(operador)}`;
  }

  window.open(query, "_blank");
}

// ==========================================
// 5. GERENCIAMENTO DE LEADS (LOCALSTORAGE)
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
// 6. GERADOR DE PROMPT PROFISSIONAL (8 BLOCOS / 15 PONTOS)
// ==========================================
function selecionarLead(id) {
  leadSelecionado = leads.find((l) => l.id === id);
  if (!leadSelecionado) return;

  renderizarLeads();
  const box = document.getElementById("generatorBox");
  box.style.display = "block";
  document.getElementById("selectedLeadTitle").textContent = `Estratégia para: ${leadSelecionado.nome}`;

  const config = NICHOS_CONFIG[leadSelecionado.nichoKey] || NICHOS_CONFIG.outro;
  const dorObj = DORES_CONFIG[leadSelecionado.dorKey] || DORES_CONFIG.sem_site;

  const segmentoCompleto = leadSelecionado.customNicho
    ? `${config.titulo} (Observação/Foco específico: ${leadSelecionado.customNicho})`
    : config.titulo;

  const paletaInstrucao = leadSelecionado.cor
    ? `Utilize prioritariamente as cores "${leadSelecionado.cor}" como identidade principal da marca, construindo uma paleta complementar equilibrada com superfícies neutras, contrastes nítidos entre seções e uma cor de destaque estratégica para CTAs (sem gradientes gratuitos).`
    : `Desenvolva uma paleta de cores autoral, harmônica e coerente com o segmento de ${segmentoCompleto}, alternando superfícies claras e escuras ou tons naturais com contraste elevado e uma cor de destaque estratégica para botões de conversão.`;

  const promptTexto = `Atue como uma equipe multidisciplinar composta por Diretor de Arte Digital, Senior UI/UX Designer, Especialista em Conversão, Desenvolvedor Front-end Sênior e Especialista em Acessibilidade/Responsividade. Desenvolva uma Landing Page comercial completa, funcional e mobile-first em Português (PT-BR) para a empresa "${leadSelecionado.nome}".

==================================================
1. CONTEXTO E APRESENTAÇÃO DA EMPRESA
==================================================
- Nome da Empresa: ${leadSelecionado.nome}
- Segmento: ${segmentoCompleto}
- Cenário Atual Identificado: ${dorObj.label}.
- Canal Oficial de Conversão: WhatsApp https://wa.me/55${leadSelecionado.whatsapp}

==================================================
2. ESTRATÉGIA COMERCIAL E PÚBLICO-ALVO
==================================================
- Objetivo Comercial: Construir uma página demonstrativa de nível de estúdio que posicione "${leadSelecionado.nome}" com credibilidade imediata, elimine atritos na escolha de serviços/produtos e conduza o visitante ao envio de uma solicitação estruturada diretamente no WhatsApp.
- Público-Alvo: ${config.publico}
- Hierarquia de Informação: Comunicar claramente na primeira dobra o que a empresa faz, para quem é e qual o próximo passo, evitando textos vagos ou clichês genéricos.

==================================================
3. DIREÇÃO DE ARTE E IDENTIDADE VISUAL
==================================================
- Conceito Visual: ${config.direcaoArte}
- Paleta de Cores: ${paletaInstrucao}
- Tipografia: ${config.tipografia} Aplique escala tipográfica expressiva nos títulos, peso consistente e contraste elevado entre texto e fundo.
- Princípios Anti-Template: Priorize layouts editoriais e grids assimétricos quando adequados, espaçamento intencional, alternância equilibrada de superfícies e elementos gráficos funcionais. Evite repetição excessiva de cards arredondados, botões em cápsula em toda a interface, gradientes gratuitos, glassmorphism indiscriminado e sombras pesadas.

==================================================
4. ESTRUTURA VISUAL E ARQUITETURA DAS SEÇÕES
==================================================
${config.arquitetura}

TRATAMENTO DE IMAGENS E FIDELIDADE AOS DADOS (REGRA CRÍTICA):
- Imagens: ${config.imagens}
- Proibição de Dados Fictícios: NÃO invente depoimentos, avaliações, notas do Google, números de clientes atendidos, estatísticas, prêmios, certificações, nomes de profissionais, endereços, horários ou preços reais. Sempre que uma informação institucional depender de confirmação do cliente (como endereço exato, horário ou tabela final), utilize marcações provisórias claramente identificadas (ex: [INSERIR ENDEREÇO], [INSERIR HORÁRIO]) ou omita a informação.

==================================================
5. FUNCIONALIDADES REAIS E INTEGRAÇÃO WHATSAPP
==================================================
${config.interatividade}
- Nenhum botão ou link pode ser meramente decorativo: menus mobile, filtros, seletores, accordions e botões de ação devem funcionar completamente em JavaScript puro/moderno, sem simular operações de backend inexistentes.

==================================================
6. RESPONSIVIDADE E ACESSIBILIDADE (MOBILE-FIRST)
==================================================
- Desenvolva priorizando smartphones (onde ocorre a maioria dos acessos via links de redes sociais e WhatsApp) e adapte progressivamente para tablets, notebooks e desktops.
- Garanta ausência de rolagem horizontal indesejada, imagens fluidas, tipografia legível sem zoom, áreas de toque mínimas de 44x44px, estados visíveis de foco (:focus-visible), labels associados aos inputs e contraste mínimo WCAG AA.

==================================================
7. REQUISITOS TÉCNICOS E SEO BÁSICO
==================================================
- Estrutura HTML5 semântica (<header>, <main>, <section>, <nav>, <footer>) com hierarquia única de <h1> seguida por <h2> e <h3>.
- Meta tags essenciais (<title> descritivo com o nome "${leadSelecionado.nome}", meta description objetiva e viewport).
- Atributo alt descritivo em todas as imagens e carregamento otimizado (loading="lazy" nas imagens abaixo da primeira dobra).
- Código limpo, modular, sem erros no console e com validação nos campos interativos antes do disparo ao WhatsApp.

==================================================
8. VALIDAÇÃO FINAL ANTES DA ENTREGA
==================================================
Antes de finalizar o código, revise obrigatoriamente:
1. O layout foge da aparência de template genérico de IA e respeita o segmento de ${segmentoCompleto}?
2. Todos os botões de conversão geram corretamente o link https://wa.me/55${leadSelecionado.whatsapp} com encodeURIComponent() refletindo as escolhas do usuário?
3. Há algum dado fictício (depoimento, nota, endereço ou preço inventado) que precisa ser substituído por placeholder explícito?
4. A navegação mobile, os seletores interativos e o contraste estão 100% funcionais e sem quebras visuais?`;

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

  // 2ª MENSAGEM: Para enviar SOMENTE depois que o cliente responder
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