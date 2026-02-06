/*
  Página de detalhe de uma criptomoeda.
  Comentários em português para facilitar estudo e manutenção.
*/

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type CoinProps } from "../home";
import styles from './detail.module.css';

// Tipos para o retorno da API: sucesso (ResponseData) ou erro (ErrorData)
interface ResponseData {
    data: CoinProps;
}

interface ErrorData {
    error: string;
}

// Union type: a resposta pode ser de um tipo ou outro
type DataProps = ResponseData | ErrorData;

export function DetailPage() {
    // Pega o parâmetro da rota (ex: 'bitcoin')
    const { cripto } = useParams();
    // Hook para navegar programaticamente entre rotas
    const navigate = useNavigate();

    // Estado local para armazenar os dados da moeda e estado de carregamento
    const [coin, setCoin] = useState<CoinProps>();
    const [loading, setLoading] = useState(true);

    // Efeito que carrega os dados ao montar o componente ou quando 'cripto' muda
    useEffect(() => {
        async function getCoin() {
            try {
                // Faz a requisição para a API externa
                fetch("https://rest.coincap.io/v3/assets/" + cripto + "?apiKey=04a07e84652a8216b58b05be9a2b603a7201ec7db445a28ce65f7c1796503d36")
                .then((response) => response.json())
                .then((data: DataProps) => {
                    // Se a resposta tiver a propriedade 'error', redireciona para a home
                    if ('error' in data) {
                        navigate('/');
                        return;
                    }

                    // Formatadores para exibir valores monetários de forma amigável
                    const price = Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    });
                    const priceCompact = Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact',
                    });

                    // Monta um objeto com os dados originais e campos formatados
                    const  resultData = {
                        ...data.data,
                        formatedPrice: price.format(Number(data.data.priceUsd)),
                        formatedMarketCap: priceCompact.format(Number(data.data.marketCapUsd)),
                        formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
                    }

                    // Atualiza estado com os dados processados e marca como carregado
                    setCoin(resultData);
                    setLoading(false);
                })

            }catch (error) {
                // Em caso de erro de rede ou outro, logamos e retornamos à home
                console.log(error);
                navigate('/');
            }
        }

        // Executa a chamada à API
        getCoin();
    }, [cripto]); // Dependência: executa quando 'cripto' muda

    // Enquanto estiver carregando, mostra um indicador simples
    if (loading || !coin) {
        return (
            <div className={styles.container}>
                <h4 className={styles.center}>Carregando...</h4>
            </div>
        )
    }

    // Renderiza os detalhes da criptomoeda
    return (
        <div className={styles.container}>
            <h1 className={styles.center}>{coin?.name}</h1>
            <h1 className={styles.center}>{coin?.symbol}</h1>

            <section className={styles.content}>
                {/* Imagem do ícone da moeda (fonte externa) */}
                <img
                    src={'https://assets.coincap.io/assets/icons/' + coin?.symbol.toLocaleLowerCase() + '@2x.png'}
                    alt="Logo da moeda."
                    className={styles.logo}
                />
                <h1>{coin?.name} | {coin?.symbol}</h1>
                <p>
                    <strong>Preço:</strong> {coin?.formatedPrice}</p>
                <a>
                    <strong>Capitalização de Mercado:</strong> {coin?.formatedMarketCap}</a>
                <a>
                    <strong>Volume (24h):</strong> {coin?.formatedVolume}</a>
                <a>
                    {/* Exibe mudança percentual com estilo condicional (lucro/queda) */}
                    <strong>Mudança 24h:</strong><span className={Number(coin.changePercent24Hr) > 0 ? styles.profit : styles.loss}>{Number(coin.changePercent24Hr).toFixed(2)}%</span>
                </a>
            </section>
        </div>
    )
}