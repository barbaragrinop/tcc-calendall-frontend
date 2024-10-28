import * as S from "./style";

import { Header } from "@/components";

export function PrivacyPolicyScreen() {
    return (
        <S.Container>
            <Header.BackButton title="Políticas de Privacidade" />
            <S.Policy>
                <S.Paragraph>Política de Privacidade do Calendall</S.Paragraph>

                <S.Paragraph>Última atualização: 19/09/2024</S.Paragraph>
                <S.Paragraph>
                    Esta Política de Privacidade descreve como coletamos, usamos
                    e protegemos as informações dos usuários do Calendall.
                </S.Paragraph>
                <S.Paragraph>
                    1. Coleta de Informações Coletamos as seguintes informações:
                    Informações de Conta: Nome, e-mail e senha. Dados do
                    Calendário: Acesso ao seu calendário para enviar
                    notificações.
                </S.Paragraph>
                <S.Paragraph>
                    2. Uso das Informações As informações coletadas são
                    utilizadas para: Enviar notificações personalizadas.
                    Melhorar a experiência do usuário no aplicativo.
                    Comunicar-se com os usuários sobre atualizações e promoções.
                </S.Paragraph>
                <S.Paragraph>
                    3. Compartilhamento de Informações Não vendemos, trocamos ou
                    de outra forma transferimos suas informações pessoais a
                    terceiros. Podemos compartilhar informações com prestadores
                    de serviços que auxiliam na operação do aplicativo, desde
                    que concordem em manter a confidencialidade.
                </S.Paragraph>
                <S.Paragraph>
                    4. Segurança das Informações Implementamos medidas de
                    segurança para proteger suas informações pessoais. No
                    entanto, não podemos garantir a segurança absoluta de seus
                    dados.
                </S.Paragraph>
                <S.Paragraph>
                    5. Direitos dos Usuários Você tem o direito de: Acessar suas
                    informações pessoais. Solicitar a correção de informações
                    imprecisas. Solicitar a exclusão de suas informações
                    pessoais.
                </S.Paragraph>
                <S.Paragraph>
                    6. Alterações na Política de Privacidade Reservamo-nos o
                    direito de modificar esta Política de Privacidade a qualquer
                    momento. As alterações serão publicadas nesta página.
                </S.Paragraph>
                <S.Paragraph style={{marginBottom: 30}}>
                    7. Contato Para perguntas sobre esta Política de
                    Privacidade, entre em contato conosco em suporte@calendall.com
                </S.Paragraph>
            </S.Policy>
        </S.Container>
    );
}
