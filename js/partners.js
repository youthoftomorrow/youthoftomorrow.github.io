// Partners page: workshop photos open together in the photo viewer, so visitors can arrow through them.
$$(".workshop").forEach((fig) => {
  const buttons = $$("button[data-src]", fig);
  const items = buttons.map((b) => ({ src: b.dataset.src, cap: b.dataset.caption }));
  buttons.forEach((b, i) => b.addEventListener("click", () => YOT.lightbox.open(items, i)));
});
