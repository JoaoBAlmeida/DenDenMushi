import Logo from '../../imagens/logo.png'
import './email.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer';
import api from '../../services/api';

export default function Home() {
    const [remetente, setRemetente] = useState(["joao.a@aln.senaicimatec.edu.br"]);
    const [senha, setSenha] = useState(["C1M4T3C2020"]);
    const [destinatario, setDestinatario] = useState([]);
    const [assunto, setAssunto] = useState([]);
    const [descricao, setDescricao] = useState([]);
    const navigate = useNavigate();

    function LimparVariaveis() {
        setDestinatario("");
        setAssunto("");
        setDescricao("");
    }

    const enviarEmail = async(event) => {
        event.preventDefault();
        let dados = {
            from:remetente,
            pswd:senha,
            to:destinatario,
            about:assunto,
            body:descricao
        }
        await api.post("denDenMushi/Send",dados)
        .then(res=>{
            alert("Email enviado com sucesso");
        }).catch(error=>{
            console.log(error);
            alert("Email não conseguiu ser enviado");
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
                        <h3 className="form-label">Envio de Email</h3>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Destinatário</label>
                        <input type="email" className="form-control" id="InputTitulo" aria-describedby="emailHelp" placeholder="Digite o Email do Destinatário aqui" onChange={(e) => setDestinatario(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Assunto</label>
                        <input type="text" className="form-control border-white" id="InputCategoria" placeholder="Digite o Assunto do Email aqui" onChange={(e) => setAssunto(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <textarea className="form-control textarea-email" placeholder="Digite a Descrição do Email aqui" id="floatingTextarea2" onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <button type="submit" className="btn btn-danger col-4" onClick={LimparVariaveis}>Limpar</button>
                        <button type="submit" className="btn btn-primary col-4">Enviar</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );

}