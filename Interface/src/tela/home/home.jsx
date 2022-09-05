import Logo from '../../imagens/logo.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer';
import api from '../../services/api';

export default function Home() {
    const [email, setEmail] = useState([]);
    const [senha, setSenha] = useState([]);
    const navigate = useNavigate();
    function RedirecionarEmail() {
        navigate('/email');
    }

    const login = async(event) => {
        event.preventDefault();
        const dados = {
            email: email,
            pswd: senha
        }
        await api.post("denDenMushi/Login", { dados })
        .then(res=>{
            RedirecionarEmail();
        }).catch(error=>{
            console.log(error);
            alert("Erro ao executar Login, usuário ou senha inválida");
        })
    }

    return (
        <div className="bg-light ">
            <Header />

            <div className="container-fluid p-5 d-flex align-items-center justify-content-center w-100 box-login ">
                <form className="col-4 fundo-azul-marinho text-white py-5 px-4 rounded tamanho-form">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <img src={Logo} alt="docker" width="60" height="60" className="d-inline-block align-text-top " />
                    </div>
                    <div className="mb-3 border-bottom">
                        <h3 for="exampleInputEmail1" className="form-label">Login</h3>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Digite seu email aqui" onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input type="password" className="form-control border-white" id="InputPassword1" placeholder="Digite sua senha aqui" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={login}>Enviar</button>
                </form>
            </div>

            <Footer />
        </div>
    );

}