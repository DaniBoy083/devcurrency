import styles from './home.module.css';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';

export function HomePage() {

    const [input, setInput] = useState('');

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
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <div className={styles.name}>
                                <Link to="/detail/bitcoin">
                                    <span>Bitcoin</span> | BTC
                                </Link>
                            </div>
                        </td>
                        <td className={styles.td} data-label="Valor de mercado">
                            1BI
                        </td>
                        <td className={styles.td} data-label="Preço">
                            1BI
                        </td>
                        <td className={styles.td} data-label="Volume (24h)">
                            1BI
                        </td>
                        <td className={styles.tdProfit} data-label="Últimas 24h">
                            <span>1.20</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className={styles.buttonMore} onClick={handleGetMore}>
                Carregar mais
            </button>
        </main>
    )
}
