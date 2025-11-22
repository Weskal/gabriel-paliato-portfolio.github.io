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

    // Lê idioma salvo
    const savedLang = localStorage.getItem("lang"); // "pt" ou "en"

    const currentPath = window.location.pathname;
    const isPTPage = currentPath.includes("-pt");

    // --- 1) Garante que o arquivo correto abra baseado no savedLang ---
    if (savedLang === "pt" && !isPTPage) {
        // EN -> PT automático
        window.location.pathname = currentPath.replace(".html", "-pt.html");
        return;
    }

    if (savedLang === "en" && isPTPage) {
        // PT -> EN automático
        window.location.pathname = currentPath.replace("-pt.html", ".html");
        return;
    }

    // --- 2) Atualiza o estado visual do switch ---
    if (isPTPage) {
        switchEl.classList.add("active");
    }

    // --- 3) Troca idioma ao clicar ---
    switchEl.addEventListener("click", () => {
        const toPT = switchEl.classList.toggle("active");

        let newPath;

        if (toPT) {
            localStorage.setItem("lang", "pt");
            newPath = currentPath.replace(".html", "-pt.html");
        } else {
            localStorage.setItem("lang", "en");
            newPath = currentPath.replace("-pt.html", ".html");
        }

        window.location.pathname = newPath;
    });
});


