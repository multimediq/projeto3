document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const locais = [
    { nome: "Torre Eiffel", pos: [48.8584, 2.2945], pais: "França", tipo: "Monumento", img: "images.jpeg", desc: "Símbolo icônico de Paris.", curiosidade: "324 metros de altura.", curiosidade2: "É um dos monumentos pagos mais visitados do mundo, com mais de 7 milhões de visitantes por ano." },
    { nome: "Cristo Redentor", pos: [-22.9519, -43.2105], pais: "Brasil", tipo: "Monumento", img: "Christ_the_Redeemer_-_Cristo_Redentor.jpg", desc: "Uma das 7 maravilhas do mundo moderno.", curiosidade: "Inaugurado em 1931.", curiosidade2: "A estátua pesa cerca de 635 toneladas e tem 30 metros de altura." },
    { nome: "Pirâmides de Gizé", pos: [29.9792, 31.1342], pais: "Egito", tipo: "Monumento", img: "All_Gizah_Pyramids.jpg", desc: "Construídas há mais de 4 mil anos.", curiosidade: "A Grande Pirâmide foi a estrutura mais alta do mundo por quase 4 mil anos.", curiosidade2: "Os blocos de pedra usados pesam entre 2,5 e 15 toneladas cada." },
    { nome: "Grande Muralha da China", pos: [40.4319, 116.5704], pais: "China", tipo: "Monumento", img: "y.jpg", desc: "Uma das construções mais longas do mundo.", curiosidade: "Mais de 21.000 km de extensão.", curiosidade2: "É possível ver partes da muralha até do espaço com tecnologia especial, mas não a olho nu." },
    { nome: "Taj Mahal", pos: [27.1751, 78.0421], pais: "Índia", tipo: "Monumento", img: "transferir.jpg", desc: "Mausoléu em memória da esposa do imperador Shah Jahan.", curiosidade: "Uma das 7 maravilhas do mundo moderno.", curiosidade2: "Mudou de cor ao longo do dia devido ao reflexo da luz do sol e da lua." },
    { nome: "Torre de Belém", pos: [38.6916, -9.2157], pais: "Portugal", tipo: "Monumento", img: "transferir.yyy.jpg", desc: "Fortaleza histórica situada à beira do rio Tejo, em Lisboa.", curiosidade: "Construída no século XVI.", curiosidade2: "Foi classificada como Patrimônio Mundial pela UNESCO em 1983." },
    { nome: "Big Ben", pos: [51.5007, -0.1246], pais: "Reino Unido", tipo: "Relógio/Monumento", img: "big.ben.jpg", desc: "Símbolo icônico de Londres, famoso pelo seu grande relógio.", curiosidade: "O nome 'Big Ben' refere-se ao sino, não à torre.", curiosidade2: "A torre foi renomeada como Elizabeth Tower em 2012 em homenagem à Rainha." },
    { nome: "Acrópole", pos: [37.9715, 23.7257], pais: "Grécia", tipo: "Monumento Histórico", img: "atenas-8.jpg", desc: "Complexo de templos antigos no topo de uma colina em Atenas.", curiosidade: "O Partenon é o templo mais famoso da Acrópole.", curiosidade2: "Construído no século V a.C., simboliza a glória da Grécia Antiga." },
    { nome: "Sagrada Família", pos: [41.4036, 2.1744], pais: "Espanha", tipo: "Basílica", img: "uu.jpg", desc: "Famosa basílica em Barcelona projetada por Antoni Gaudí.", curiosidade: "Em construção desde 1882.", curiosidade2: "Prevê-se a conclusão para 2026, no centenário da morte de Gaudí." },
    { nome: "Palácio do Louvre", pos: [48.8606, 2.3376], pais: "França", tipo: "Museu/Palácio", img: "1336.jpg", desc: "Museu icônico de Paris, lar da Mona Lisa e de outras obras famosas.", curiosidade: "Originalmente um palácio real.", curiosidade2: "O Louvre é o museu mais visitado do mundo, com milhões de visitantes anualmente." }
  ];

  let popupAberto = null;

  function criarPopup(local) {
    return `
      <div class="popup-content">
        <h3>${local.nome}</h3>
        <img src="${local.img}" alt="${local.nome}">
        <p><b>País:</b> ${local.pais}</p>
        <p><b>Tipo:</b> ${local.tipo}</p>
        <p>${local.desc}</p>
        <p><b>Curiosidade:</b> ${local.curiosidade}</p>
        ${local.curiosidade2 ? `<p><b>Curiosidade 2:</b> ${local.curiosidade2}</p>` : ''}
      </div>
    `;
  }

  const ul = document.getElementById('locais-list');

  window.map = map;
  window.markers = [];

  locais.forEach(local => {
    const marker = L.marker(local.pos).addTo(map);
    marker.bindPopup(criarPopup(local));
    window.markers.push(marker);

    const li = document.createElement('li');
    li.textContent = local.nome;

    li.addEventListener('click', () => {
      if (popupAberto) popupAberto.closePopup();
      map.flyTo(local.pos, 13, { duration: 1.5 });
      setTimeout(() => { marker.openPopup(); popupAberto = marker; }, 1500);
    });

    ul.appendChild(li);
  });
});
