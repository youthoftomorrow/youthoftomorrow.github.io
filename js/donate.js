// Donate page: copy the Zelle email.

$$(".copy-btn").forEach((b) =>
  b.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
    } catch {
      // Older browsers: select the email so it can be copied by hand.
      getSelection().selectAllChildren($("#zelle-email"));
      b.textContent = "Press Ctrl/⌘ + C";
      return;
    }
    b.textContent = "Copied";
    b.classList.add("is-copied");
    setTimeout(() => {
      b.textContent = "Copy email";
      b.classList.remove("is-copied");
    }, 2200);
  })
);
