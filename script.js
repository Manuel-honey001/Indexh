const uploadInput = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cadre = new Image();
cadre.src = "cadre.png.png"; // L'affiche avec le trou noir au centre

uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const userImage = new Image();
    userImage.onload = function () {
      // Nettoie le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Affiche la photo utilisateur dans le carré (ex: centre 308x375 à 150x370)
      const targetX = 150;
      const targetY = 370;
      const targetWidth = 468;
      const targetHeight = 468;

      // Redimensionner l'image utilisateur à la taille du cadre
      ctx.drawImage(userImage, targetX, targetY, targetWidth, targetHeight);

      // Par-dessus : on affiche le cadre pour garder le design
      ctx.drawImage(cadre, 0, 0);
    };
    userImage.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

// Télécharger
document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "affiche-after-school.png";
  link.href = canvas.toDataURL();
  link.click();
});
