/* =========================================================
   TOP MODA — Configuración y Catálogo (6 Productos Máximo)
   ========================================================= */
const WHATSAPP = "5511994004379";

// Horario de atención comercial Brás (SP)
const HORARIO = { dias: [1, 2, 3, 4, 5, 6], abre: 6, cierra: 17 };

let produtos = [];

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const vibrate = (ms = 12) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };

/* ---------- Intro (solo primera visita) ---------- */
(function intro() {
    const el = $("#intro");
    let seen = false;
    try { seen = sessionStorage.getItem("tm-intro") === "1"; } catch (e) {}
    if (seen || reduceMotion) { el.remove(); return; }
    try { sessionStorage.setItem("tm-intro", "1"); } catch (e) {}
    setTimeout(() => el.classList.add("out"), 200);
    setTimeout(() => el.remove(), 600);
})();

/* ---------- Estado en Vivo (Horario São Paulo) ---------- */
(function status() {
    const box = $("#status"), txt = $("#status-text");
    const sp = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    const h = sp.getHours() + sp.getMinutes() / 60;
    const open = HORARIO.dias.includes(sp.getDay()) && h >= HORARIO.abre && h < HORARIO.cierra;
    box.classList.toggle("on", open);
    txt.textContent = open ? "Online agora · 3 pontos no Brás" : "Responde amanhã · 3 pontos no Brás";
})();

/* ---------- Render Cuadrícula de 6 Productos ---------- */
function renderGrid(listaProdutos) {
    const grid = $("#products-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const totalSlots = Math.max(6, listaProdutos.length);
    for (let i = 0; i < totalSlots; i++) {
        const p = listaProdutos[i];
        const card = document.createElement("div");
        
        if (p) {
            card.className = "product-card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            
            const videoBadge = p.video ? `
                <div class="card-video-badge" title="Vídeo disponível">
                    <svg viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" fill="currentColor"/></svg>
                </div>` : "";

            card.innerHTML = `
                <div class="card-thumb">
                    <span class="card-sticker">${p.sticker || 'Destaque'}</span>
                    <img src="${p.thumb}" alt="${p.nome}" loading="lazy">
                    ${videoBadge}
                </div>
                <div class="card-meta">
                    <span class="card-title">${p.nome}</span>
                    <span class="card-action">Ver fotos ↗</span>
                </div>
            `;
            card.addEventListener("click", () => openModal(p));
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(p);
                }
            });
        } else {
            card.className = "product-card slot-placeholder";
            card.innerHTML = `
                <div class="card-thumb">
                    <svg viewBox="0 0 24 24" width="24" height="24" opacity="0.5"><path d="M4 4h16v16H4z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M20 15l-5-5L4 20" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                </div>
                <div class="card-meta">
                    <span class="card-title">Espaço Disponível</span>
                </div>
            `;
        }
        grid.appendChild(card);
    }
}

/* ---------- Carga Desacoplada del Catálogo ---------- */
async function carregarProdutos() {
    try {
        const res = await fetch('./produtos.json');
        if (!res.ok) throw new Error('Status: ' + res.status);
        produtos = await res.json();
    } catch (err) {
        console.warn('Usando catálogo de respaldo offline:', err);
        produtos = [
            {
                id: 1,
                nome: "Macaquinho Paris",
                subtitulo: "Crepe GGT",
                sticker: "✨ Lançamento",
                thumb: "fotos/paris-1.webp",
                video: "fotos/paris.mp4",
                fotos: ["fotos/paris-1.webp", "fotos/paris-3.webp", "fotos/paris-2.webp", "fotos/paris-4.webp", "fotos/paris-5.webp", "fotos/paris-6.webp", "fotos/paris-7.webp"]
            },
            {
                id: 2,
                nome: "Conjunto Venus",
                subtitulo: "Alfaiataria Elegance",
                sticker: "🔥 Mais Vendido",
                thumb: "fotos/venus-1.webp",
                video: "fotos/venus.mp4",
                fotos: ["fotos/venus-1.webp", "fotos/venus-2.webp", "fotos/venus-3.webp", "fotos/venus-4.webp", "fotos/venus-5.webp", "fotos/venus-6.webp", "fotos/venus-7.webp", "fotos/venus-8.webp", "fotos/venus-9.webp", "fotos/venus-10.webp", "fotos/venus-11.webp"]
            },
            {
                id: 3,
                nome: "Macaquinho Chanel",
                subtitulo: "Crepe Alfaiataria",
                sticker: "✨ Novo Look",
                thumb: "fotos/channel-1.webp",
                video: "fotos/channel.mp4",
                fotos: ["fotos/channel-1.webp", "fotos/channel-2.webp", "fotos/channel-3.webp", "fotos/channel-4.webp", "fotos/channel-5.webp", "fotos/channel-6.webp"]
            }
        ];
    }
    renderGrid(produtos);
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
// Fallback en caso de que defer ya haya disparado el evento
if (document.readyState === "interactive" || document.readyState === "complete") {
    carregarProdutos();
}

/* ---------- Modal de Detalle Rápido ---------- */
const modal = $("#product-modal");
const modalSlider = $("#modal-slider");
const modalDots = $("#modal-dots");
const modalClose = $("#modal-close");
const modalBackdrop = $("#modal-backdrop");
const modalTitle = $("#modal-title");
const modalDesc = $("#modal-desc");
const modalSticker = $("#modal-sticker");
const modalWaBtn = $("#modal-wa-btn");

// Detección de conexión lenta o modo ahorro de datos
function isSlowConnection() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return false;
    return conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.effectiveType === '3g';
}

