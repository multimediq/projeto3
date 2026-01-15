const { useState, useEffect, useRef } = React;
const e = React.createElement;

function ContadorInvisivel() {
  const [valor, setValor] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setValor(v => v + 1);
    }, 10000);
    return () => clearInterval(id);
  }, []);
  return null;
}

function LoggerInvisivel({ texto }) {
  useEffect(() => {
    if (texto) console.log("React ativo:", texto);
  }, [texto]);
  return null;
}

function EstadoFantasma() {
  const [ativo] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    ref.current = ativo;
  }, [ativo]);
  return null;
}

function BotaoLocal({ marker, nome, index, onSelect }) {
  const [clicks, setClicks] = useState(0);
  function handleClick() {
    setClicks(clicks + 1);
    onSelect(marker, index);
  }
  return e(
    'button',
    {
      style: {
        width: '100%',
        padding: '5px',
        margin: '2px 0',
        cursor: 'pointer',
        backgroundColor: '#00b4d8',
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      },
      onClick: handleClick
    },
    `${nome} (${clicks})`
  );
}

function ListaBotoes() {
  const [markers, setMarkers] = useState([]);
  const [locais, setLocais] = useState([]);
  const [ativo, setAtivo] = useState(null);
  useEffect(() => {
    setMarkers(window.markers || []);
    setLocais(window.locais || []);
  }, []);
  function selecionar(marker, index) {
    setAtivo(index);
    window.map.flyTo(marker.getLatLng(), 13, { duration: 1.5 });
    marker.openPopup();
  }
  function resetMapa() {
    setAtivo(null);
    window.map.setView([20, 0], 2);
  }
  return e(
    'div',
    { style: { marginTop: '10px' } },
    [
      e(ContadorInvisivel),
      e(LoggerInvisivel, { texto: 'Mapa carregado' }),
      e(EstadoFantasma),
      e(
        'button',
        {
          key: 'reset',
          style: {
            width: '100%',
            padding: '5px',
            marginBottom: '6px',
            backgroundColor: ativo === null ? '#0077b6' : '#00b4d8',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          },
          onClick: resetMapa
        },
        'Reset do Mapa'
      ),
      ...markers.map((marker, index) =>
        e(BotaoLocal, {
          key: index,
          marker,
          nome: locais[index]?.nome || `Local ${index + 1}`,
          index,
          onSelect: selecionar
        })
      )
    ]
  );
}

const ul = document.getElementById('locais-list');
const reactContainer = document.createElement('div');
reactContainer.id = 'react-root';
ul.parentNode.insertBefore(reactContainer, ul.nextSibling);
ReactDOM.createRoot(reactContainer).render(e(ListaBotoes));



