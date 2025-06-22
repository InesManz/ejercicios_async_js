const API_URL = "https://thronesapi.com/api/v2/Characters";
const selectElement = document.getElementById("character-list");
const imageElement = document.querySelector(".character-image");
const infoElement = document.getElementById("character-info");
const imageContainer = document.getElementById("image-container");

let charactersData = [];

selectElement.disabled = true;

fetch(API_URL)
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(characters => {
    charactersData = characters;

    characters.forEach(character => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = character.fullName;
      selectElement.appendChild(option);
    });

    selectElement.disabled = false;

    selectElement.addEventListener("change", (event) => {
      const selectedId = parseInt(event.target.value);
      const selectedCharacter = charactersData.find(c => c.id === selectedId);

      if (selectedCharacter) {
        imageElement.src = selectedCharacter.imageUrl;
        imageContainer.style.display = "block";

        infoElement.innerHTML = `
          <h2>${selectedCharacter.fullName}</h2>
          <p><strong>Título:</strong> ${selectedCharacter.title}</p>
          <p><strong>Casa:</strong> ${selectedCharacter.family}</p>
        `;
      }
    });
  })
  .catch(error => {
    console.error("Error fetching characters:", error);
    selectElement.innerHTML = '<option value="">Error al cargar los personajes</option>';
  });
