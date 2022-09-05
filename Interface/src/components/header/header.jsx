import Logo from '../../imagens/logo.png'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    function RedirecionarHome() {
        navigate('/');
    }

    return (
        <nav className="navbar fundo-azul-marinho">
            <div className="container-fluid">
                <a className="navbar-brand text-white justify-content-between d-flex align-itens-center" onClick={RedirecionarHome} >
                    <img src={Logo} alt="docker" width="30" height="30" class="d-inline-block align-text-top " />
                    <h5 className="px-2">DEN DEN MUSHI SYSTEM</h5>
                </a>

            </div>
        </nav>
    );

}