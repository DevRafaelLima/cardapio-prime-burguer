const messageContainer = document.getElementById('message-container');
const copyButton = document.getElementById('copy-button');

copyButton.addEventListener('click', () => {
  const messageText = messageContainer.textContent;
  navigator.clipboard.writeText(messageText)
    .then(() => {
      alert('Mensagem copiada!');
    })
    .catch(err => {
      console.error('Failed to copy message:', err);
    });
});
