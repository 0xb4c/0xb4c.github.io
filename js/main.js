document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar.fixed-top');
    const spyEl = document.body;

    function setupSpy() {
        const h = Math.ceil(nav.getBoundingClientRect().height);
        document.documentElement.style.scrollPaddingTop = h + 'px';

        const old = bootstrap.ScrollSpy.getInstance(spyEl);
        if (old) old.dispose();
        new bootstrap.ScrollSpy(spyEl, { target: '#mainNav', offset: Math.max(0, h - 2) });
    }

    window.addEventListener('load', setupSpy);
    window.addEventListener('resize', setupSpy);
});

document.addEventListener("DOMContentLoaded", function () {
    if (typeof Typed !== "undefined") {
        new Typed("#typed", {
            strings: [
                "Cybersecurity PhD | ML | 6G Security",
                "Pentest and user awareness training",
                "Physical layer security",
                "Trust and trustworthiness",
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
            loop: true,
            smartBackspace: true
        });
    }
});

// Fetch and display GitHub star counts
document.addEventListener("DOMContentLoaded", () => {
    const repos = [
        { id: "stars-set", url: "https://api.github.com/repos/0xb4c/SET" },
        { id: "stars-pycaso", url: "https://api.github.com/repos/0xb4c/pycaso" }
    ];

    repos.forEach(repo => {
        fetch(repo.url)
            .then(res => res.json())
            .then(data => {
                document.getElementById(repo.id).textContent = data.stargazers_count;
            })
            .catch(() => {
                document.getElementById(repo.id).textContent = "0";
            });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new bootstrap.Tooltip(el, { container: 'body' });
    });

    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const email = btn.getAttribute('data-copy');
            const tip = bootstrap.Tooltip.getOrCreateInstance(btn, { container: 'body' });
            const setTipText = (text) => {
                if (typeof tip.setContent === 'function') {
                    tip.setContent({ '.tooltip-inner': text });
                } else {
                    const tipEl = tip.getTipElement ? tip.getTipElement() : tip.tip;
                    if (tipEl) {
                        const inner = tipEl.querySelector('.tooltip-inner');
                        if (inner) inner.textContent = text;
                    } else {
                        btn.setAttribute('title', text);
                        tip.dispose();
                        bootstrap.Tooltip.getOrCreateInstance(btn, { container: 'body' });
                    }
                }
            };

            try {
                await navigator.clipboard.writeText(email);
                const prevHTML = btn.innerHTML;
                btn.innerHTML = '<i class="bi bi-clipboard-check"></i>';

                setTipText('Copied!');
                tip.show();

                setTimeout(() => {
                    tip.hide();
                    setTipText('Copy email');
                    btn.innerHTML = prevHTML;
                }, 900);
            } catch {
                window.location.href = 'mailto:' + email;
            }
        });
    });
});
