/**
 * Catálogo da Galeria de Imagens do Maleducation.
 * Estrutura separada da apresentação: cada item possui
 * src, titulo, descricao, categoria e tag (subgrupo opcional).
 * Categorias: cenarios | personagens | beta | extras
 */
const GALLERY_DATA = [
    /* ================= CENÁRIOS ================= */
    { src: '/teste/public/assets/backgrounds/quarto.jpeg', titulo: 'Quarto do Protagonista', descricao: 'Cenário de abertura — o despertar do Capítulo 1.', categoria: 'cenarios', tag: 'Casa' },
    { src: '/teste/public/assets/backgrounds/cozinha.jpeg', titulo: 'Cozinha', descricao: 'Café da manhã com os pais, antes da escola.', categoria: 'cenarios', tag: 'Casa' },
    { src: '/teste/public/assets/backgrounds/rua.jpeg', titulo: 'Rua do Caminho', descricao: 'O trajeto do protagonista até a escola.', categoria: 'cenarios', tag: 'Cidade' },
    { src: '/teste/public/assets/backgrounds/entrada_escola.jpeg', titulo: 'Portão da Escola', descricao: 'Entrada da Águia da Doom and Despair.', categoria: 'cenarios', tag: 'Escola' },
    { src: '/teste/public/assets/backgrounds/sala_de_aula.jpeg', titulo: 'Sala de Aula', descricao: 'Sala onde o mistério começa.', categoria: 'cenarios', tag: 'Escola' },
    { src: '/teste/public/assets/backgrounds/mesa_escrito_ningem_sai_daqui_o_mesmo.jpeg', titulo: 'A Mesa do Recado', descricao: 'A carteira vandalizada com o rabisco misterioso.', categoria: 'cenarios', tag: 'Escola' },
    { src: '/teste/public/assets/backgrounds/corredor_medonho.png', titulo: 'Corredor Vazio', descricao: 'Corredor da escola no Capítulo 2 — já não parece o mesmo lugar.', categoria: 'cenarios', tag: 'Escola' },
    { src: '/teste/public/assets/backgrounds/fim_do_corredor_com_a_porta_secreta.png', titulo: 'A Porta Secreta', descricao: 'Fim do corredor — a passagem escondida.', categoria: 'cenarios', tag: 'Escola' },
    { src: '/teste/public/assets/backgrounds/escadaria_assustadora.png', titulo: 'Escadaria Subterrânea', descricao: 'A descida que leva à fábrica.', categoria: 'cenarios', tag: 'Fábrica' },
    { src: '/teste/public/assets/backgrounds/entrada_fabrica.png', titulo: 'Entrada da Fábrica', descricao: 'Portal da instalação subterrânea.', categoria: 'cenarios', tag: 'Fábrica' },
    { src: '/teste/public/assets/backgrounds/fabrica_vista_de_cima.png', titulo: 'Fábrica Vista do Alto', descricao: 'A esteira de produção vista da plataforma.', categoria: 'cenarios', tag: 'Fábrica' },
    { src: '/teste/public/assets/backgrounds/corredores_fabrica.png', titulo: 'Corredores da Fábrica', descricao: 'Passagens internas da instalação.', categoria: 'cenarios', tag: 'Fábrica' },
    { src: '/teste/public/assets/backgrounds/corredores_fabrica_proxima_a_saida.png', titulo: 'Corredor da Saída', descricao: 'Aproximação do confronto no Capítulo 2.', categoria: 'cenarios', tag: 'Fábrica' },
    { src: '/teste/public/assets/backgrounds/corredores_fabrica_com_cartaz.png', titulo: 'Corredor Administrativo', descricao: 'Setor administrativo com cartazes da empresa.', categoria: 'cenarios', tag: 'Fábrica' },
    { src: '/teste/public/assets/backgrounds/porta_do_escritorio_com_o_aviso.png', titulo: 'Porta do Escritório', descricao: 'A porta com o aviso antes do confronto final.', categoria: 'cenarios', tag: 'Fábrica' },
    { src: '/teste/public/assets/backgrounds/escritorio_do_chefe_por_dentro.png', titulo: 'Escritório do Chefe', descricao: 'Interior do escritório do Goxtoso.', categoria: 'cenarios', tag: 'Fábrica' },

    /* ================= PERSONAGENS ================= */
    { src: '/teste/public/assets/characters/mae_normal.png', titulo: 'Mãe — Normal', descricao: 'Expressão neutra da mãe.', categoria: 'personagens', tag: 'Mãe', sprite: true },
    { src: '/teste/public/assets/characters/mae_feliz.png', titulo: 'Mãe — Feliz', descricao: 'Expressão alegre da mãe.', categoria: 'personagens', tag: 'Mãe', sprite: true },
    { src: '/teste/public/assets/characters/mae_triste.png', titulo: 'Mãe — Triste', descricao: 'Expressão triste da mãe.', categoria: 'personagens', tag: 'Mãe', sprite: true },
    { src: '/teste/public/assets/characters/pai_normal.png', titulo: 'Pai — Normal', descricao: 'Expressão neutra do pai.', categoria: 'personagens', tag: 'Pai', sprite: true },
    { src: '/teste/public/assets/characters/pai_bravo.png', titulo: 'Pai — Bravo', descricao: 'Expressão irritada do pai.', categoria: 'personagens', tag: 'Pai', sprite: true },
    { src: '/teste/public/assets/characters/pai_triste.png', titulo: 'Pai — Triste', descricao: 'Expressão triste do pai.', categoria: 'personagens', tag: 'Pai', sprite: true },
    { src: '/teste/public/assets/characters/professor_normal.png', titulo: 'Professor — Normal', descricao: 'Expressão neutra do professor.', categoria: 'personagens', tag: 'Professor', sprite: true },
    { src: '/teste/public/assets/characters/professor_tenso.png', titulo: 'Professor — Tenso', descricao: 'Expressão tensa do professor.', categoria: 'personagens', tag: 'Professor', sprite: true },
    { src: '/teste/public/assets/characters/professor_feliz_nervoso.png', titulo: 'Professor — Feliz Nervoso', descricao: 'Sorriso forçado e inquietação.', categoria: 'personagens', tag: 'Professor', sprite: true },
    { src: '/teste/public/assets/characters/amigo_feliz.png', titulo: 'Amigo — Feliz', descricao: 'Expressão alegre do amigo do protagonista.', categoria: 'personagens', tag: 'Amigo', sprite: true },
    { src: '/teste/public/assets/characters/amigo_assustado.png', titulo: 'Amigo — Assustado', descricao: 'Expressão de medo do amigo.', categoria: 'personagens', tag: 'Amigo', sprite: true },
    { src: '/teste/public/assets/characters/amigo_bravo.png', titulo: 'Amigo — Bravo', descricao: 'Expressão irritada do amigo.', categoria: 'personagens', tag: 'Amigo', sprite: true },
    { src: '/teste/public/assets/characters/alunos_machucados.png', titulo: 'Alunos Machucados', descricao: 'Grupo de alunos com sinais de agressão.', categoria: 'personagens', tag: 'Coletivo', sprite: true },
    { src: '/teste/public/assets/characters/amigo_do_protagonista_assustado_e_outros_alunos.png', titulo: 'Amigo e Alunos Assustados', descricao: 'Composição de cena — o amigo cercado de alunos assustados.', categoria: 'personagens', tag: 'Coletivo' },
    { src: '/teste/public/assets/characters/chefe_goxtoso.png', titulo: 'Chefe Goxtoso', descricao: 'O chefe da fábrica secreta — apresentação frontal.', categoria: 'personagens', tag: 'Goxtoso', sprite: true },
    { src: '/teste/public/assets/characters/chefe_goxtoso_bracos_abertos.png', titulo: 'Goxtoso — Braços Abertos', descricao: 'Pose de apresentação exagerada.', categoria: 'personagens', tag: 'Goxtoso', sprite: true },
    { src: '/teste/public/assets/characters/chefe_goxtoso_de_costas_na_cadeira.png', titulo: 'Goxtoso — De Costas', descricao: 'Vista de costas antes da revelação.', categoria: 'personagens', tag: 'Goxtoso', sprite: true },

    /* ================= VERSÕES BETA ================= */
    { src: '/teste/public/assets/imagensExtraGaleria/backgroound_entrada_escola_sem_polimento.jpeg', titulo: 'Entrada da Escola — Sem Polimento', descricao: 'Versão beta do background de entrada da escola.', categoria: 'beta', tag: 'Backgrounds' },
    { src: '/teste/public/assets/imagensExtraGaleria/backgroound_sala_de_aula_sem_polimento.jpeg', titulo: 'Sala de Aula — Sem Polimento', descricao: 'Versão beta do background da sala de aula.', categoria: 'beta', tag: 'Backgrounds' },
    { src: '/teste/public/assets/imagensExtraGaleria/background_cozinha_sem_polimento.jpeg', titulo: 'Cozinha — Sem Polimento', descricao: 'Versão beta do background da cozinha.', categoria: 'beta', tag: 'Backgrounds' },
    { src: '/teste/public/assets/imagensExtraGaleria/background_mesa_escrito_ningem_sai_daqui_o_mesmo_sem_polimento.jpeg', titulo: 'Mesa do Recado — Sem Polimento', descricao: 'Versão beta do background da carteira.', categoria: 'beta', tag: 'Backgrounds' },
    { src: '/teste/public/assets/imagensExtraGaleria/background_quarto_sem_polimento.jpeg', titulo: 'Quarto — Sem Polimento', descricao: 'Versão beta do background do quarto.', categoria: 'beta', tag: 'Backgrounds' },
    { src: '/teste/public/assets/imagensExtraGaleria/background_rua_sem_polimento.jpeg', titulo: 'Rua — Sem Polimento', descricao: 'Versão beta do background da rua.', categoria: 'beta', tag: 'Backgrounds' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_beta_do_menu.jpeg', titulo: 'Menu — Versão Beta', descricao: 'Estudo visual para o menu principal.', categoria: 'beta', tag: 'Interface' },

    /* ================= EXTRAS / CONCEITUAIS ================= */
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_alunos_extra2.jpeg', titulo: 'Estudo — Alunos Extras', descricao: 'Arte conceitual de alunos adicionais.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_amigo_protagonista.jpeg', titulo: 'Conceito — Amigo do Protagonista', descricao: 'Estudo inicial do personagem amigo.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_faces_do_protagonista_e_corpo.jpeg', titulo: 'Estudo — Protagonista', descricao: 'Estudos de rosto e corpo do protagonista.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_oficial_alunos_machucados.jpeg', titulo: 'Oficial — Alunos Machucados', descricao: 'Referência oficial do grupo de alunos.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_oficial_amigo_do_protagonista.jpeg', titulo: 'Oficial — Amigo do Protagonista', descricao: 'Referência oficial do amigo.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_oficial_pai.jpeg', titulo: 'Oficial — Pai', descricao: 'Referência oficial do pai.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_oficial_professor.jpeg', titulo: 'Oficial — Professor', descricao: 'Referência oficial do professor.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_pai_e_mae.jpeg', titulo: 'Conceito — Pai e Mãe', descricao: 'Estudo conjunto dos pais do protagonista.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_personagem_normal_e_depois_luta.jpeg', titulo: 'Conceito — Normal e Luta', descricao: 'Estudo de personagem em modo normal e modo luta.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_personagens_extras.jpeg', titulo: 'Estudo — Personagens Extras', descricao: 'Arte conceitual de personagens adicionais.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_professor_corpo_e_rosto.jpeg', titulo: 'Estudo — Professor', descricao: 'Estudos de corpo e rosto do professor.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_professor_investigando_e_expressoes.jpeg', titulo: 'Conceito — Professor Investigando', descricao: 'Estudo do professor em cena de investigação.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_protagonista_RPG_de_luta.jpeg', titulo: 'Conceito — Protagonista em Luta I', descricao: 'Ideia visual para futura mecânica de batalha.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_protagonista_RPG_de_luta2.jpeg', titulo: 'Conceito — Protagonista em Luta II', descricao: 'Segunda variação do conceito de luta.', categoria: 'extras' },
    { src: '/teste/public/assets/imagensExtraGaleria/ideia_rosto_do_protagonista.jpeg', titulo: 'Estudo — Rosto do Protagonista', descricao: 'Estudo detalhado do rosto do protagonista.', categoria: 'extras' },
    { src: '/teste/public/assets/logo/logo.png', titulo: 'Logo Oficial', descricao: 'Identidade visual do Maleducation.', categoria: 'extras' }
];
