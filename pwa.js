(() => {
  let pendingPrompt = null;
  const standalone = window.matchMedia('(display-mode: standalone)');
  const installed = () => standalone.matches || navigator.standalone === true;
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const bar = document.getElementById('install-bar');
  const button = document.getElementById('install-app');
  const dialog = document.getElementById('install-help');
  const status = document.getElementById('install-status');
  const steps = document.getElementById('install-steps');
  const sync = () => { bar.hidden = installed(); };
  const help = () => {
    steps.innerHTML = ios
      ? '<p><strong>iPhone e iPad</strong></p><ol><li>Abra este endereço no Safari.</li><li>Toque em Compartilhar (quadrado com seta para cima).</li><li>Escolha <strong>Adicionar à Tela de Início</strong>. Se aparecer, mantenha <strong>Abrir como App da Web</strong> ativado.</li><li>Toque em Adicionar. Abra pelo ícone Motorflu.</li></ol>'
      : '<p><strong>Android</strong></p><ol><li>Abra este endereço no Chrome ou Samsung Internet.</li><li>Abra o menu do navegador (três pontos).</li><li>Escolha <strong>Instalar aplicativo</strong> ou <strong>Adicionar à tela inicial</strong> e confirme.</li></ol><p><strong>No computador:</strong> no Chrome ou Edge, procure a opção de instalar no menu ou na barra de endereço.</p>';
    if (!window.isSecureContext) steps.innerHTML += '<p>Abra o endereço publicado com HTTPS para instalar. O arquivo aberto diretamente no computador não permite a instalação.</p>';
    steps.innerHTML += '<p>Se você abriu o link dentro do WhatsApp ou Instagram, use o menu para abrir no navegador do celular. A opção de instalação depende do navegador e pode levar alguns instantes para aparecer.</p>';
    dialog.showModal();
  };
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); pendingPrompt = e; sync(); });
  window.addEventListener('appinstalled', () => { pendingPrompt = null; bar.hidden = true; status.textContent = 'Aplicativo instalado.'; if (dialog.open) dialog.close(); });
  standalone.addEventListener?.('change', sync);
  button.addEventListener('click', async () => {
    if (!pendingPrompt) { help(); return; }
    const prompt = pendingPrompt; pendingPrompt = null;
    button.disabled = true;
    try {
      await prompt.prompt();
      const result = await prompt.userChoice;
      status.textContent = result.outcome === 'accepted' ? 'Instalação solicitada. Confirme no navegador.' : 'Instalação não concluída. Você pode tentar pelo menu do navegador.';
    } catch { help(); }
    finally { button.disabled = false; }
  });
  document.getElementById('install-instructions').addEventListener('click', help);
  document.getElementById('install-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  sync();
})();
