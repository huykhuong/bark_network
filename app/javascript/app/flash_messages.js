document.addEventListener("turbolinks:load", () => {
  const TOAST = {
    notice: window.toast.success,
    alert: window.toast.error,
  };

  const flash = document.querySelector(".flash");

  if (flash) {
    const toast = TOAST[flash.dataset.type];
    toast(flash.dataset.message, { position: "top-right" });
  }
});
