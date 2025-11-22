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

document.addEventListener("DOMContentLoaded", () => {
    const switchEl = document.getElementById("lang-switch");
    if (!switchEl) return;

    const currentPath = window.location.pathname;
    const isPTPage = currentPath.includes("-pt.html");

    // --- 1) Atualiza estado visual do switch baseado na página atual ---
    if (isPTPage) {
        switchEl.classList.add("active");
    }

    // --- 2) Troca idioma ao clicar (SEM verificar localStorage primeiro) ---
    switchEl.addEventListener("click", () => {
        let newPath;

        if (isPTPage) {
            // Está em PT → vai para EN
            localStorage.setItem("lang", "en");
            newPath = currentPath.replace("-pt.html", ".html");
        } else {
            // Está em EN → vai para PT
            localStorage.setItem("lang", "pt");
            newPath = currentPath.replace(".html", "-pt.html");
        }

        window.location.pathname = newPath;
    });
});

