import * as S from "./style";

import { Header } from "../../components";
import { Text } from "react-native";

export function TermsOfUse() {
    return (
        <S.Container>
            <Header title="Termos de Uso" />
            <S.TermsSpace>
                <S.Term>Última atualização: 19/09/2024</S.Term>
                <S.Term>
                    Bem-vindo ao Calendall! Ao usar nosso aplicativo, você
                    concorda com os seguintes termos e condições.
                </S.Term>
                <S.Term>
                    1. Aceitação dos Termos Ao acessar ou usar o Calendall, você
                    concorda em estar vinculado a estes Termos de Uso. Se você
                    não concorda, não utilize o aplicativo.
                </S.Term>
                <S.Term>
                    2. Descrição do Serviço Calendall é um gerenciador acadêmico
                    que envia notificações ao usuário, acessa fotos e integra-se
                    ao calendário pessoal do usuário para melhor organização de
                    compromissos acadêmicos.
                </S.Term>
                <S.Term>
                    3. Uso do Aplicativo Você se compromete a usar o Calendall
                    apenas para fins legais e de acordo com todas as leis
                    aplicáveis. Você não pode: Utilizar o aplicativo de forma
                    fraudulenta ou em violação de direitos de terceiros.
                    Interferir no funcionamento do aplicativo ou tentar acessar
                    suas partes não autorizadas.
                </S.Term>
                <S.Term>
                    4. Conta do Usuário Para utilizar alguns recursos do
                    Calendall, pode ser necessário criar uma conta. Você é
                    responsável por manter a confidencialidade das suas
                    credenciais e por todas as atividades realizadas em sua
                    conta.
                </S.Term>
                <S.Term>
                    5. Propriedade Intelectual Todos os direitos de propriedade
                    intelectual relacionados ao Calendall são de propriedade
                    exclusiva de Calendall. É proibida a reprodução,
                    distribuição ou modificação do aplicativo sem autorização
                    expressa.
                </S.Term>
                <S.Term>
                    6. Isenção de Responsabilidade O Calendall é fornecido "no
                    estado em que se encontra". Não garantimos que o aplicativo
                    será livre de erros ou ininterrupto. Não somos responsáveis
                    por quaisquer danos resultantes do uso do aplicativo.
                </S.Term>
                <S.Term>
                    7. Modificações Reservamo-nos o direito de modificar estes
                    Termos de Uso a qualquer momento. As alterações serão
                    publicadas nesta página e a continuidade do uso do
                    aplicativo implica na aceitação das novas condições.
                </S.Term>
                <S.Term>
                    8. Lei Aplicável Estes Termos de Uso serão regidos e
                    interpretados de acordo com as leis do Brasil, sem
                    considerar os conflitos de leis.
                </S.Term>
                <S.Term  style={{marginBottom: 30}}>
                    9. Contato Para dúvidas ou comentários sobre os Termos de
                    Uso, entre em contato conosco em suporte@calendall.com
                </S.Term>
            </S.TermsSpace>
        </S.Container>
    );
}
