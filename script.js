particlesJS("nodes", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: "#25bb00" },
    shape: {
      type: "circle",
      stroke: { width: 3, color: "#25bb00" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#25bb00",
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: false, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 125, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 150, duration: 0.25 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win.classList.contains("hidden")) return;

  win.classList.remove("hidden");
  win.style.left = `50%`;
  win.style.top = `50%`;
  win.style.animation = "popupEffect 0.3s ease-out forwards";
  focusWindow(win);

  if (id === "form-window") {
    setTimeout(() => {
      const container = document.getElementById("typeform-container");
      container.innerHTML = `
        <iframe 
          src="https://tally.so/embed/mDOBNZ?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
          width="100%" 
          height="100%" 
          frameborder="0" 
          style="border: none; min-height: 75vh;"></iframe>`;
    }, 300);
  }
}

function closeWindow(id) {
  const win = document.getElementById(id);
  win.style.animation = "popdownEffect 0.15s ease-in forwards";

  const handler = () => {
    win.classList.add("hidden");
    win.style.animation = "";

    if (id === "form-window") {
      const container = document.getElementById("typeform-container");
      container.innerHTML = `
                <div class="parent">
                    <div class="cont">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>`;
    }

    win.removeEventListener("animationend", handler);
  };

  win.addEventListener("animationend", handler);
}

function focusWindow(el) {
  document.querySelectorAll(".desktop-window").forEach(w => w.style.zIndex = 10);
  el.style.zIndex = 99;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".desktop-window").forEach(elmnt => {
    const header = elmnt.querySelector(".window-bar");
    if (!header) return;

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    function dragMouseDown(e) {
      e = e || window.event;
      
      const isTouch = e.type === "touchstart";
      const target = isTouch ? e.touches[0].target : e.target;
      if (target.closest(".close-btn")) return;

      e.preventDefault();

      const evt = isTouch ? e.touches[0] : e;

      pos3 = evt.clientX;
      pos4 = evt.clientY;

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      document.ontouchend = closeDragElement;
      document.ontouchmove = elementDrag;

      focusWindow(elmnt);
    }


    function elementDrag(e) {
      e = e || window.event;
      let clientX, clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (typeof e.preventDefault === "function") e.preventDefault();

      pos1 = pos3 - clientX;
      pos2 = pos4 - clientY;
      pos3 = clientX;
      pos4 = clientY;

      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      elmnt.style.transform = "none";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchmove = null;
    }

    header.addEventListener("mousedown", dragMouseDown);
    header.addEventListener("touchstart", dragMouseDown, { passive: false });

    header.style.cursor = "grab";
    if (getComputedStyle(elmnt).position !== "absolute") {
      elmnt.style.position = "absolute";
    }
  });

  document.querySelectorAll(".qa-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.classList.contains("open");

      answer.classList.toggle("open");

      if (isOpen) {
        btn.style.borderRadius = "8px";
      } else {
        btn.style.borderRadius = "8px 8px 0 0";
      }
    });
  });
});
