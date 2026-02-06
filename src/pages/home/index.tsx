/*
  Página inicial (HomePage) - exibe lista de criptomoedas com busca e paginação
  Comentários em português para facilitar estudo e manutenção
*/

import styles from './home.module.css';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useState, type FormEvent, useEffect } from 'react';

// Interface que descreve a estrutura de uma criptomoeda retornada pela API
export interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    marketCapUsd: string;
    rank: string;
    changePercent24Hr: string;
    supply: string;
    maxSupply: string;
    vwap24Hr: string;
    volumeUsd24Hr: string;
    explorer: string;
    formatedPrice?: string;      // Preço formatado a ser adicionado
    formatedMarketCap?: string;  // Capitalização formatada a ser adicionada
    formatedVolume?: string;     // Volume formatado a ser adicionado
}

// Interface que descreve a estrutura da resposta da API
interface DataProps {
    data: CoinProps[];
}

export function HomePage() {

    // Estado para armazenar o texto da busca
    const [input, setInput] = useState('');
    // Estado para armazenar a lista de moedas carregadas
    const [coins, setCoins] = useState<CoinProps[]>([]);
    // Estado para controlar a paginação (offset da API)
    const [offset, setOffset] = useState(0);

    // Carrega dados sempre que o offset muda (paginação)
    useEffect(() => {
        getData();
    }, [offset]);

    /**
     * Função que fetcha criptomoedas da API
     * Formata os preços e adiciona ao estado
     */
    async function getData() {
        fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=04a07e84652a8216b58b05be9a2b603a7201ec7db445a28ce65f7c1796503d36`)
        .then((response) => response.json())
        .then((data: DataProps) => {
            const coinsData = data.data;
            // Formatador para exibir preço total
            const price = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            // Formatador para exibir preço em formato compacto (k, M, B, etc)
            const priceCompact = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
            });
            // Mapeia array de moedas e adiciona campos formatados
            const formatedCoins = coinsData.map((coin) => {
                const formated = {
                    ...coin,
                    formatedPrice: price.format(Number(coin.priceUsd)),
                    formatedMarketCap: priceCompact.format(Number(coin.marketCapUsd)),
                    formatedVolume: priceCompact.format(Number(coin.volumeUsd24Hr))
                }

                return formated;
            })

            // Concatena moedas antigas com novas (para paginação infinita)
            const listCoins = [...coins, ...formatedCoins];
            setCoins(listCoins);
        })
    }

    const navigate = useNavigate();

    /**
     * Manipulador do formulário de busca
     * Redireciona para página de detalhe da moeda pesquisada
     */
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (input === '') return;
        // Navega para /detail/:cripto
        navigate(`/detail/${input}`);
    }

    /**
     * Manipulador do botão "Carregar mais"
     * Incrementa o offset para buscar próximas moedas
     */
    function handleGetMore() {
        if (offset === 0) {
            setOffset(10);
            return
        }
        setOffset(offset + 10);
    }

    return (
        <main className={styles.container}>
            {/* Formulário de busca */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o nome da moeda..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">
                    <BsSearch size={30} color='white' />
                </button>
            </form>
            {/* Tabela com dados das moedas */}
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor de mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume (24h)</th>
                        <th scope='col'>Últimas 24h</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                    {/* Renderiza cada moeda como uma linha da tabela */}
                    {coins.length > 0 && coins.map((coin) => (
                        <tr className={styles.tr} key={coin.id}>
                            <td className={styles.tdLabel} data-label="Moeda">
                                <div className={styles.name}>
                                    {/* Ícone da moeda */}
                                    <img
                                        className={styles.coinIcon}
                                        alt='Logo Cripto'
                                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                                    />
                                    {/* Link clicável para página de detalhe */}
                                    <Link to={`/detail/${coin.id}`}>
                                        <span>{coin.name}</span> | {coin.symbol}
                                    </Link>
                                </div>
                            </td>
                            <td className={styles.td} data-label="Valor de mercado">
                                {coin.formatedMarketCap}
                            </td>
                            <td className={styles.td} data-label="Preço">
                                {coin.formatedPrice}
                            </td>
                            <td className={styles.td} data-label="Volume (24h)">
                                {coin.formatedVolume}
                            </td>
                            {/* Estilo condicional para ganhos (verde) ou perdas (vermelho) */}
                            <td className={Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Últimas 24h">
                                <span>{Number(coin.changePercent24Hr).toFixed(2)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Botão para carregar mais moedas (paginação) */}
            <button className={styles.buttonMore} onClick={handleGetMore}>
                Carregar mais
            </button>
        </main>
    )
}
