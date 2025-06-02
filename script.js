const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');

const bgImg = new Image();
bgImg.src = 'cadre.png.png'; // mets ici le bon nom du fichier de l'affiche
bgImg.onload = () => {
  drawCanvas(); // dessine dès que l'affiche est chargée
};

let userImg = null;

document.getElementById('photoInput').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    userImg = new Image();
    userImg.src = event.target.result;
    userImg.onload = drawCanvas;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function drawCanvas() {
  // Affiche l'affiche de fond
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Si la personne a sélectionné une photo, l'ajouter dans le cadre
  if (userImg) {
    // Coordonnées du cadre (ajuste si nécessaire)
    const frameX = 110;
    const frameY = 310;
    const frameWidth = 550;
    const frameHeight = 500;

    // Couper ou adapter la photo au cadre
    ctx.drawImage(userImg, frameX, frameY, frameWidth, frameHeight);
  }
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'after-school-personnalise.png';
  link.href = canvas.toDataURL();
  link.click();
}
