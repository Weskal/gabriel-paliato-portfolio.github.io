// Smooth Page Transitions (Fade-In + Fade-Out)

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const transitionDuration = 300; // ms — matches CSS duration

    // ---- FADE IN on page load ----
    body.style.opacity = 0;
    body.style.transition = `opacity ${transitionDuration}ms ease`;
    requestAnimationFrame(() => (body.style.opacity = 1));

    // ---- FADE OUT on link click ----
    const links = document.querySelectorAll("a[href]");

    links.forEach(link => {
        const url = link.getAttribute("href");

        // ignore anchors, external links, mailto, tel
        if (
            url.startsWith("#") ||
            url.startsWith("mailto:") ||
            url.startsWith("tel:") ||
            link.target === "_blank" ||
            url.startsWith("http")
        ) return; // NÃO adiciona o event listener

        // APENAS links internos chegam aqui
        link.addEventListener("click", e => {
            e.preventDefault();
            body.style.opacity = 0;

            setTimeout(() => {
                window.location.href = url;
            }, transitionDuration);
        });
    });
});