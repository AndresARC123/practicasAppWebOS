const user = "AndresARC123";
const repo = "practicasAppWebOS";

/* PERFIL */
fetch(`https://api.github.com/users/${user}`)
  .then((r) => r.json())
  .then((d) => {
    avatar.src = d.avatar_url;
    nombre.textContent = d.name;
    bio.textContent = d.bio;
    ubicacion.textContent = d.location;
  });

/* REPOSITORIOS (AHORA 10) */
fetch(
  `https://api.github.com/users/${user}/repos?sort=updated&per_page=10&type=owner&direction=desc`,
)
  .then((r) => r.json())
  .then((data) => {
    data.forEach((r) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
   <h3>${r.name}</h3>
   <p>${r.description ?? "Sin descripción"}</p>
   <a href="${r.html_url}" target="_blank">Ver repositorio</a>
  `;

      repos.appendChild(card);
    });
  });

/* FOLLOWERS */
fetch(`https://api.github.com/users/${user}/followers?per_page=5`)
  .then((r) => r.json())
  .then((data) => {
    data.forEach((f) => {
      const img = document.createElement("img");
      img.src = f.avatar_url;
      followers.appendChild(img);
    });
  });

/* COMMITS AUTOMÁTICOS */
let ultimo = null;

async function revisar() {
  const res = await fetch(
    `https://api.github.com/repos/${user}/${repo}/commits?per_page=1`,
  );
  const data = await res.json();
  const c = data[0];

  if (!ultimo) {
    ultimo = c.sha;
    pintar(c);
    return;
  }

  if (c.sha !== ultimo) {
    ultimo = c.sha;
    pintar(c);
  }
}

function pintar(c) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
  <h3>${c.commit.author.name}</h3>
  <p>${c.commit.message}</p>
  <small>${new Date(c.commit.author.date).toLocaleString()}</small>
  <br><a href="${c.html_url}" target="_blank">Ver commit</a>
 `;

  commits.prepend(card);
}

setInterval(revisar, 15000);
revisar();
