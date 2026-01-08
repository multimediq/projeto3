function ReactListaMonumentos() {
  return e('div', { style: { marginTop: '10px' } },
    window.markers.map((marker, idx) => {
      const nome = marker.getPopup().getContent().match(/<h3>(.*?)<\/h3>/)[1];
      return e('button', {
        key: idx,
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
        onClick: () => {
          window.map.flyTo(marker.getLatLng(), 13, { duration: 1.5 });
          marker.openPopup();
        }
      }, nome);
    })
  );
}

// Insere os botões React **embaixo da lista de locais**
const ul = document.getElementById('locais-list');
const reactContainer = document.createElement('div');
reactContainer.id = 'react-root';
ul.parentNode.insertBefore(reactContainer, ul.nextSibling);

ReactDOM.createRoot(document.querySelector('#react-root')).render(e(ReactListaMonumentos));

