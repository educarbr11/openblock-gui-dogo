/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';

import styles from './legal-page.css';

const LAST_UPDATED = '24 de agosto de 2026';
const CONTACT_EMAIL = 'contato@editoradogomaker.com';

const scrollToSection = event => {
    const section = document.getElementById(event.currentTarget.dataset.section);
    if (section) section.scrollIntoView({behavior: 'smooth', block: 'start'});
};

const LegalLayout = ({children, description, sections, title}) => (
    <main className={styles.page}>
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <p className={styles.eyebrow}>{'DOCUMENTOS LEGAIS'}</p>
                <h1>{title}</h1>
                <p className={styles.description}>{description}</p>
                <p className={styles.updated}>{`Última atualização: ${LAST_UPDATED}`}</p>
            </div>
        </header>
        <div className={styles.layout}>
            <nav
                aria-label={`Seções de ${title}`}
                className={styles.navigation}
            >
                <strong>{'Nesta página'}</strong>
                {sections.map(section => (
                    <button
                        data-section={section.id}
                        key={section.id}
                        type="button"
                        onClick={scrollToSection}
                    >
                        {section.label}
                    </button>
                ))}
            </nav>
            <article className={styles.content}>
                {children}
            </article>
        </div>
    </main>
);

LegalLayout.propTypes = {
    children: PropTypes.node.isRequired,
    description: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    title: PropTypes.string.isRequired
};

