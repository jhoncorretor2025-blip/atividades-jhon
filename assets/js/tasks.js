/* V3.9 — catálogo imutável das atividades e contagens por área. */
const tasks = [
{id:"whatsapp-focus",title:"Revisar o WhatsApp (Foco Total 08h-10h)",icon:"◷",area:"ADM",period:"Diário",priority:"Alta",attention:true,desc:"Rotina matinal de foco no WhatsApp.",urgent:true,link:"https://web.whatsapp.com/",linkLabel:"↗ Abrir WhatsApp"},
{id:"nota-fiscal",title:"Emitir Nota Fiscal",icon:"♧",area:"ADM",period:"Mensal",priority:"Crítica",critical:true,desc:"Dia 15: emitir as notas fiscais para evitar multas e atrasos no faturamento.",attention:true},
{id:"status-social",title:"Colocar foto no Status do WhatsApp e Instagram (Deixar Nota)",icon:"◎",area:"Comercial",period:"Diário",priority:"Normal",desc:"Atualizar os stories e status com fotos de imóveis, anúncios ou comunicados relevantes e deixar uma nota explicativa.",link:"https://web.whatsapp.com/",linkLabel:"↗ Abrir WhatsApp"},
{id:"pastas-entrada-saida",title:"Verificar pastas de entrada e saída",icon:"▱",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"conversa-prestador",title:"Verificar conversa de prestador",icon:"⚒",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"facebook-interessados",title:"Revisar mensagens do Facebook (Interessados)",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:"Verificar pessoas que mandaram mensagem nos anúncios.",link:"https://www.facebook.com/messages/",linkLabel:"↗ Abrir mensagens do Facebook"},
{id:"avalyst",title:"Verificar o Avalyst",icon:"♧",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"facebook-aluguel",title:"Revisar o Facebook (Anúncios de Aluguel)",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:"",link:"https://www.facebook.com/",linkLabel:"↗ Abrir Facebook"},
{id:"retorno-lead",title:"Retornar contato com quem demonstrou interesse e ainda não respondeu",icon:"◷",area:"Ambos",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:"Follow-up de atendimento para leads que esfriaram ou aguardam retorno."},
{id:"revisao-whatsapp",title:"Revisão de WhatsApp",icon:"◷",area:"Comercial",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:"",link:"https://web.whatsapp.com/",linkLabel:"↗ Abrir WhatsApp"},
{id:"divulgar-facebook",title:"Divulgar anúncios no Facebook",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:"",link:"https://www.facebook.com/",linkLabel:"↗ Abrir Facebook"},
{id:"post-facebook",title:"Postar no Facebook",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:"",link:"https://www.facebook.com/",linkLabel:"↗ Abrir Facebook"},
{id:"rever-chave",title:"Rever chave",icon:"◷",area:"ADM",period:"Semanal",priority:"Alta",attention:true,urgent:true,desc:"Toda sexta-feira."},
{id:"responder-facebook",title:"Responder mensagem do Facebook",icon:"f",area:"Comercial",period:"Diário",priority:"Normal",desc:"",link:"https://www.facebook.com/messages/",linkLabel:"↗ Abrir mensagens do Facebook"},
{id:"cobranca-condominio",title:"Cobrança de inadimplência de condomínio",icon:"$",area:"ADM",period:"Diário",priority:"Normal",desc:""},
{id:"chaves-mural",title:"Organizar chaves do mural (toda sexta)",icon:"⚿",area:"ADM",period:"Semanal",priority:"Normal",desc:""},
{id:"sinistros",title:"Verificar sinistros",icon:"♧",area:"ADM",period:"Diário",priority:"Normal",desc:"",link:"https://docs.google.com/spreadsheets/d/1Dk_zuamAKowE18BI5J8XbeUIllJikdT-MZl61-JGItg/edit?usp=sharing",linkLabel:"📊 Clique aqui para abrir a planilha"},
{id:"inadimplencia-cobrancas",title:"Verificar inadimplência e cobranças",icon:"◷",area:"ADM",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:""},
{id:"emails",title:"Verificar e-mails",icon:"✉",area:"ADM",period:"Diário",priority:"Normal",desc:"",link:"https://mail.google.com/",linkLabel:"↗ Abrir Gmail"},
{id:"planilha",title:"Rever planilha",icon:"▤",area:"ADM",period:"Semanal",priority:"Normal",desc:""},
{id:"conversas-antigas",title:"Verificar conversas antigas",icon:"◴",area:"Ambos",period:"Diário",priority:"Normal",desc:""},
{id:"anuncios-antigos",title:"Rever anúncios antigos",icon:"▤",area:"Comercial",period:"Semanal",priority:"Normal",desc:""},
{id:"captacao-proprietarios",title:"Entrar em contato com proprietários e buscar novas captações",icon:"◷",area:"Comercial",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:"Prospecção ativa e contato direto com proprietários para novos imóveis de locação."},
{id:"whatsapp-pessoal",title:"Ver WhatsApp pessoal (Clientes de Locação e Vendas)",icon:"◷",area:"Comercial",period:"Diário",priority:"Alta",attention:true,urgent:true,desc:"Checar conversas e mensagens no WhatsApp pessoal onde há clientes de locação e vendas.",link:"https://web.whatsapp.com/",linkLabel:"↗ Abrir WhatsApp"},
{id:"etiquetas-interessados",title:"Arrumar etiqueta de interessados",icon:"◇",area:"Comercial",period:"Diário",priority:"Normal",desc:"Organizar e aplicar as etiquetas corretas aos contatos interessados no WhatsApp."},
{id:"imoveis-antigos",title:"Verificar imóveis antigos se ainda estão disponíveis",icon:"⌂",area:"Ambos",period:"Semanal",priority:"Normal",desc:"Revisar disponibilidade da carteira de imóveis antigos (ação administrativa e comercial)."},
{id:"fotos-vilson",title:"Verificar fotos que o Vilson cadastrou se tem algum imóvel não cadastrado",icon:"▧",area:"ADM",period:"Diário",priority:"Normal",desc:"Auditar a pasta/acervo de fotos do Vilson para identificar e cadastrar novos imóveis pendentes."},
{id:"etiquetas-whatsapp",title:"Verificar etiquetas do WhatsApp",icon:"◇",area:"Comercial",period:"Diário",priority:"Normal",desc:"Revisar contatos e leads categorizados por etiquetas coloridas para garantir que nenhum cliente fique sem retorno."}
,{id:"estudar-20-min",title:"Estudar 20 minutos — novidades de jogos e IA",icon:"🧠",area:"Estudos",period:"Diário",priority:"Crítica",critical:true,desc:"Reservar 20 minutos para ver o chat de atualização de jogos e novidades de inteligência artificial."}
,{id:"criar-peca-3d",title:"Criar peça 3D",icon:"🧩",area:"Trabalho pessoal",period:"Diário",priority:"Crítica",critical:true,desc:"Avançar no projeto de criação da peça 3D."}
,{id:"pendencia-whats",title:"Resolver pendências do WhatsApp",icon:"💬",area:"Trabalho pessoal",period:"Diário",priority:"Alta",attention:true,desc:"Revisar e resolver as pendências registradas no WhatsApp."}
,{id:"google-tarefa",title:"Revisar notas no Google Keep",icon:"📝",area:"Trabalho pessoal",period:"Diário",priority:"Alta",desc:"Conferir, organizar e atualizar notas, ideias e lembretes registrados no Google Keep.",link:"https://keep.google.com/",linkLabel:"↗ Abrir Google Keep"}
,{id:"usar-codex",title:"Usar Codex",icon:"💻",area:"Trabalho pessoal",period:"Diário",priority:"Alta",desc:"Reservar um tempo para utilizar o Codex, desenvolver projetos, revisar código e avançar nas tarefas de programação.",link:"https://chatgpt.com/codex",linkLabel:"↗ Abrir Codex"}
,{id:"explorar-ias",title:"Explorar novas IAs",icon:"🤖",area:"IA e DroidManiacos",period:"Diário",priority:"Crítica",critical:true,desc:"Projetos: sistema Biobel (perfil corretor); análise de WhatsApp (perfil corretor); sistema Delta para o canal Mente Aberto.",link:"https://chatgpt.com/",linkLabel:"↗ Abrir ChatGPT"}
,{id:"rever-projetos-google-studio",title:"Rever projetos de IA no Google AI Studio",icon:"🛠️",area:"IA e DroidManiacos",period:"Diário",priority:"Crítica",critical:true,desc:"Revisar os projetos do Sistema Biobel e do sistema de leitura de WhatsApp.",link:"https://aistudio.google.com/",linkLabel:"↗ Abrir Google AI Studio"}
,{id:"gravar-tiktok",title:"Gravar TikTok",icon:"🎬",area:"IA e DroidManiacos",period:"Diário",priority:"Baixa",desc:"Gravar conteúdo para o TikTok.",link:"https://www.tiktok.com/",linkLabel:"↗ Abrir TikTok"}
,{id:"gravar-youtube",title:"Gravar vídeo para o canal do YouTube",icon:"📹",area:"IA e DroidManiacos",period:"Diário",priority:"Baixa",desc:"Preparar e gravar conteúdo para o canal DroidManiacos.",link:"https://studio.youtube.com/",linkLabel:"↗ Abrir YouTube Studio"}
,{id:"tomar-vitaminas",title:"Tomar vitaminas e suplementos",icon:"💊",area:"Favoritos pessoais",period:"Diário",priority:"Crítica",critical:true,fixedPosition:4,desc:"Marque cada item separadamente conforme sua rotina e orientação profissional.",subtasks:[{id:"creatina",label:"Creatina"},{id:"nac",label:"NAC — pela manhã"},{id:"colageno",label:"Colágeno"},{id:"vitamina-d",label:"Vitamina D"},{id:"ashwagandha-moringa-maca",label:"Ashwagandha + Moringa + maca negra"}]}
,{id:"treino-academia",title:"Treino do dia — academia às 18h10",icon:"🏋️",area:"Favoritos pessoais",period:"Diário",priority:"Alta",attention:true,desc:"Realizar o treino planejado do dia."}
,{id:"higiene-sono",title:"Higiene do sono e placa de bruxismo",icon:"🌙",area:"Favoritos pessoais",period:"Diário",priority:"Média",desc:"Fazer a rotina de higiene do sono e usar a placa conforme orientação recebida."}
,{id:"organizacao-financeira",title:"Organização financeira",icon:"💰",area:"Favoritos pessoais",period:"Diário",priority:"Alta",desc:"Conferir despesas, receitas e pendências financeiras."}
,{id:"postar-status-pessoal",title:"Postar fotos nos status",icon:"📱",area:"Redes sociais",period:"Diário",priority:"Crítica",critical:true,desc:"Publicar fotos ou atualizações nos status das redes sociais.",link:"https://web.whatsapp.com/",linkLabel:"↗ Abrir WhatsApp"}
,{id:"rever-redes",title:"Rever redes sociais (@, 4 etc.)",icon:"🔔",area:"Redes sociais",period:"Diário",priority:"Média",desc:"Conferir notificações e interações nas redes sociais.",link:"https://www.instagram.com/",linkLabel:"↗ Abrir Instagram"}
,{id:"videos-inscricao-youtube",title:"Ver vídeos de inscrição do YouTube",icon:"▶️",area:"Lazer",period:"Diário",priority:"Crítica",critical:true,desc:"Assistir aos vídeos de inscrição do YouTube que estão na lista.",link:"https://www.youtube.com/",linkLabel:"↗ Abrir YouTube"}
,{id:"sessao-gamer",title:"Sessão gamer — Xbox (Palworld ou ARK)",icon:"🎮",area:"Lazer",period:"Diário",priority:"Média",desc:"Reservar um tempo de lazer para jogar Palworld ou ARK no Xbox."}
,{id:"olhar-steam",title:"Olhar Steam",icon:"🎮",area:"Lazer",period:"Diário",priority:"Alta",desc:"Conferir novidades, biblioteca e atualizações na Steam.",link:"https://store.steampowered.com/",linkLabel:"↗ Abrir Steam"}
,{id:"ver-shopee",title:"Ver Shopee",icon:"🛍️",area:"Atividades secundárias",period:"Diário",priority:"Alta",desc:"Conferir a Shopee e os itens de interesse.",link:"https://shopee.com.br/",linkLabel:"↗ Abrir Shopee"}
,{id:"rever-gpts",title:"Rever GPTs do ChatGPT",icon:"✨",area:"Atividades secundárias",period:"Diário",priority:"Média",desc:"Revisar os GPTs salvos e possíveis melhorias.",link:"https://chatgpt.com/gpts",linkLabel:"↗ Abrir meus GPTs"}
,{id:"deixar-seguir-auto",title:"Revisar tarefa de deixar de seguir automaticamente",icon:"👥",area:"Atividades secundárias",period:"Diário",priority:"Baixa",desc:"Conferir a rotina de deixar de seguir contas automaticamente."}
,{id:"manutencao-moto",title:"Manutenção da moto",icon:"🏍️",area:"Outros",period:"Semanal",priority:"Baixa",desc:"Conferir necessidades de manutenção da moto."}
,{id:"tomar-creatina-20h",title:"Tomar creatina — 20h",icon:"💊",area:"Saúde",period:"Noturno",priority:"Alta",attention:true,desc:"Lembrete noturno conforme a rotina pessoal informada."}

];
function updateActivityCounts(){
 const workAreas=["ADM","Comercial","Ambos"];
 const work=tasks.filter(t=>workAreas.includes(t.area)).length;
 const counts=new Map();
 tasks.forEach(t=>counts.set(t.area,(counts.get(t.area)||0)+1));
 const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=String(value)};
 set("generalCount",tasks.length);set("workCount",work);set("personalCount",tasks.length-work);
 const area=document.getElementById("areaFilter");
 if(area)Array.from(area.options).forEach(option=>{
  if(option.value==="all")option.textContent="Todas as áreas ("+tasks.length+")";
  else if(counts.has(option.value)){
   const label=option.textContent.replace(/\s*\(\d+\)$/, "");
   option.textContent=label+" ("+counts.get(option.value)+")";
  }
 });
}
