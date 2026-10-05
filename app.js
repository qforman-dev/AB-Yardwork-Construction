const form = document.querySelector("#estimate-form");
const message = document.querySelector("#form-message");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = form.querySelector("button[type='submit']");
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Sending Request…";
  message.hidden = true;
  message.className = "form-message";

  const data = new FormData(form);
  data.set("_subject", "New free estimate request from the AB Yard Care website");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    const result = await response.json().catch(() => ({}));
    const errorText = result.errors?.map((error) => error.message).filter(Boolean).join(" ") || result.error;
    if (!response.ok) throw new Error(errorText || "We could not send your request.");

    form.reset();
    message.textContent = "Thank you. AB Yard Care & Construction will follow up about your project.";
    message.classList.add("success");
  } catch (error) {
    message.textContent = error.message || "We could not send your request. Please call or text 508-566-2466.";
    message.classList.add("error");
  } finally {
    message.hidden = false;
    button.disabled = false;
    button.textContent = originalText;
  }
});
