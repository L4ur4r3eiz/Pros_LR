// ==========================================
// 1. SEGURANÇA (HASH SHA-256)
// ==========================================
// Senha padrão atual: "admin" — troque pelo hash SHA-256 da sua senha
const SENHA_HASH = "eea3923b79b693ffe33a8cbadbddc16a968e210bb4c2bbb32ccdf6b4968396c6";

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
// 2. DIREÇÃO DE ARTE POR NICHO (ANTI-TEMPLATE)
// ==========================================
let leads = JSON.parse(localStorage.getItem("prospecta_leads")) || [];
let leadSelecionado = null;

const NICHOS_CONFIG = {
  hamburgueria: {
    titulo: "Hamburgueria / Pizzaria / Delivery Gastronômico",
    publico: "Consumidores locais exigentes que buscam sabor artesanal, transparência nos ingredientes e agilidade absoluta para pedir pelo celular sem taxas de aplicativos.",
    conceitoCriativo: "Editorial Gastronômico Urbano: tratar o cardápio como uma publicação culinária contemporânea, substituindo o visual genérico de 'fast-food cheio de ícones' por fotografia macro dramática, tipografia condensada de alto impacto e ritmo de leitura em colunas.",
    direcaoArte: "Linguagem modular e editorial com alto contraste. Superfícies foscas profundas (estilo carvão ou papel texturizado escuro), linhas divisórias finas (1px) estruturando os itens do menu, cantos retos ou levemente chanfrados (border-radius máximo de 4px a 6px) e total ausência de sombras neon ou gradientes artificiais.",
    tipografia: "Títulos em display condensado ou grotesco expressivo em caixa alta/mista (ex: Syne ou Oswald) com tracking ajustado, contrastando com uma sans-serif técnica limpa (ex: Plus Jakarta Sans ou Inter) para descrições de ingredientes e valores alinhados em tabular-nums.",
    secoesDetalhadas: `1. Header Compacto e Funcional: Logotipo à esquerda, navegação mínima (Cardápio, Origem, Horários) e indicador numérico discreto da sacola de pedidos à direita.
2. Hero Section Assimétrica de Grande Escala: Composição dividida em proporção 60/40 — título editorial de grande impacto posicionado com respiro assimétrico, proposta de valor direta sobre preparo artesanal e pedido direto, acompanhada de fotografia gastronômica sangrada até a borda com recorte geométrico limpo.
3. Manifesto da Cozinha (Bloco Editorial Horizontal): Faixa de contraste alternado explicando o preparo na brasa/chapa, seleção de insumos e o benefício de pedir direto sem intermediários, usando numeração editorial (01, 02, 03) em vez de caixas com ícones genéricos.
4. Cardápio Interativo Estruturado em Lista Editorial & Módulos: Navegação por categorias em abas limpas. Em vez de repetir o mesmo card arredondado em tudo, combine destaques principais com fotografia em proporção 4:5 e itens complementares em linhas divisórias horizontais elegantes com controles táteis minimalistas de "+" e "-".
5. Gaveta / Barra de Fechamento Inteligente: Fixada de forma discreta na base da tela apenas quando há itens selecionados, exibindo resumo claro, campo opcional de observação (ponto/retirada) e botão retangular de alta legibilidade para disparar o pedido formatado no WhatsApp.
6. Footer Arquitetônico: Grid assimétrico com endereço, raio de entrega, horários de funcionamento e link direto para o WhatsApp.`,
    tratamentoImagens: "Fotografias gastronômicas naturais com iluminação lateral quente e profundidade de campo curta, integradas diretamente ao grid sem molduras pesadas. Utilizar fotos ilustrativas coerentes de alta resolução sem atribuir autoria falsa.",
    diferencialCriativo: "Comanda Digital Integrada ao Grid Editorial: o cliente monta seu pedido diretamente nas linhas do cardápio e o sistema compila uma mensagem estruturada (itens, quantidades, observações e total) pronta para envio imediato no WhatsApp.",
    abordagem: "onde o cliente monta o pedido direto no celular e ele já chega mastigado no WhatsApp de vocês (sem taxa de aplicativo)"
  },

  doceria: {
    titulo: "Doceria / Confeitaria Artesanal",
    publico: "Clientes que valorizam confeitaria autoral, estética refinada para presentes e encomendas sob medida com atendimento ágil.",
    conceitoCriativo: "Lookbook de Confeitaria Editorial: estética inspirada em revistas de gastronomia e design contemporâneo, onde cada doce é apresentado com espaço negativo generoso, tipografia serifada elegante e ritmo visual pausado.",
    direcaoArte: "Minimalismo sensorial com calor humano. Fundos em tons naturais (off-white, creme quente ou cacau profundo), bordas nítidas ou raios mínimos (2px–4px), divisórias finas e foco total na textura dos ingredientes.",
    tipografia: "Combinação clássica contemporânea: serifada de alto contraste para títulos principais (ex: Cormorant Garamond ou Playfair Display) pareada com sans-serif humanista leve (ex: DM Sans) para descrições e preços.",
    secoesDetalhadas: `1. Header Editorial Minimalista: Marca posicionada com respiro superior, links discretos (Vitrine, Sob Encomenda, Atelier, Contato) e contador sutil da sacola.
2. Hero Section com Composição Modular: Fotografia macro ocupando grande área vertical à direita sobreposta parcialmente por um bloco tipográfico limpo à esquerda com headline sensorial e CTA direto para o catálogo.
3. Vitrine Interativa de Sabores e Encomendas: Layout alternando blocos assimétricos — doces assinatura com fotos em proporção vertical e seletores de quantidade/tamanho ("+" e "-") integrados discretamente abaixo da descrição.
4. Módulo de Encomendas Personalizadas: Bloco horizontal de cor contrastante explicando prazos de produção, embalagens para presente e retirada/entrega, sem inventar avaliações ou números falsos.
5. Barra de Resumo de Pedido: Exibe os itens escolhidos, soma o valor total automaticamente e gera a mensagem organizada para envio direto no WhatsApp.
6. Footer Limpo: Horários de atendimento, endereço do ponto de retirada e contato direto.`,
    tratamentoImagens: "Fotografia natural com luz difusa valorizando texturas (chocolate, frutas, massas), alternando recortes verticais e quadrados integrados ao layout.",
    diferencialCriativo: "Montador de Caixa & Encomenda Sob Medida: permite combinar sabores e tamanhos na própria vitrine e enviar a lista formatada direto para o WhatsApp da confeitaria.",
    abordagem: "onde o cliente escolhe os doces e tamanhos e já manda o pedido pronto direto pro WhatsApp de vocês"
  },

  petshop: {
    titulo: "Pet Shop / Estética Animal & Clínica Veterinária",
    publico: "Tutores cuidadosos que buscam segurança, transparência no manejo e facilidade para agendar banho, tosa ou consulta sem espera.",
    conceitoCriativo: "Cuidado Contemporâneo & Clareza Funcional: fugir dos sites infantis cheios de patinhas e cores saturadas aleatórias, adotando uma identidade acolhedora, limpa e organizada como um estúdio moderno de bem-estar animal.",
    direcaoArte: "Design modular limpo com tons orgânicos suaves e um ponto de contraste vibrante para ação. Geometria bem definida (cantos discretos de 6px–8px), hierarquia tipográfica clara e ausência de poluição visual.",
    tipografia: "Sans-serif geométrica amigável e firme para títulos (ex: Outfit ou Plus Jakarta Sans SemiBold) combinada com Inter para seletores e textos explicativos.",
    secoesDetalhadas: `1. Header Objetivo: Logotipo, navegação limpa (Serviços, Protocolo de Cuidado, Dúvidas, Localização) e botão retangular "Agendar Horário".
2. Hero Section Dividida com Propósito: Headline clara sobre cuidado sem estresse e transparência no atendimento, subtítulo acolhedor, CTA principal e fotografia natural de alta qualidade (tutor/pet ou cuidado estético) integrada à composição.
3. Configurador Interativo por Porte do Pet: Seção funcional dividida em 2 passos visuais — primeiro o tutor seleciona o porte (Pequeno, Médio, Grande) e depois marca os serviços desejados (Banho, Tosa Higiênica, Tosa na Tesoura, Hidratação, Avaliação Clínica) em blocos selecionáveis com estado ativo nítido.
4. Protocolo de Bem-Estar (Numeração Editorial): 3 blocos horizontais numerados (01. Recepção Calma, 02. Produtos Hipoalergênicos, 03. Manejo Individualizado) substituindo cards repetitivos.
5. FAQ em Accordion & Footer Completo: Respostas diretas sobre carteira de vacinação, tempo médio e transporte, seguidas pelo rodapé com mapa/endereço e barra fixa de agendamento no WhatsApp.`,
    tratamentoImagens: "Fotografias naturais e expressivas de cães e gatos bem cuidados, com iluminação limpa e sem montagens artificiais.",
    diferencialCriativo: "Simulador de Atendimento por Porte: o tutor configura o porte do animal e os serviços antes de abrir o WhatsApp, entregando a solicitação pronta para a recepção confirmar o horário.",
    abordagem: "onde o tutor escolhe o porte do pet, marca banho ou tosa e já manda o agendamento pronto pro WhatsApp de vocês"
  },

  estetica: {
    titulo: "Clínica de Estética / Salão / Barbearia / Estúdio",
    publico: "Clientes atentos à imagem pessoal, acabamento técnico e experiência exclusiva, que valorizam agilidade e sofisticação.",
    conceitoCriativo: "Direção Editorial de Estúdio Boutique: layout inspirado em publicações de moda, beleza e arquitetura contemporânea, com grids assimétricos, tipografia de alto contraste e ritmo visual sofisticado.",
    direcaoArte: "Minimalismo autoral com personalidade marcante. Uso intencional de espaço negativo, contrastes entre blocos claros e escuros, linhas finas divisórias, bordas retas (0px a 4px) e zero excesso de sombras ou efeitos genéricos.",
    tipografia: "Títulos expressivos de grande escala (ex: Syne, Cormorant ou Montserrat Bold com tracking controlado) pareados com Inter ou DM Sans para especificações técnicas.",
    secoesDetalhadas: `1. Header Minimalista: Identidade visual limpa, links de âncora suaves e CTA retangular "Reservar Horário".
2. Hero Section Editorial Assimétrica: Título de grande escala com quebra intencional de linhas, fotografia vertical expressiva deslocada no grid, proposta de valor objetiva e CTA direto.
3. Menu Interativo de Procedimentos (Estilo Editorial): Lista categorizada com divisórias finas onde o cliente pode selecionar múltiplos procedimentos (vendo descrição técnica e duração média) para montar sua sessão.
4. Galeria Arquitetônica / Visual: Módulos de diferentes proporções apresentando a atmosfera do estúdio e o padrão de cuidado (imagens ilustrativas coerentes, sem alegações falsas).
5. Experiência de Atendimento: 3 etapas horizontais explicando avaliação personalizada, execução técnica e pós-atendimento.
6. Barra de Pré-Reserva & Footer: Resumo discreto dos procedimentos selecionados com botão que dispara o agendamento formatado no WhatsApp, acompanhado de endereço e horários.`,
    tratamentoImagens: "Fotografias editoriais com composição limpa, luz natural ou de estúdio bem controlada, recortes verticais e horizontais assimétricos.",
    diferencialCriativo: "Curadoria de Sessão Interativa: o visitante combina os procedimentos desejados diretamente no menu editorial e envia a pré-reserva estruturada para o WhatsApp.",
    abordagem: "onde o cliente vê os procedimentos, seleciona o que deseja fazer e já chama no WhatsApp com o agendamento pronto"
  },

  saude: {
    titulo: "Consultório Odontológico / Psicologia / Clínica de Saúde",
    publico: "Pacientes que buscam acolhimento humanizado, clareza técnica sobre tratamentos e facilidade para agendar a primeira consulta.",
    conceitoCriativo: "Arquitetura Clínica Contemporânea: transmitir serenidade, rigor técnico e acolhimento sem parecer um site hospitalar frio ou um template genérico.",
    direcaoArte: "Design minimalista com personalidade e calor humano. Superfícies em tons naturais suaves (areia, branco gelo, cinza pedra), tipografia de alta legibilidade, divisórias precisas e bordas discretas (4px).",
    tipografia: "Serifada humanista suave ou sans-serif editorial para títulos (ex: Lora ou Plus Jakarta Sans) combinada com Inter para textos informativos.",
    secoesDetalhadas: `1. Header Institucional Limpo: Identidade do consultório, navegação clara (Especialidades, Abordagem, Dúvidas, Localização) e botão de destaque "Agendar Consulta".
2. Hero Section de Autoridade Serena: Composição equilibrada com título focado em saúde e atendimento individualizado, descrição clara, botão de agendamento no WhatsApp e fotografia natural do ambiente/atendimento.
3. Especialidades em Módulos Assimétricos: Apresentação clara de cada área de atuação, explicando para quem é indicado e como funciona a primeira avaliação, com opção de selecionar o motivo do contato.
4. Pilares do Atendimento: Grid limpo destacando escuta ativa, planejamento individualizado e conforto estrutural (sem estatísticas ou certificações inventadas).
5. Perguntas Frequentes (Accordion) & Localização: Dúvidas práticas sobre primeira consulta e preparo, seguidas por bloco de endereço, horários e CTA direto para WhatsApp.`,
    tratamentoImagens: "Fotografias claras, naturais e acolhedoras que transmitam confiança e tranquilidade.",
    diferencialCriativo: "Triagem Inteligente de Primeira Consulta: o paciente seleciona a especialidade ou necessidade antes de clicar no WhatsApp, iniciando a conversa já direcionado.",
    abordagem: "para transmitir ainda mais credibilidade no Google e facilitar o agendamento de pacientes direto no WhatsApp"
  },

  automotivo: {
    titulo: "Estética Automotiva / Detailer / Oficina Especializada",
    publico: "Proprietários de veículos que buscam proteção, precisão técnica e transparência no orçamento de cuidados automotivos.",
    conceitoCriativo: "Engenharia & Precisão Visual: estética inspirada em design industrial e automotivo contemporâneo, com grids geométricos rigorosos, tipografia técnica e contrastes bem definidos.",
    direcaoArte: "Design corporativo/técnico contemporâneo. Fundos escuros foscos ou grafite industrial com superfícies delimitadas por bordas finas (1px), cantos retos (2px–4px), numeração técnica e ausência de gradientes exagerados.",
    tipografia: "Sans-serif geométrica/técnica para títulos (ex: Space Grotesk ou Outfit Bold) combinada com Inter para especificações e itens de orçamento.",
    secoesDetalhadas: `1. Header Técnico: Logotipo em destaque, links rápidos (Serviços, Configurador, Processo, Contato) e botão "Solicitar Orçamento".
2. Hero Section de Alto Contraste: Fotografia automotiva de detalhe ocupando grande área visual, acompanhada de título técnico direto, proposta de valor e CTA para montar pacote.
3. Configurador de Pacote Automotivo: O motorista seleciona o porte do veículo (Hatch, Sedan, SUV/Picape) e marca os serviços desejados (Lavagem Detalhada, Polimento Técnico, Vitrificação, Higienização Interna) com feedback visual nítido.
4. Processo Técnico em 4 Etapas Horizontais: Inspeção, Descontaminação, Execução e Acabamento apresentados em sequência modular numerada.
5. Barra de Orçamento Direto & Footer: Compila o tipo de veículo e os serviços escolhidos em uma mensagem pronta para o WhatsApp, seguido por endereço e horários.`,
    tratamentoImagens: "Fotografias automotivas com foco em reflexo de pintura, acabamento interno e precisão técnica, integradas ao grid.",
    diferencialCriativo: "Configurador de Serviço por Categoria de Veículo: estrutura o orçamento técnico (porte + serviços) e envia pronto no WhatsApp.",
    abordagem: "onde o cliente escolhe o tipo de carro, marca os serviços desejados e já manda o orçamento pronto no WhatsApp de vocês"
  },

  outro: {
    titulo: "Negócio Local / Serviços Especializados",
    publico: "Clientes locais que procuram atendimento confiável, rápido e transparente na região.",
    conceitoCriativo: "Estúdio Digital Modular: layout editorial contemporâneo com grids assimétricos, tipografia expressiva e hierarquia visual clara.",
    direcaoArte: "Composições modulares com alternância intencional de fundos claros e escuros, bordas retas ou discretamente arredondadas (4px), linhas divisórias estruturais e zero aparência de template genérico.",
    tipografia: "Combinação contrastante entre display moderno para títulos (ex: Plus Jakarta Sans Bold ou Syne) e Inter para leitura fluida.",
    secoesDetalhadas: `1. Header Compacto: Logotipo, navegação enxuta e CTA direto.
2. Hero Section Assimétrica: Título específico sobre a solução entregue pela empresa, subtítulo objetivo, CTA principal e composição visual forte.
3. Apresentação dos Serviços em Layout Modular: Blocos de proporções variadas detalhando os serviços com opção interativa de seleção de interesse.
4. Diferenciais & Processo de Atendimento: Sequência numerada (01, 02, 03) mostrando como funciona o atendimento do primeiro contato à entrega.
5. Conversão & Footer Completo: Chamada final objetiva direcionando para o WhatsApp com os serviços marcados, endereço e horários.`,
    tratamentoImagens: "Fotografias naturais e profissionais coerentes com o segmento, integradas à estrutura visual sem excesso de molduras.",
    diferencialCriativo: "Seletor de Interesse Integrado: permite ao visitante marcar o serviço desejado antes de abrir o WhatsApp, acelerando o fechamento.",
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
// 5. GERADOR DE PROMPT DE ESTÚDIO (17 PONTOS)
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
    ? `${config.titulo} (Especialidade: ${leadSelecionado.customNicho})`
    : config.titulo;

  const paletaTexto = leadSelecionado.cor
    ? `Utilize prioritariamente as cores "${leadSelecionado.cor}" como identidade da marca, construindo uma paleta complementar com superfícies neutras, contrastes nítidos entre seções e uma cor de destaque estratégica para ações principais, sem gradientes gratuitos.`
    : `Desenvolva uma paleta de cores autoral e coerente com o universo de ${segmentoCompleto}, alternando fundos claros e escuros ou tons naturais com contraste elevado e uma cor de destaque pontual para CTAs.`;

  const promptTexto = `Atue como um Diretor de Arte Digital, Senior UI/UX Designer e Engenheiro Front-end Sênior de um estúdio de design premiado. Desenvolva uma Landing Page demonstrativa completa, responsiva (mobile-first) e totalmente funcional em Português (PT-BR) para a empresa "${leadSelecionado.nome}".

1. CONTEXTO E DESCRIÇÃO DO NEGÓCIO
- Empresa: ${leadSelecionado.nome}
- Segmento: ${segmentoCompleto}
- Natureza do projeto: Site demonstrativo de alto nível criado para apresentar o posicionamento digital ideal da marca e converter visitantes em clientes reais.

2. OBJETIVO PRINCIPAL DO SITE
- Impressionar o proprietário e os clientes logo na primeira dobra com uma direção de arte autoral, transmitir autoridade imediata e conduzir o visitante de forma natural até o envio de pedido/agendamento estruturado no WhatsApp (55${leadSelecionado.whatsapp}).

3. PÚBLICO-ALVO E POSICIONAMENTO
- Público-alvo: ${config.publico}
- Posicionamento: Marca bem estruturada, confiável e contemporânea, distante de soluções amadoras ou genéricas.

4. CONCEITO CRIATIVO ESCOLHID0
- ${config.conceitoCriativo}

5. DIREÇÃO DE ARTE
- ${config.direcaoArte}
- Trabalhe com composições assimétricas, ritmo visual entre seções, uso intencional de espaços vazios, divisórias finas e alternância de proporções.

6. IDENTIDADE VISUAL E PALETA DE CORES
- ${paletaTexto}

7. TIPOGRAFIA
- ${config.tipografia}
- Explore escala expressiva nos títulos principais, hierarquia clara entre títulos, subtítulos e corpo, mantendo contraste e leitura confortáveis.

8. ARQUITETURA COMPLETA E DESCRIÇÃO VISUAL DAS SEÇÕES
${config.secoesDetalhadas}

9. TRATAMENTO E POSICIONAMENTO DAS IMAGENS
- ${config.tratamentoImagens}

10. DIFERENCIAL CRIATIVO E ELEMENTOS INTERATIVOS
- ${config.diferencialCriativo}
- Utilize microinterações precisas (estados de hover, seleção ativa, transições suaves de 200ms) que reforcem a sensação de acabamento artesanal sem prejudicar a velocidade.

11. EXPERIÊNCIA DO USUÁRIO (UX)
- Navegação intuitiva, hierarquia de informação escaneável, feedback imediato ao selecionar itens/serviços e textos naturais e específicos para ${segmentoCompleto} (jamais use clichês como "Transformando sonhos" ou "Elevando ao próximo nível").

12. ESTRATÉGIA DE CONVERSÃO (WHATSAPP)
- Todos os botões de conversão devem direcionar para https://wa.me/55${leadSelecionado.whatsapp} utilizando encodeURIComponent() para preencher automaticamente uma mensagem clara com os itens ou serviços escolhidos pelo visitante na página.

13. RESPONSIVIDADE COM QUALIDADE DE DESIGN
- Reorganize grids assimétricos, tipografia e controles interativos para smartphones, garantindo áreas de toque confortáveis (mínimo 44px) e preservação total da identidade visual no mobile.

14. ORIENTAÇÕES TÉCNICAS E CRITÉRIOS DE QUALIDADE
- Código limpo, semântico, componentizado e 100% funcional (todos os botões, filtros, cálculos e links do WhatsApp devem operar sem erros).
- Carregamento rápido e imagens otimizadas.

15. PROIBIÇÕES ESTRITAS (FUJA DO DESIGN GENÉRICO DE IA)
- NÃO crie Hero Sections genéricas excessivamente centralizadas com efeitos luminosos aleatórios.
- NÃO repita o mesmo padrão de 3 ou 4 cards arredondados em todas as seções.
- NÃO transforme todos os botões em cápsulas (pill buttons).
- NÃO aplique glassmorphism indiscriminado, gradientes sem propósito ou sombras pesadas.
- NÃO invente depoimentos, avaliações, estatísticas, prêmios ou certificações fictícias sobre a empresa "${leadSelecionado.nome}".`;

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