const TermsOfUse = () => {
    const sections = [
        {id: 'aceitacao', label: 'Aceitação'},
        {id: 'servicos', label: 'Serviços oferecidos'},
        {id: 'conta', label: 'Conta e segurança'},
        {id: 'menores', label: 'Crianças e adolescentes'},
        {id: 'conteudo', label: 'Projetos e conteúdo'},
        {id: 'uso-aceitavel', label: 'Uso aceitável'},
        {id: 'hardware', label: 'Placas e dispositivos'},
        {id: 'disponibilidade', label: 'Disponibilidade'},
        {id: 'propriedade', label: 'Propriedade intelectual'},
        {id: 'suspensao', label: 'Suspensão e encerramento'},
        {id: 'responsabilidade', label: 'Responsabilidades'},
        {id: 'alteracoes', label: 'Alterações dos termos'},
        {id: 'legislacao', label: 'Legislação e contato'}
    ];

    return (
        <LegalLayout
            description="Regras para acessar e utilizar o editor, a comunidade, os aplicativos e os serviços DoGo Block."
            sections={sections}
            title="Termos de Uso"
        >
            <section id="aceitacao">
                <h2>{'1. Aceitação'}</h2>
                <p>
                    {'Estes Termos de Uso regulam o acesso ao DoGo Block, serviço educacional operado pela Editora DogoMaker. Ao criar uma conta, acessar ou utilizar o serviço, você declara que leu e concorda com estes Termos e com a '}
                    <a href="#/politica-de-privacidade">{'Política de Privacidade'}</a>
                    {'. Se você não concordar, não utilize as funcionalidades que exigem essa aceitação.'}
                </p>
            </section>

            <section id="servicos">
                <h2>{'2. Serviços oferecidos'}</h2>
                <p>{'O DoGo Block permite, conforme a versão utilizada:'}</p>
                <ul>
                    <li>{'criar projetos com programação em blocos e código gerado;'}</li>
                    <li>{'salvar, importar, exportar, compartilhar e remixar projetos;'}</li>
                    <li>{'publicar projetos, comentários e informações de perfil;'}</li>
                    <li>{'compilar programas e enviar firmware ou código para placas compatíveis;'}</li>
                    <li>{'usar recursos locais, como câmera, microfone, USB, Bluetooth ou o DoGoBlock Agent, quando autorizados no dispositivo.'}</li>
                </ul>
                <p>
                    {'Algumas funções dependem de conta, conexão com a internet, navegador compatível, aplicativo auxiliar, placa física ou serviços de terceiros.'}
                </p>
            </section>

            <section id="conta">
                <h2>{'3. Conta e segurança'}</h2>
                <p>
                    {'Você deve fornecer informações corretas, manter seus dados atualizados e proteger sua senha e seus dispositivos. A conta é pessoal e não deve ser cedida. Informe imediatamente qualquer uso não autorizado pelo canal de contato.'}
                </p>
                <p>
                    {'Você é responsável pelas ações realizadas em sua conta, salvo quando decorrentes de falha comprovadamente atribuível ao serviço ou de outra hipótese prevista em lei.'}
                </p>
            </section>

            <section id="menores">
                <h2>{'4. Crianças e adolescentes'}</h2>
                <p>
                    {'O DoGo Block tem finalidade educacional. Crianças e adolescentes devem utilizar o serviço em seu melhor interesse e com acompanhamento compatível com sua idade. Menores de 18 anos precisam da autorização de seu responsável legal para criar uma conta.'}
                </p>
                <p>
                    {'Crianças menores de 12 anos não devem criar conta sozinhas. O cadastro e o uso devem ser realizados ou autorizados de forma específica por responsável legal ou por instituição de ensino legitimada, observada a legislação aplicável.'}
                </p>
            </section>

            <section id="conteudo">
                <h2>{'5. Projetos e conteúdo do usuário'}</h2>
                <p>
                    {'Você mantém os direitos que possuir sobre projetos, imagens, sons, textos e demais conteúdos enviados. Ao armazenar conteúdo no DoGo Block, concede apenas a autorização necessária para hospedar, processar, reproduzir tecnicamente e disponibilizar esse conteúdo de acordo com a visibilidade escolhida.'}
                </p>
                <p>
                    {'Projetos privados ficam acessíveis conforme as permissões da conta. Projetos não listados podem ser acessados por quem possuir o link. Projetos públicos, perfil, comentários e interações podem ser vistos por outras pessoas.'}
                </p>
                <p>
                    {'Envie somente conteúdo próprio ou que você tenha autorização para utilizar. Você é responsável por créditos, licenças e permissões de terceiros.'}
                </p>
            </section>

            <section id="uso-aceitavel">
                <h2>{'6. Uso aceitável'}</h2>
                <p>{'É proibido utilizar o DoGo Block para:'}</p>
                <ul>
                    <li>{'violar leis, direitos autorais, privacidade ou outros direitos de terceiros;'}</li>
                    <li>{'publicar conteúdo ilegal, discriminatório, abusivo, sexualmente explícito, fraudulento ou que coloque menores em risco;'}</li>
                    <li>{'assediar pessoas, divulgar dados pessoais sem autorização ou se passar por terceiros;'}</li>
                    <li>{'distribuir malware, explorar vulnerabilidades ou tentar acessar contas e sistemas sem autorização;'}</li>
                    <li>{'sobrecarregar, automatizar abusivamente, contornar limites ou interferir no funcionamento do serviço;'}</li>
                    <li>{'usar recursos educacionais ou de hardware de forma que possa causar dano a pessoas, equipamentos ou ambientes.'}</li>
                </ul>
            </section>

            <section id="hardware">
                <h2>{'7. Placas, firmware e dispositivos'}</h2>
                <p>
                    {'A programação de placas envolve eletricidade, componentes físicos, drivers, portas USB e firmware. Confira tensão, polaridade, corrente, pinagem e instruções do fabricante antes de conectar qualquer componente. Crianças devem realizar atividades de hardware com supervisão adequada.'}
                </p>
                <p>
                    {'O envio de um programa pode substituir o firmware existente e interromper o modo palco até que o firmware correto seja reinstalado. Mantenha cópias de projetos e siga as mensagens apresentadas pelo editor.'}
                </p>
            </section>

            <section id="disponibilidade">
                <h2>{'8. Disponibilidade e alterações do serviço'}</h2>
                <p>
                    {'Podemos corrigir, atualizar, limitar, substituir ou descontinuar funcionalidades por motivos técnicos, legais, de segurança ou de evolução do produto. Buscaremos comunicar mudanças relevantes quando razoavelmente possível.'}
                </p>
                <p>
                    {'Não garantimos funcionamento ininterrupto em todos os navegadores, sistemas operacionais, redes, placas ou serviços de terceiros. O usuário deve manter cópias locais dos projetos importantes.'}
                </p>
            </section>

            <section id="propriedade">
                <h2>{'9. Propriedade intelectual'}</h2>
                <p>
                    {'A marca DoGo Block, identidade visual, conteúdo editorial e componentes próprios são protegidos pela legislação aplicável. Componentes de código aberto permanecem sujeitos às licenças indicadas em seus respectivos repositórios e distribuições.'}
                </p>
            </section>

            <section id="suspensao">
                <h2>{'10. Suspensão e encerramento'}</h2>
                <p>
                    {'Podemos restringir conteúdo ou suspender contas quando houver violação destes Termos, risco à segurança, ordem de autoridade competente ou necessidade de proteger usuários e o serviço. Quando aplicável, o usuário poderá solicitar esclarecimentos pelo canal de contato.'}
                </p>
                <p>
                    {'O usuário pode deixar de utilizar o serviço e solicitar o encerramento da conta e a exclusão de dados, observadas as hipóteses legais de retenção descritas na Política de Privacidade.'}
                </p>
            </section>

            <section id="responsabilidade">
                <h2>{'11. Responsabilidades e garantias'}</h2>
                <p>
                    {'O DoGo Block é fornecido para fins educacionais e criativos. Na extensão permitida pela legislação, não nos responsabilizamos por conteúdo de usuários, incompatibilidade de equipamentos, falhas causadas por terceiros, uso incorreto de circuitos ou perda evitável de arquivos sem cópia de segurança.'}
                </p>
                <p>
                    {'Nada nestes Termos exclui direitos garantidos pelo Código de Defesa do Consumidor ou limita responsabilidade que não possa ser afastada por lei.'}
                </p>
            </section>

            <section id="alteracoes">
                <h2>{'12. Alterações destes Termos'}</h2>
                <p>
                    {'Estes Termos podem ser atualizados para refletir mudanças no serviço ou na legislação. A data da versão será indicada no início da página. Mudanças relevantes poderão ser comunicadas pela interface ou por outro canal disponível.'}
                </p>
            </section>

            <section id="legislacao">
                <h2>{'13. Legislação aplicável e contato'}</h2>
                <p>
                    {'Aplicam-se as leis da República Federativa do Brasil, respeitados os direitos do consumidor e as regras legais de competência. Antes de uma medida formal, recomendamos entrar em contato para buscar uma solução.'}
                </p>
                <address>
                    <strong>{'Editora DogoMaker'}</strong>
                    <span>{'BR-316, Km 7, nº 186, Qd. 201, Lt. 4776 (Loja), Centro, Ananindeua - PA'}</span>
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    <span>{'(31) 99259-9654'}</span>
                </address>
            </section>
        </LegalLayout>
    );
};

