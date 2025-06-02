const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');

const bgImg = new Image();
bgImg.src = 'cadre.png.png'; // Mets le nom exact du fichier de ton affiche avec cadre
bgImg.onload = () => {
  drawCanvas(); // Dessine dès que l'affiche est chargée
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
  // Dimensions du cadre (zone où la photo va aller)
  const frameX = 110;
  const frameY = 310;
  const frameWidth = 550;
  const frameHeight = 500;

  // Dessine l'affiche de fond
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Si une photo a été chargée
  if (userImg) {
    // Récupère dimensions originales de la photo
    const imgWidth = userImg.width;
    const imgHeight = userImg.height;

    // Ratio de la zone du cadre
    const frameRatio = frameWidth / frameHeight;
    const imgRatio = imgWidth / imgHeight;

    let sx, sy, sWidth, sHeight;

    // Découpe pour garder le centre et remplir sans déformer
    if (imgRatio > frameRatio) {
      // L'image est trop large → on coupe à gauche et à droite
      sHeight = imgHeight;
      sWidth = imgHeight * frameRatio;
      sx = (imgWidth - sWidth) / 2;
      sy = 0;
    } else {
      // L'image est trop haute → on coupe en haut et en bas
      sWidth = imgWidth;
      sHeight = imgWidth / frameRatio;
      sx = 0;
      sy = (imgHeight - sHeight) / 2;
    }

    ctx.drawImage(
      userImg,
      sx, sy, sWidth, sHeight, // source (recadrée)
      frameX, frameY, frameWidth, frameHeight // destination
    );
  }
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'after-school-personnalise.png';
  link.href = canvas.toDataURL();
  link.click();
}


