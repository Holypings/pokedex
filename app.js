document.addEventListener("DOMContentLoaded", () => {
  const pokemonList = document.getElementById("pokemonList");
  const button = document.getElementById("searchButton");
  const input = document.getElementById("pokemonInput");
  const detailsDiv = document.getElementById("pokemonDetails");

  window.addEventListener("load", function () {
    document.getElementById("popup").style.display = "block";
  });
  let span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    document.getElementById("popup").style.display = "none";
  };

  // Fonction pour récupérer les détails d'un Pokémon par son ID
  async function getPokemonDetails(pokemonId) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const pokemonData = response.data;
      return pokemonData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Fonction pour récupérer la liste des Pokemon et afficher leurs détails
  async function fetchAllPokemon() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const pokemonNames = response.data.results.map((result) => result.name);

      const promises = pokemonNames.map((name) => getPokemonDetails(name));
      const pokemonDetails = await Promise.all(promises);

      pokemonDetails.forEach((pokemon, index) => {
        if (pokemon) {
          const card = document.createElement("div");
          card.className = "pokemon-card";

          const imgDefault = document.createElement("img");
          imgDefault.src = pokemon.sprites.front_default;
          imgDefault.alt = pokemon.name;

          const figcaption = document.createElement("figcaption");
          figcaption.innerHTML = `<h3>${pokemon.name} #${
            index + 1
          }</h3><p>Types : ${pokemon.types
            .map((type) => type.type.name)
            .join(", ")}</p>`;

          card.appendChild(imgDefault);
          card.appendChild(figcaption);

          pokemonList.appendChild(card);
        }
      });
    } catch (error) {
      console.error(error);
      pokemonList.innerHTML =
        "<p>Erreur lors de la récupération des Pokémon.</p>";
    }
  }

  button.addEventListener("click", async () => {
    const pokemonName = input.value.trim();

    if (!pokemonName) return;

    pokemonList.style.display = "none"; // Cachez la liste des Pokémon

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const pokemonData = response.data;

      // Création de la carte Pokémon
      const card = document.createElement("div");
      card.className = "pokemon-card";

      const imgDefault = document.createElement("img");
      imgDefault.src = pokemonData.sprites.front_default;
      imgDefault.alt = pokemonData.name;

      const figcaption = document.createElement("figcaption");
      figcaption.innerHTML = `<h3>${
        pokemonData.name
      }</h3><p>Types : ${pokemonData.types
        .map((type) => type.type.name)
        .join(", ")}</p>`;

      card.appendChild(imgDefault);
      card.appendChild(figcaption);

      // Affichage de la carte Pokémon dans detailsDiv
      detailsDiv.innerHTML = "";
      detailsDiv.appendChild(card);
    } catch (error) {
      console.error(error);
      detailsDiv.innerHTML = "<p>Erreur lors de la recherche du Pokémon.</p>";
    }
  });

  input.addEventListener("input", () => {
    if (!input.value.trim()) {
      pokemonList.style.display = "block";
    }
  });

  fetchAllPokemon(); // Assurez-vous que cette fonction est appelée après avoir défini tous les écouteurs d'événements
});

window.addEventListener("load", function () {
  setTimeout(
    function openPopup() {
      document.querySelector(".popup").style.display = "block";
    },
    1000 // Attendre 1 seconde avant d'afficher la pop-up
  );
});
