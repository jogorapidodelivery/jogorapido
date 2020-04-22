import { SDNavigation } from "@sd/navigation"
import reducers from "@reducers/index";
import Autenticacao from "@screens/autenticacao";
import Alerta from "@modal/alerta";
import Carregando from "@modal/carregando";
import Confirma from "@modal/confirma";
import Conectar from "@screens/autenticacao/conectar";
import CriarConta from "@screens/autenticacao/criar-conta";
import ValidarEmail from "@screens/autenticacao/validar-email";
import RecuperarSenha from "@screens/autenticacao/recuperar-senha";
import ChecarTokenEmailGoRecuperarSenha from "@screens/autenticacao/recuperar-senha/checar-token-email";
import AlterarSenha from "@screens/autenticacao/recuperar-senha/alterar-senha";
import Gaveta from "@screens/home/menu";
import Home from "@screens/home";
import ChecarTokenEmailGoHome from "@screens/autenticacao/validar-email/checar-token-email/index";
import Coletar from "@screens/coleta-e-entrega";
import MeusDadosChecarTokenEmail from "@screens/home/meus-dados/checar-token-email/index";
import MeusDadosAlterarSenha from "@screens/home/meus-dados/alterar-senha/index";
import Extrato from "@screens/extrato";
import Disponibilidade from "@screens/disponibilidade";
import moment from "moment"
import ptLocale from "moment/locale/pt";
import Camera from "@screens/camera/index";
moment.updateLocale("pt", ptLocale)
SDNavigation.registerScreens({
    autenticacao: { name: "autenticacao", screen: Autenticacao },
    alerta: { name: "alerta", screen: Alerta },
    carregando: { name: "carregando", screen: Carregando },
    confirma: { name: "confirma", screen: Confirma },
    conectar: { name: "conectar", screen: Conectar },
    criarConta: { name: "criarConta", screen: CriarConta },
    validarEmail: { name: "validarEmail", screen: ValidarEmail },
    recuperarSenha: { name: "recuperarSenha", screen: RecuperarSenha },
    checarTokenEmailGoRecuperarSenha: { name: "checarTokenEmailGoRecuperarSenha", screen: ChecarTokenEmailGoRecuperarSenha },
    checarTokenEmailGoHome: { name: "checarTokenEmailGoHome", screen: ChecarTokenEmailGoHome },
    camera: { name: "camera", screen: Camera },
    alterarSenha: { name: "alterarSenha", screen: AlterarSenha },
    home: { name: "home", screen: Home },
    extrato: { name: "extrato", screen: Extrato },
    disponibilidade: { name: "disponibilidade", screen: Disponibilidade },
    coletar: { name: "coletar", screen: Coletar },
    meusDadosChecarTokenEmail: { name: "meusDadosChecarTokenEmail", screen: MeusDadosChecarTokenEmail },
    meusDadosAlterarSenha: { name: "meusDadosAlterarSenha", screen: MeusDadosAlterarSenha }
});

SDNavigation.addModal([
    SDNavigation.addSwitch([
        "autenticacao",
        SDNavigation.addStack([
            "conectar",
            "recuperarSenha",
            "checarTokenEmailGoRecuperarSenha",
            "alterarSenha",
            "criarConta"
        ]),
        SDNavigation.addDrawer(Gaveta, [
            SDNavigation.addStack([
                "home",
                "extrato",
                "disponibilidade",
                "meusDadosChecarTokenEmail",
                "meusDadosAlterarSenha",
                "camera"
            ])
        ]),
        SDNavigation.addStack(["validarEmail", "checarTokenEmailGoHome"]),
        SDNavigation.addStack(["coletar"])
    ]),
    "alerta",
    "carregando",
    "confirma"
]);
export default SDNavigation.initProject(reducers);