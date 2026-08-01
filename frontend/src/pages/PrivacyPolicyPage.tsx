import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const SECTIONS = [
  {
    title: '1. Informações que Coletamos',
    content: `Coletamos as informações que você nos fornece diretamente, como nome, e-mail, telefone e outras informações de contato ao preencher formulários em nosso site. Também podemos coletar automaticamente dados técnicos como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência no site por meio de cookies e tecnologias similares.`,
  },
  {
    title: '2. Como Utilizamos suas Informações',
    content: `Utilizamos suas informações para:
• Entrar em contato sobre nossos serviços e programas;
• Enviar conteúdos relevantes sobre saúde, nutrição e bem-estar;
• Personalizar sua experiência em nosso site;
• Melhorar nossos serviços e comunicações;
• Cumprir obrigações legais e regulatórias.`,
  },
  {
    title: '3. Compartilhamento de Informações',
    content: `Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins comerciais. Podemos compartilhar dados com prestadores de serviços de confiança que nos auxiliam na operação do site e nas comunicações, sempre sob obrigação de confidencialidade.`,
  },
  {
    title: '4. Cookies e Tecnologias de Rastreamento',
    content: `Utilizamos cookies próprios e de terceiros (como Google Analytics e Google Tag Manager) para entender como os visitantes utilizam nosso site, melhorar a experiência de navegação e medir a efetividade de nossas comunicações. Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar algumas funcionalidades do site.`,
  },
  {
    title: '5. Seus Direitos (LGPD)',
    content: `Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
• Confirmar a existência de tratamento dos seus dados;
• Acessar seus dados pessoais;
• Corrigir dados incompletos, inexatos ou desatualizados;
• Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;
• Solicitar a portabilidade dos dados;
• Revogar seu consentimento a qualquer momento.

Para exercer seus direitos, entre em contato conosco pelo e-mail informado abaixo.`,
  },
  {
    title: '6. Retenção de Dados',
    content: `Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, salvo se um período de retenção mais longo for exigido ou permitido por lei.`,
  },
  {
    title: '7. Segurança',
    content: `Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet é 100% seguro.`,
  },
  {
    title: '8. Links para Sites de Terceiros',
    content: `Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas de privacidade desses sites e recomendamos que você leia as políticas de privacidade de cada site que visitar.`,
  },
  {
    title: '9. Alterações nesta Política',
    content: `Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas publicando a nova versão nesta página com a data de atualização. Recomendamos revisitar esta página regularmente.`,
  },
  {
    title: '10. Contato',
    content: `Se tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais, entre em contato conosco:

Método Bela Barriga
E-mail: contato@metodabelabarriga.com.br`,
  },
];

export function PrivacyPolicyPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm mb-10 hover:opacity-70 transition-opacity"
          style={{ color: 'var(--muted-foreground)' }}
        >
          ← Voltar ao início
        </Link>

        <h1 className="font-display text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Política de Privacidade
        </h1>
        <p className="text-sm mb-12" style={{ color: 'var(--muted-foreground)' }}>
          Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>

        <p className="mb-10 leading-relaxed" style={{ color: 'var(--foreground)' }}>
          A sua privacidade é importante para nós. Esta Política de Privacidade descreve como o{' '}
          <strong>Método Bela Barriga</strong> coleta, usa e protege as informações pessoais que você nos
          fornece ao utilizar nosso site.
        </p>

        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2
                className="font-display text-xl font-semibold mb-3"
                style={{ color: 'var(--foreground)' }}
              >
                {section.title}
              </h2>
              <p
                className="leading-relaxed whitespace-pre-line text-sm"
                style={{ color: '#3d3d3f' }}
              >
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
