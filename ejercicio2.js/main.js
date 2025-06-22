const MAX_POKEMON_ID = 151;
const imageElement = document.querySelector(".random-image");
const nameElement = document.getElementById("pokemon-name"); 
const button = document.getElementById("new_pokemon"); 


function loadRandomPokemon() {
    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    nameElement.textContent = "Cargando...";
    imageElement.src = "";
    imageElement.alt = "Pokémon aleatorio";

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se puede obtener el Pokémon.");
            }
            return response.json();
        })
        .then(data => {
            const imageUrl = data.sprites.other['official-artwork'].front_default;
            imageElement.src = imageUrl;
            imageElement.alt = `Pokémon: ${data.name}`;
            nameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        })
        .catch(error => {
            console.error("Error al obtener el Pokémon:", error);
            imageElement.alt = "No se pudo cargar el Pokémon.";
            nameElement.textContent = "Error";
        });
}

button.addEventListener("click", loadRandomPokemon);
window.addEventListener("DOMContentLoaded", loadRandomPokemon);