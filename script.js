const getList = document.getElementById("dropdown");
const detailsContainer = document.getElementById("pokemon-container");
const emptyPokemonContainer = document.getElementById("pokemon-info-empty");
const infoPokemonContainer = document.querySelector(".pokemon-info-container");

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchPokemonList = async () => {
  const data = await fetchData("https://pokeapi.co/api/v2/pokemon");
  return data.results;
};

const fetchPokemonDetails = async (url) => {
  const data = await fetchData(url);
  return data;
};

const showPokemonList = async () => {
  const options = await fetchPokemonList();
  const optionResult = options;
  const dropdownList = document.getElementById("dropdown");

  // Clear the existing dropdown content
  dropdownList.innerHTML = "";

  for (option of optionResult) {
    const newOption = document.createElement("a");
    newOption.href = option.url;
    newOption.text = option.name;
    newOption.addEventListener("click", createOptionClickHandler(option));
    getList.appendChild(newOption);
  }
};

const hidePokemonList = () => {
  const dropdownList = document.getElementById("dropdown");
  getList.innerHTML = ""; // Clear the dropdown content
};

const getPokemonDetails = (pokemonData) => {
  const types = pokemonData.types
    .map((type) => capitalizeFirstLetter(type.type.name))
    .join(", ");
  const capitalizedPokemonName = capitalizeFirstLetter(pokemonData.name);
  const heightInMeters = pokemonData.height / 10; // Convert height to meters
  const weightInKg = pokemonData.weight / 10; // Convert weight to kilograms
  const abilities = pokemonData.abilities
    .map((ability) => capitalizeFirstLetter(ability.ability.name))
    .join(", ");

  // Update the content and toggle visibility
  document.querySelector(".pokemon-image").src = getPokemonGifUrl(
    pokemonData.id
  );
  document.querySelector(".pokemon-name").textContent = capitalizedPokemonName;
  document.querySelector(".pokemon-types").textContent = types;
  document.querySelector(".height-info").textContent =
    heightInMeters.toFixed(1) + " m";
  document.querySelector(".weight-info").textContent =
    weightInKg.toFixed(1) + " kg";
  document.querySelector(".abilities-info").textContent = abilities;

  // Toggle visibility
  emptyPokemonContainer.style.display = "none";
  infoPokemonContainer.style.display = "block";
};

const getPokemonGifUrl = (id) => {
  return (
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" +
    id +
    ".gif"
  );
};

const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const createOptionClickHandler = (option) => async (event) => {
  event.preventDefault();
  const pokemonData = await fetchPokemonDetails(option.url);
  getPokemonDetails(pokemonData);

  // Hide the dropdown after selecting an item
  hidePokemonList();
};
