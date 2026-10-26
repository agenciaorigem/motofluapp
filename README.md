# Motorflu — Central de Pedidos

Aplicativo web mobile de demonstração, versão 0.5 (PWA). HTML, CSS e JavaScript, com imagens incluídas. Não precisa compilar nem instalar dependências.

## Acessos demonstrativos

| Perfil | Login | Senha |
|---|---|---|
| Gestor — Reginaldo | admin | 123 |
| Representante — Márcio | marcio | 123 |

## Colocar no GitHub

1. Extraia este ZIP no computador.
2. Crie um repositório no GitHub.
3. Envie **o conteúdo** desta pasta, mantendo index.html na raiz do repositório e a pasta assets com suas imagens.
4. Para servir a demonstração pelo GitHub Pages, configure a publicação a partir da branch main e da pasta raiz (/).

## Testar no computador

Na pasta do projeto, execute `python3 -m http.server 8000` e abra http://localhost:8000. No Windows, pode usar `py -m http.server 8000`.

Para verificar as regras com Node.js: `node tests/domain.cjs`.

## Funcionalidades

- Login demonstrativo, perfis de gestor e representante de vendas.
- Catálogo com 28 produtos, fotos, embalagens, preços fictícios e descontos.
- Cadastro de clientes e representantes, fotos e códigos cadastrais.
- Pedidos, solicitações de amostra, histórico, aprovação e cancelamento com motivo.
- Estoque por embalagem, reservas e movimentação conforme o status.
- Política comercial, navegação interna e layout mobile.
- Impressão/salvar PDF pelo navegador e prévia de mensagens de WhatsApp.
- Manifesto e ícones para instalação como aplicativo web em dispositivos compatíveis.

## Limites da demonstração

Os logins estão no código e não oferecem autenticação segura. Não use dados pessoais ou comerciais reais nesta versão.

Os dados e fotos alterados ficam somente no armazenamento local do navegador. Não há banco compartilhado nem sincronização entre aparelhos. O histórico criado na demonstração hospedada não é exportado com estes arquivos.

WhatsApp é simulado; e-mails não são enviados. O PDF é gerado pela impressão do navegador. A câmera depende do dispositivo e de permissão. Após o primeiro carregamento completo e a ativação do service worker, os arquivos da demonstração ficam em cache para reabertura sem conexão. Isso não cria sincronização, backup ou envio pela internet.

Antes de uso real: integrar autenticação e permissões no servidor, banco de dados, armazenamento das fotos e serviços de envio de WhatsApp/e-mail.


## Instalação no celular (v0.5)

Último ícone aprovado: MM branco sobre vermelho com degradê escuro. O botão Instalar aplicativo aparece na entrada e nas telas internas, e fica oculto em modo instalado.

Android: o botão usa a confirmação do navegador quando disponível; caso contrário, mostra como instalar pelo menu do Chrome/Samsung Internet. iPhone/iPad: instruções para Safari, Compartilhar, Adicionar à Tela de Início. O botão Como instalar permite consultar as orientações.

Publique TODOS os arquivos deste ZIP, incluindo assets, pwa.js, pwa.css, manifest.webmanifest e sw.js, preservando a estrutura. Use o endereço HTTPS do GitHub Pages, não a página do repositório. Caminhos relativos aceitam subpastas. A instalação é confirmada pelo usuário e depende do navegador. Não é APK.

Para atualizar, substitua os arquivos no repositório. Abra o endereço publicado e recarregue se ainda aparecer a versão anterior. Ícones de instalações antigas podem exigir reinstalação; os dados locais não têm backup automático.

Validação: sintaxe JavaScript, regras comerciais e testes simulados de instalação. A instalação no Android/iPhone precisa ser confirmada após publicar no endereço HTTPS definitivo.

Referências: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt e https://support.apple.com/guide/iphone/iphea86e5236/ios


## Correção das imagens da entrada

O ícone do aviso de instalação e as logos da interface agora estão incorporados diretamente no HTML/JavaScript. A logo foi convertida para PNG transparente para evitar dependência de filtros SVG. O cache foi atualizado para v2.

IMPORTANTE: envie também a pasta assets inteira. Ela continua necessária para as fotos dos produtos e para os ícones usados pelo sistema ao instalar o aplicativo. Sem esses arquivos, a instalação e o catálogo podem ficar incompletos.

Após substituir os arquivos, aguarde a publicação e recarregue a página conectado à internet.