const PrivacyPolicy = () => {
    const sections = [
        {id: 'controlador', label: 'Quem controla os dados'},
        {id: 'dados', label: 'Dados tratados'},
        {id: 'finalidades', label: 'Finalidades e bases legais'},
        {id: 'publicacao', label: 'Conteúdo público'},
        {id: 'dispositivo', label: 'Hardware e permissões'},
        {id: 'cookies', label: 'Cookies e armazenamento local'},
        {id: 'compartilhamento', label: 'Compartilhamento'},
        {id: 'transferencia', label: 'Transferência internacional'},
        {id: 'retencao', label: 'Retenção e exclusão'},
        {id: 'seguranca', label: 'Segurança'},
        {id: 'direitos', label: 'Seus direitos'},
        {id: 'criancas', label: 'Crianças e adolescentes'},
        {id: 'mudancas', label: 'Mudanças e contato'}
    ];

    return (
        <LegalLayout
            description="Como coletamos, utilizamos, armazenamos e compartilhamos dados pessoais no ecossistema DoGo Block."
            sections={sections}
            title="Política de Privacidade"
        >
            <section id="controlador">
                <h2>{'1. Controlador e abrangência'}</h2>
                <p>
                    {'A Editora DogoMaker é responsável pelas decisões sobre o tratamento de dados pessoais no DoGo Block Web e nos serviços associados que operar. Esta Política abrange o site, a API, a comunidade, a compilação online e os aplicativos oficiais quando conectados a esses serviços.'}
                </p>
                <p>
                    {'Versões Desktop ou Mobile podem processar projetos e dados de hardware localmente. Serviços externos acessados por links possuem políticas próprias.'}
                </p>
            </section>

            <section id="dados">
                <h2>{'2. Dados pessoais que tratamos'}</h2>
                <div className={styles.tableWrap}>
                    <table>
                        <thead>
                            <tr>
                                <th>{'Categoria'}</th>
                                <th>{'Exemplos'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{'Cadastro e autenticação'}</td>
                                <td>{'Nome, nome de usuário, e-mail, senha protegida por hash, tokens de sessão e redefinição de senha.'}</td>
                            </tr>
                            <tr>
                                <td>{'Perfil e comunidade'}</td>
                                <td>{'Avatar, biografia, atividade atual, projetos, comentários, respostas, curtidas, favoritos, remixes e notificações.'}</td>
                            </tr>
                            <tr>
                                <td>{'Projetos e assets'}</td>
                                <td>{'Código em blocos, JSON do projeto, títulos, descrições, instruções, créditos, capas, imagens, sons e metadados de arquivos.'}</td>
                            </tr>
                            <tr>
                                <td>{'Compilação'}</td>
                                <td>{'Código Arduino ou MicroPython, placa selecionada, bibliotecas, tamanho do código, logs, erros e artefatos temporários.'}</td>
                            </tr>
                            <tr>
                                <td>{'Uso e segurança'}</td>
                                <td>{'Endereço IP, datas, páginas e ações, visualizações de projetos, navegador, sistema, falhas e registros técnicos.'}</td>
                            </tr>
                            <tr>
                                <td>{'Atendimento'}</td>
                                <td>{'E-mail e conteúdo das solicitações enviadas ao suporte ou sobre direitos de privacidade.'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="finalidades">
                <h2>{'3. Para que usamos os dados'}</h2>
                <p>{'Tratamos dados para:'}</p>
                <ul>
                    <li>{'criar e proteger contas, autenticar usuários e recuperar senhas;'}</li>
                    <li>{'salvar, carregar, compartilhar e administrar projetos e assets;'}</li>
                    <li>{'oferecer perfis, comentários, curtidas, favoritos, remixes e notificações;'}</li>
                    <li>{'compilar código, gerar artefatos e diagnosticar falhas de compilação;'}</li>
                    <li>{'prevenir abuso, fraude, incidentes e acessos não autorizados;'}</li>
                    <li>{'medir desempenho e uso, corrigir erros e melhorar o produto;'}</li>
                    <li>{'responder solicitações, cumprir obrigações legais e exercer direitos em processos.'}</li>
                </ul>
                <p>
                    {'Conforme o contexto, as bases legais podem incluir execução do contrato e procedimentos solicitados pelo usuário, cumprimento de obrigação legal, exercício regular de direitos, legítimo interesse com avaliação de necessidade e impacto, proteção do titular e consentimento quando exigido.'}
                </p>
            </section>

            <section id="publicacao">
                <h2>{'4. Conteúdo público e visibilidade'}</h2>
                <p>
                    {'Nome de usuário, nome exibido, avatar, biografia e projetos públicos podem ser vistos por qualquer pessoa. Comentários e interações ficam associados ao perfil. Projetos não listados podem ser acessados por quem receber o link. Não publique dados pessoais, imagens ou informações de terceiros sem autorização.'}
                </p>
                <p>
                    {'Projetos privados não são exibidos publicamente, mas são processados e armazenados para prestar o serviço ao titular da conta.'}
                </p>
            </section>

            <section id="dispositivo">
                <h2>{'5. Câmera, microfone, USB, Bluetooth e Agent'}</h2>
                <p>
                    {'Algumas extensões podem solicitar acesso à câmera ou ao microfone. Em regra, a detecção e a execução acontecem no dispositivo. Uma gravação, imagem ou resultado somente integra o projeto ou é enviado ao servidor quando a funcionalidade utilizada exigir isso e o usuário realizar a ação correspondente.'}
                </p>
                <p>
                    {'Web Serial, Web USB, Web Bluetooth e DoGoBlock Agent podem tratar localmente informações da placa, como porta, identificadores do dispositivo e dados da comunicação. Código enviado para compilação online é tratado pela API antes de o artefato retornar ao navegador ou ao Agent.'}
                </p>
            </section>

            <section id="cookies">
                <h2>{'6. Cookies, analytics e armazenamento local'}</h2>
                <p>
                    {'O DoGo Block usa armazenamento local necessário para manter a sessão autenticada e preferências da aplicação. Esses dados permanecem no navegador até a expiração, saída da conta, limpeza pelo usuário ou substituição técnica.'}
                </p>
                <p>
                    {'Quando configurado, o Google Analytics 4 coleta informações de navegação e desempenho, podendo usar identificadores e cookies analíticos. Esses dados ajudam a entender páginas acessadas, eventos de uso, erros e características gerais do dispositivo. O provedor pode tratar dados conforme seus próprios termos e políticas.'}
                </p>
                <p>
                    {'Você pode bloquear ou apagar cookies e dados locais nas configurações do navegador. O bloqueio do armazenamento estritamente necessário pode impedir login e outras funcionalidades. Bloqueadores de conteúdo também podem impedir a medição analítica.'}
                </p>
            </section>

            <section id="compartilhamento">
                <h2>{'7. Com quem podemos compartilhar dados'}</h2>
                <p>{'Podemos compartilhar apenas os dados necessários com:'}</p>
                <ul>
                    <li>{'provedores de hospedagem, banco de dados, entrega de conteúdo e armazenamento, incluindo infraestrutura Cloudflare quando configurada;'}</li>
                    <li>{'provedores de e-mail para recuperação de senha e comunicações operacionais;'}</li>
                    <li>{'Google Analytics, quando a medição estiver habilitada;'}</li>
                    <li>{'prestadores que apoiem segurança, manutenção e atendimento;'}</li>
                    <li>{'autoridades públicas, mediante obrigação legal, ordem válida ou necessidade de exercício de direitos;'}</li>
                    <li>{'outra organização em reorganização societária, observados a legislação e os direitos dos titulares.'}</li>
                </ul>
                <p>{'Não vendemos dados pessoais.'}</p>
            </section>

            <section id="transferencia">
                <h2>{'8. Transferência internacional'}</h2>
                <p>
                    {'Alguns fornecedores de infraestrutura e analytics podem armazenar ou processar dados fora do Brasil. Nesses casos, buscamos utilizar fornecedores e mecanismos compatíveis com a LGPD e limitar o compartilhamento ao necessário para a finalidade informada.'}
                </p>
            </section>

            <section id="retencao">
                <h2>{'9. Retenção e exclusão'}</h2>
                <p>
                    {'Mantemos dados pelo tempo necessário para prestar o serviço, cumprir obrigações legais, prevenir abuso e exercer direitos. Conta, perfil e projetos permanecem enquanto a conta estiver ativa ou até solicitação válida de exclusão, ressalvadas retenções obrigatórias e ciclos de backup.'}
                </p>
                <p>
                    {'Jobs de compilação e seus artefatos são temporários. A configuração padrão atual mantém o artefato final por até 30 minutos e remove arquivos intermediários após a compilação; esse prazo pode ser ajustado por necessidade operacional.'}
                </p>
                <p>
                    {'Conteúdo público removido pode permanecer temporariamente em caches, backups ou cópias feitas legitimamente por outros usuários antes da remoção.'}
                </p>
            </section>

            <section id="seguranca">
                <h2>{'10. Segurança da informação'}</h2>
                <p>
                    {'Adotamos medidas técnicas e administrativas proporcionais aos riscos, incluindo controle de acesso, hash de senhas, autenticação por token, validação de entradas, HTTPS em produção e limitação da retenção de artefatos. Nenhum sistema é totalmente imune a incidentes.'}
                </p>
                <p>
                    {'Proteja sua senha, encerre sessões em equipamentos compartilhados e não inclua segredos, senhas ou dados pessoais desnecessários em projetos e códigos enviados para compilação.'}
                </p>
            </section>

            <section id="direitos">
                <h2>{'11. Direitos dos titulares'}</h2>
                <p>{'Nos termos da LGPD, você pode solicitar, conforme aplicável:'}</p>
                <ul>
                    <li>{'confirmação e acesso aos dados;'}</li>
                    <li>{'correção de informações incompletas, inexatas ou desatualizadas;'}</li>
                    <li>{'informações sobre compartilhamento e critérios de tratamento;'}</li>
                    <li>{'anonimização, bloqueio ou eliminação de dados desnecessários ou tratados irregularmente;'}</li>
                    <li>{'portabilidade, quando regulamentada e tecnicamente aplicável;'}</li>
                    <li>{'eliminação de dados tratados com consentimento, ressalvadas as hipóteses legais de conservação;'}</li>
                    <li>{'revogação do consentimento ou oposição ao tratamento, quando cabível;'}</li>
                    <li>{'revisão de decisões exclusivamente automatizadas que afetem seus interesses.'}</li>
                </ul>
                <p>
                    {'Envie a solicitação para '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    {'. Poderemos pedir informações para confirmar a identidade e proteger a conta. Solicitações também podem ser apresentadas aos órgãos de defesa do consumidor e à Autoridade Nacional de Proteção de Dados, observados os requisitos legais.'}
                </p>
                <p>
                    <a
                        href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {'Conheça os direitos dos titulares no site da ANPD'}
                    </a>
                    {'.'}
                </p>
            </section>

            <section id="criancas">
                <h2>{'12. Privacidade de crianças e adolescentes'}</h2>
                <p>
                    {'Tratamos dados de crianças e adolescentes em seu melhor interesse. Responsáveis e instituições devem evitar a inclusão de dados excessivos em nomes de usuário, perfis, projetos ou comentários e supervisionar a escolha de visibilidade.'}
                </p>
                <p>
                    {'Crianças menores de 12 anos devem utilizar conta criada ou especificamente autorizada por responsável legal ou instituição legitimada. O responsável pode exercer os direitos de privacidade em nome da criança, sujeito à verificação adequada.'}
                </p>
            </section>

            <section id="mudancas">
                <h2>{'13. Mudanças e contato'}</h2>
                <p>
                    {'Podemos atualizar esta Política para refletir alterações legais, técnicas ou operacionais. A data da versão será indicada no início da página e mudanças relevantes poderão ser comunicadas pela interface.'}
                </p>
                <address>
                    <strong>{'Editora DogoMaker'}</strong>
                    <span>{'Privacidade e proteção de dados'}</span>
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    <span>{'BR-316, Km 7, nº 186, Qd. 201, Lt. 4776 (Loja), Centro, Ananindeua - PA'}</span>
                </address>
                <p className={styles.legalNotice}>
                    {'Este documento descreve o funcionamento técnico verificado em agosto de 2026 e deve ser revisado por profissional jurídico antes da publicação definitiva.'}
                </p>
            </section>
        </LegalLayout>
    );
};

const LegalPage = ({type}) => (
    type === 'terms' ? <TermsOfUse /> : <PrivacyPolicy />
);

LegalPage.propTypes = {
    type: PropTypes.oneOf(['privacy', 'terms']).isRequired
};

export default LegalPage;
