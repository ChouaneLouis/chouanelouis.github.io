let currentLang = "en";
let currentArticle = "welcome";

const articleContainer = document.getElementById("content");
const buttons = document.querySelectorAll("nav button[data-article]");
// const langueSwitch = document.getElementById("langue_switch");
const flag = document.getElementById("flag");

function parseContent(text) {
  let html = text;

  // Titre (première ligne)
  html = html.replace(/^([^\n]+)\n/, '<h2>$1</h2>\n');

  // Chemin local $PATH
  html = html.replace(/\$PATH/g,`./content/${currentLang}/`);

  // Séparateur vertical $VSPACE
  html = html.replace(/\$VSPACE/g,`<div class="vspace"></div>`);

  // Blocs { }
  html = html.replace(/\{\-/g, '<div class="ligne-centre">');
  html = html.replace(/\{~/g, '<div class="ligne-centre-inverse">');
  html = html.replace(/\{\*/g, '<div class="chrono">');
  html = html.replace(/\{\|/g, '<div class="ligne-element">');
  html = html.replace(/\{/g, '<div>');
  html = html.replace(/\}/g, '</div>');

  // Liens boutons ()>url<<text>>
  html = html.replace(/\(\)>(.*?)<<\s*(.*?)\s*>>/g,
    '<a href="$1" class="bouton" target="_blank">$2</a>'
  );

  // Liens mini >>url<<
  html = html.replace(/>>(.*?)<</g,
    '<a href="$1" class="bouton-fleche" target="_blank">></a>'
  );

  // Liens normaux =>url<<text>>
  html = html.replace(/=>(.*?)<<\s*(.*?)\s*>>/g,
    '<a href="$1" target="_blank">$2</a>'
  );

  // Sauts de ligne \\
  html = html.replace(/\\\\/g, '<br/>');

  // Comentaire entre (* *)
  html = html.replace(/\(\*([\s\S]*?)\*\)/g, '');

  // Paragraphes entre [ ]
  html = html.replace(/\[\-\s*([\s\S]*?)\s*\]/g, '<p class="texte-centre">$1</p>');
  html = html.replace(/\[<\s*([\s\S]*?)\s*\]/g, '<p class="texte-gauche">$1</p>');
  html = html.replace(/\[>\s*([\s\S]*?)\s*\]/g, '<p class="texte-droit">$1</p>');
  html = html.replace(/\[\s*([\s\S]*?)\s*\]/g, '<p>$1</p>');

  // Ligne frise chronologique *> date == titre == texte ***
  html = html.replace(/\*>\s*(.*?)\s*==\s*(.*?)\s*==\s*([\s\S]*?)\s*\*\*\*/g,
    '<div class="ligne-chrono"><em>$1</em><div></div><div><h3>$2</h3><p>$3</p></div></div>'
  );

  // Petites boites titrés $> == titre == contenu ***
  html = html.replace(/\$>\s*==\s*(.*?)\s*==\s*([\s\S]*?)\s*\*\*\*/g,
    '<div class="semestre"><p><strong>$1</strong></p>$2</div>'
  );

  // Paragraphes titrés == titre == texte ***
  html = html.replace(/==\s*(.*?)\s*==\s*([\s\S]*?)\s*\*\*\*/g,
    '<div><h3>$1</h3><p>$2</p></div>'
  );

  // Listes <--- element1 *- element2 *- etc ---> 
  html = html.replace(/\*-/g, '</li><li>');
  html = html.replace(/<---\s*([\s\S]*?)\s*--->/g,
    '<ul><li>$1</li></ul>'
  );

  return html;
}

function loadArticle(articleName) {
  currentArticle = articleName;
  const path = `./content/${currentLang}/${articleName}.txt`;

  fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error("Fichier introuvable");
      }
      return response.text();
    })
    .then(text => {
      articleContainer.innerHTML = parseContent(text);
    })
    .catch(error => {
      articleContainer.innerHTML = "<p>Contenu indisponible.</p>";
      console.error(error);
    });
}

// Clic sur les boutons de navigation
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const articleName = button.dataset.article;
    loadArticle(articleName);
  });
});

// Bouton changement de langue
// langueSwitch.addEventListener("click", () => {
//   if (currentLang === "en") {
//     currentLang = "fr";
//     flag.src = "./images/drapeau_fr.png";
//   } else {
//     currentLang = "en";
//     flag.src = "./images/drapeau_en.png";
//   }

//   // Recharger l'article courant dans la nouvelle langue
//   loadArticle(currentArticle);
// });

// Chargement initial
loadArticle(currentArticle);
