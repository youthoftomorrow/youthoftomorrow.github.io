// Draws a QR code into every element with data-url (uses qrcode-generator, loaded before this file).
document.querySelectorAll(".qr[data-url]").forEach((el) => {
  const qr = qrcode(0, "M");
  qr.addData(el.dataset.url);
  qr.make();
  el.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
});
