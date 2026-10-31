(function () {
    const DURATION = 450; // gleich wie im CSS (0.8s)

    // Home = index.html oder "/"
    function isHome(path) {
        return /(^|\/)(index\.html)?$/.test(path);
    }

    // Overlay erzeugen
    const overlay = document.createElement("div");
    overlay.id = "page-transition";
    document.documentElement.appendChild(overlay);

    // Start- und Zielposition je Richtung
    const positions = {
        up:   { from: "below", to: "above" },
        down: { from: "above", to: "below" }
    };

    // --- Ankunft auf der neuen Seite ---
    overlay.className = "below";

    const direction = sessionStorage.getItem("transition");
    sessionStorage.removeItem("transition");

    if (direction) {
        overlay.className = "cover"; // sofort deckend, kein Aufblitzen

        document.addEventListener("DOMContentLoaded", function () {
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    overlay.className = "animate " + positions[direction].to;
                });
            });
        });
    }

    // Zurück-Button / Browser-Cache: Overlay nicht stecken lassen
    window.addEventListener("pageshow", function (e) {
        if (e.persisted) overlay.className = "below";
    });

    // --- Seitenwechsel ---
    window.navigateTo = function (url) {
        const target = new URL(url, location.href);
        const fromHome = isHome(location.pathname);
        const toHome = isHome(target.pathname);

        // Nur Home <-> andere Seite animieren
        if (fromHome === toHome) {
            location.href = target.href;
            return;
        }

        const dir = fromHome ? "up" : "down";
        sessionStorage.setItem("transition", dir);

        overlay.className = positions[dir].from;
        overlay.offsetHeight; // Reflow erzwingen, damit die Startposition gilt
        overlay.className = "animate cover";

        setTimeout(function () {
            location.href = target.href;
        }, DURATION);
    };

    // Alle normalen Links automatisch abfangen
    document.addEventListener("click", function (e) {
        const link = e.target.closest("a[href]");
        if (!link) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (link.target === "_blank") return;

        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin) return;
        if (url.pathname === location.pathname) return;

        e.preventDefault();
        navigateTo(url.href);
    });
})();