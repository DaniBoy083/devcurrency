import styles from './home.module.css';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useState, type FormEvent, useEffect } from 'react';

interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    pricdeUsd: string;
    marketCapUsd: string;
    rank: string;
    changePercent24Hr: string;
    supply: string;
    maxSupply: string;
    vwap24Hr: string;
    volumeUsd24Hr: string;
    explorer: string;
    formatedPrice?: string;
    formatedMarketCap?: string;
    formatedVolume?: string;
}

interface DataProps {
    data: CoinProps[];
}

export function HomePage() {

    const [input, setInput] = useState('');
    const [coins, setCoins] = useState<CoinProps[]>([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        fetch("https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=04a07e84652a8216b58b05be9a2b603a7201ec7db445a28ce65f7c1796503d36")
        .then((response) => response.json())
        .then((data: DataProps) => {
            const coinsData = data.data;
            const price = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            const priceCompact = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
            });
            const formatedCoins = coinsData.map((coin) => {
                const formated = {
                    ...coin,
                    formatedPrice: price.format(Number(coin.pricdeUsd)),
                    formatedMarketCap: priceCompact.format(Number(coin.marketCapUsd)),
                    formatedVolume: priceCompact.format(Number(coin.volumeUsd24Hr))
                }

                return formated;
            })

            setCoins(formatedCoins);
        })
    }

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // Lógica para buscar a moeda com base no input
        if (input === '') return;
        navigate(`/detail/${input}`);
    }

    function handleGetMore() {
        // Lógica para carregar mais moedas
        console.log('Carregar mais moedas...');
    }

    return (
        <main className={styles.container}>
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
                    {coins.length > 0 && coins.map((coin) => (
                        <tr className={styles.tr} key={coin.id}>
                            <td className={styles.tdLabel} data-label="Moeda">
                                <div className={styles.name}>
                                    <img
                                        className={styles.coinIcon}
                                        alt='Logo Cripto'
                                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                                    />
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
                            <td className={Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Últimas 24h">
                                <span>{Number(coin.changePercent24Hr).toFixed(2)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={styles.buttonMore} onClick={handleGetMore}>
                Carregar mais
            </button>
        </main>
    )
}
