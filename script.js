document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  window.setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 500);
  }, 700);

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("navMenu");
  menuBtn?.addEventListener("click", () => {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
      nav.style.cssText = "display:flex;position:absolute;top:68px;left:0;right:0;flex-direction:column;gap:0;background:rgba(5,8,22,.97);padding:12px 6vw;border-bottom:1px solid rgba(255,255,255,.1)";
    } else nav.removeAttribute("style");
  });

  document.querySelectorAll("#navMenu a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); nav.removeAttribute("style");
  }));

  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-5px)`;
    });
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });

  const form = document.getElementById("bookingForm");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent(`Booking Enquiry - ${service}`);
    const body = encodeURIComponent(
      `Hello UdanT Funfinity,\n\nI would like to make a booking enquiry.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred Date: ${date}\nMessage: ${message || "N/A"}\n\nPlease confirm availability and timing.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    document.getElementById("formNote").textContent = "Your email client should now open with the enquiry. Add the official booking email before launch.";
  });

  if (window.THREE) {
    const canvas = document.getElementById("heroCanvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, .1, 100);
    camera.position.z = 8;
    const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);

    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.IcosahedronGeometry(2.6, 1);
    const material = new THREE.MeshBasicMaterial({color:0x2f91ff, wireframe:true, transparent:true, opacity:.13});
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const pGeo = new THREE.BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);
    for(let i=0;i<count*3;i++) positions[i] = (Math.random()-.5)*20;
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions,3));
    const pMat = new THREE.PointsMaterial({color:0x6abaff,size:.025,transparent:true,opacity:.65});
    const particles = new THREE.Points(pGeo,pMat);
    scene.add(particles);

    let mx=0,my=0;
    addEventListener("pointermove", e => { mx=(e.clientX/innerWidth-.5)*.5; my=(e.clientY/innerHeight-.5)*.3; });
    function animate(){
      requestAnimationFrame(animate);
      group.rotation.x += .0015; group.rotation.y += .002;
      group.rotation.y += (mx-group.rotation.y)*.01;
      group.rotation.x += (my-group.rotation.x)*.01;
      particles.rotation.y += .00025;
      renderer.render(scene,camera);
    }
    animate();
    addEventListener("resize", () => {
      camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
      renderer.setSize(innerWidth,innerHeight);
    });
  }

  if (window.gsap) {
    gsap.from(".hero-content > *", {y:30, opacity:0, duration:.8, stagger:.08, ease:"power3.out", delay:.8});
  }
});
