document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("pokemonInput");
  const button = document.getElementById("searchButton");
  const detailsDiv = document.getElementById("pokemonDetails");

  button.addEventListener("click", async () => {
    const pokemonName = input.value.trim();
    if (!pokemonName) return;

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const pokemonData = response.data;

      detailsDiv.innerHTML = `
                <h2>${pokemonData.name}</h2>
                <img src="${pokemonData.sprites.front_default}" alt="${
        pokemonData.name
      }">
                <p>Types : ${pokemonData.types
                  .map((type) => type.type.name)
                  .join(", ")}</p>
            `;
    } catch (error) {
      console.error(
        "Erreur lors de la requête :",
        error.response ? error.response.data : error.message
      );
      detailsDiv.innerHTML = "<p>Erreur lors de la recherche du Pokémon.</p>";
    }
  });
});
