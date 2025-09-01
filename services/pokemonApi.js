import { API_CONFIG, ERROR_MESSAGES } from "../utils/constants.js";

class PokemonApiService {
  /** Agarrar um Pokémon aleatório da API, com filtro opcional por tipo
   * @param {string|null} typeFilter
   * @returns {Promise<Object>}
   */
  async fetchRandomPokemon(typeFilter = null) {
    if (typeFilter) {
      return this.fetchPokemonByType(typeFilter);
    }

    const randomId = this.generateRandomPokemonId();
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}/pokemon/${randomId}`
    );
    return this.transformPokemonData(response.data);
  }

  /** Buscar um Pokémon aleatório de um tipo específico
   * @param {string} type
   * @returns {Promise<Object>}
   */
  async fetchPokemonByType(type) {
    try {
      const typeResponse = await axios.get(
        `${API_CONFIG.BASE_URL}/type/${type.toLowerCase()}`
      );

      const pokemonList = typeResponse.data.pokemon;

      if (!pokemonList || pokemonList.length === 0) {
        throw new Error(`Nenhum Pokémon encontrado do tipo ${type}`);
      }

      const randomPokemon = this.selectRandomPokemonFromList(pokemonList);

      const pokemonResponse = await axios.get(randomPokemon.pokemon.url);

      return this.transformPokemonData(pokemonResponse.data);
    } catch (error) {
      console.error("Error fetching Pokemon by type:", error);

      if (error.response?.status === 404) {
        throw new Error(`Tipo "${type}" não encontrado`);
      }

      throw new Error(
        error.message || `Erro ao carregar Pokémon do tipo ${type}`
      );
    }
  }

  /** Selecionar um Pokémon aleatório de uma lista
   * @param {Array} pokemonList
   * @returns {Object}
   */
  selectRandomPokemonFromList(pokemonList) {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    return pokemonList[randomIndex];
  }

  /** Gerar um ID de Pokémon aleatório dentro do intervalo válido
   * @returns {number}
   */
  generateRandomPokemonId() {
    return Math.floor(Math.random() * API_CONFIG.POKEMON_COUNT) + 1;
  }

  /** Transformar os dados brutos da API num formato limpo e utilizável
   * @param {Object} rawData
   * @returns {Object}
   */
  transformPokemonData(rawData) {
    return {
      id: rawData.id,
      name: this.capitalizeName(rawData.name),
      hp: this.extractHpStat(rawData.stats),
      types: this.extractTypes(rawData.types),
      image: this.getBestImage(rawData.sprites),
      weight: rawData.weight || 0,
      height: rawData.height || 0,
      abilities: this.extractAbilities(rawData.abilities),
    };
  }

  /** Capitaliza o nome do Pokémon
   * @param {string} name
   * @returns {string}
   */
  capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  /** Extrai a estatística de HP do array de stats
   * @param {Array} stats
   * @returns {number}
   */
  extractHpStat(stats) {
    const hpStat = stats.find((stat) => stat.stat.name === "hp");
    return hpStat ? hpStat.base_stat : 0;
  }

  /** Extrai os tipos de Pokémon
   * @param {Array} types
   * @returns {Array}
   */
  extractTypes(types) {
    return types.map((typeObj) => typeObj.type.name);
  }

  /** Extrai as habilidades do Pokémon
   * @param {Array} abilities
   * @returns {Array}
   */
  extractAbilities(abilities) {
    return abilities.map((abilityObj) => abilityObj.ability.name).slice(0, 3);
  }

  /** Seleciona a imagem para o Pokémon
   * @param {Object} sprites
   * @returns {string}
   */
  getBestImage(sprites) {
    return (
      sprites.other?.["official-artwork"]?.front_default ||
      sprites.front_default ||
      API_CONFIG.DEFAULT_IMAGE
    );
  }

  /** Validar se um tipo de Pokémon é válido
   * @param {string} type
   * @returns {boolean}
   */
  isValidPokemonType(type) {
    const validTypes = [
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ];

    return validTypes.includes(type.toLowerCase());
  }
}

export const pokemonApiService = new PokemonApiService();
