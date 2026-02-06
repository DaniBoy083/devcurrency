/*
  Componente Header - cabeçalho/navegação principal da aplicação
  Contém o logo que redireciona para a página inicial
*/

import styles from './header.module.css';
import logimg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className={styles.container}>
            {/* Link para home page com logo */}
            <Link to="/">
                <img src={logimg} alt="DevCurrency Logo" />
            </Link>
        </header>
    );
}