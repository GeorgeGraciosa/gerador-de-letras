import { useState, useEffect } from 'react';

const alfabetoOriginal = [
  { letra: 'A', numero: 1 },
  { letra: 'B', numero: 2 },
  { letra: 'C', numero: 3 },
  { letra: 'D', numero: 4 },
  { letra: 'E', numero: 5 },
  { letra: 'F', numero: 6 },
  { letra: 'G', numero: 7 },
  { letra: 'H', numero: 8 },
  { letra: 'I', numero: 9 },
  { letra: 'J', numero: 10 },
  { letra: 'K', numero: 11 },
  { letra: 'L', numero: 12 },
  { letra: 'M', numero: 13 },
  { letra: 'N', numero: 14 },
  { letra: 'O', numero: 15 },
  { letra: 'P', numero: 16 },
  { letra: 'Q', numero: 17 },
  { letra: 'R', numero: 18 },
  { letra: 'S', numero: 19 },
  { letra: 'T', numero: 20 },
  { letra: 'U', numero: 21 },
  { letra: 'V', numero: 22 },
  { letra: 'W', numero: 23 },
  { letra: 'X', numero: 24 },
  { letra: 'Y', numero: 25 },
  { letra: 'Z', numero: 26 },
];

function Home() {
  const [novoAlfabeto, setNovoAlfabeto] = useState(alfabetoOriginal);
  const [letraGerada, setLetraGerada] = useState('');
  const [removidos, setRemovidos] = useState([]);

  useEffect(() => {
    if (novoAlfabeto.length === 0 && removidos.length > 0) {
      setLetraGerada('Acabou o alfabeto');
    }
  }, [novoAlfabeto, removidos]);

  function gerador() {
    const numeroAleatorio = Math.floor(Math.random() * 26) + 1;
    const comparador = novoAlfabeto.find(
      (letra) => letra.numero === numeroAleatorio
    );

    if (!comparador) {
      return gerador();
    }

    setLetraGerada(comparador.letra);

    const removerLetra = novoAlfabeto.filter(
      (letra) => letra.numero !== comparador.numero
    );
    setNovoAlfabeto(removerLetra);

    const removidosAlfabeto = [...removidos, comparador.letra];
    setRemovidos(removidosAlfabeto);
  }

  function limparLista() {
    setNovoAlfabeto(alfabetoOriginal);
    setRemovidos([]);
    setLetraGerada('');
  }

  return (
    <>
      <div className='title'>
        <h1>Gerador de Letras</h1>
      </div>

      <div className='gerador'>
        {removidos.length === 0 ? (
          <>
            <p>Começe a jogar!</p>
            <button onClick={gerador}>Gerar</button>
          </>
        ) : (
          <>
            <p>{letraGerada}</p>
            <button onClick={gerador} disabled={novoAlfabeto.length === 0}>
              Gerar
            </button>
          </>
        )}
      </div>

      <div className='gerados'>
        {removidos.map((letraRemovida, index) => {
          return <p key={index}>{letraRemovida}</p>;
        })}
      </div>
      <div className='limpar-lista'>
        <button onClick={limparLista} disabled={removidos.length === 0}>
          Limpar
        </button>
      </div>
    </>
  );
}

export default Home;