function openModal(prod) {
    vibrate(10);
    modalTitle.textContent = prod.nome;
    modalSticker.textContent = prod.sticker || "✨ Destaque";
    if (modalDesc) {
        modalDesc.textContent = prod.subtitulo
            ? `${prod.subtitulo} · Consulte cores disponíveis e valores no WhatsApp.`
            : "Consulte cores disponíveis e valores diretamente no WhatsApp.";
    }
    modalWaBtn.href = wa(`Oi! Amei o ${prod.nome} 💛 Quais cores disponíveis e valores?`);
    
    const slowNet = isSlowConnection();
    const slides = [];

    if (prod.video) {
        if (!slowNet) {
            slides.push(`<div class="modal-slide"><video src="${prod.video}" poster="${prod.thumb}" muted loop playsinline autoplay preload="metadata"></video></div>`);
        } else {
            slides.push(`
                <div class="modal-slide video-placeholder" style="position:relative;">
                    <img src="${prod.thumb}" alt="${prod.nome}">
                    <button class="btn-play-video" onclick="loadModalVideo(this, '${prod.video}')" aria-label="Reproduzir vídeo">▶</button>
                    <p>Toque para carregar o vídeo (Economia de dados)</p>
                </div>
            `);
        }
    }

    prod.fotos.forEach((f, idx) => {
        const loadingAttr = idx === 0 && !prod.video ? 'loading="eager"' : 'loading="lazy"';
        slides.push(`<div class="modal-slide"><img src="${f}" alt="${prod.nome}" ${loadingAttr} decoding="async"></div>`);
    });

    modalSlider.innerHTML = slides.join("");
    modalDots.innerHTML = slides.map((_, i) => `<i class="${i === 0 ? "on" : ""}"></i>`).join("");
    
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalSlider.onscroll = () => {
        const idx = Math.round(modalSlider.scrollLeft / modalSlider.clientWidth);
        modalDots.querySelectorAll("i").forEach((d, i) => d.classList.toggle("on", i === idx));
    };

    const prevBtn = $(".slider-btn.prev");
    const nextBtn = $(".slider-btn.next");
    if (prevBtn) prevBtn.onclick = () => { modalSlider.scrollBy({ left: -modalSlider.clientWidth, behavior: "smooth" }); };
    if (nextBtn) nextBtn.onclick = () => { modalSlider.scrollBy({ left: modalSlider.clientWidth, behavior: "smooth" }); };
}

window.loadModalVideo = function(btn, videoSrc) {
    const parent = btn.parentElement;
    parent.innerHTML = `<video src="${videoSrc}" controls autoplay playsinline style="width:100%;height:100%;object-fit:cover;"></video>`;
};

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Pausar cualquier video activo
    const v = modalSlider.querySelector("video");
    if (v) v.pause();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

/* ---------- Lojas Accordion ---------- */
(function lojas() {
    const t = $("#stores-toggle"), l = $("#stores-list");
    t.addEventListener("click", () => {
        const open = l.classList.toggle("open");
        t.setAttribute("aria-expanded", open);
        vibrate(8);
    });
})();

/* ---------- Microinteracción Ripple ---------- */
document.addEventListener("pointerdown", (e) => {
    const el = e.target.closest(".btn, .chip, .product-card");
    if (!el || reduceMotion) return;
    vibrate(6);
    const r = el.getBoundingClientRect(), s = Math.max(r.width, r.height);
    const sp = document.createElement("span");
    sp.className = "ripple";
    sp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    el.appendChild(sp);
    setTimeout(() => sp.remove(), 600);
});

/* ---------- Polvo Dorado de Fondo ---------- */
(function dust() {
    if (reduceMotion) return;
    const c = $("#dust"), g = c.getContext("2d");
    let W, H, ps;
    const init = () => {
        W = c.width = innerWidth; H = c.height = innerHeight;
        ps = Array.from({ length: Math.min(30, (W * H) / 25000 | 0) }, () => ({
            x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + .4,
            s: Math.random() * .3 + .1, a: Math.random() * Math.PI * 2
        }));
    };
    init(); addEventListener("resize", init);
    
    let animationId;
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && animationId) loop();
        else cancelAnimationFrame(animationId);
    });
    (function loop(t = 0) {
        if (document.hidden) return;
        g.clearRect(0, 0, W, H);
        ps.forEach((p) => {
            p.y -= p.s; p.x += Math.sin(p.a + t / 2500) * .2;
            if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
            g.globalAlpha = .2 + .4 * Math.abs(Math.sin(p.a + t / 1400));
            g.fillStyle = "#f6e7a8"; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 7); g.fill();
        });
        animationId = requestAnimationFrame(loop);
    })();

})();
if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {})); }

// Estado Offline / Online en el DOM
window.addEventListener('offline', () => {
    const txt = $("#status-text");
    const box = $("#status");
    if (txt && box) {
        txt.textContent = 'Você está sem conexão (Modo Offline)';
        box.classList.remove('on');
    }
});
window.addEventListener('online', () => {
    // Restaurar llamando a la función status
    const txt = $("#status-text");
    if (txt) txt.textContent = 'Online novamente!';
    setTimeout(status, 2000);
});
