import { POKEMON_TYPES, API_CONFIG } from "../utils/constants.js";

export const PokemonCard = {
  name: "PokemonCard",

  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      imageLoaded: false,
      imageError: false,
    };
  },

  methods: {
    /** Obter as classes Tailwind para o estilo do tipo de Pokémon
     * @param {string} type
     * @returns {Object}
     */
    getTypeStyles(type) {
      return (
        POKEMON_TYPES[type.toLowerCase()] || {
          bg: "bg-gray-400",
          text: "text-white",
        }
      );
    },

    /** Formata o peso para quilogramas
     * @param {number} weight
     * @returns {string}
     */
    formatWeight(weight) {
      if (!weight || weight === 0) return "Unknown";
      return (weight / 10).toFixed(1);
    },

    /** Formata a altura para metros
     * @param {number} height
     * @returns {string}
     */
    formatHeight(height) {
      if (!height || height === 0) return "Unknown";
      return (height / 10).toFixed(1);
    },

    /** Formata o ID do Pokémon
     * @param {number} id
     * @returns {string}
     */
    formatPokemonId(id) {
      return `#${id.toString().padStart(3, "0")}`;
    },

    /** Formata nomes de habilidades (substitui hífens por espaços)
     * @param {string} ability
     * @returns {string}
     */
    formatAbilityName(ability) {
      if (!ability) return "";
      return ability
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    },

    onImageLoad() {
      this.imageLoaded = true;
      this.imageError = false;
    },

    /** caso o carregamento da imagem falhe
     * @param {Event} event
     */
    onImageError(event) {
      this.imageError = true;
      event.target.src = API_CONFIG.DEFAULT_IMAGE;
    },

    /** Calcula a largura da barra de HP com base no valor de HP
     * @param {number} hp
     * @returns {string}
     */
    getHpBarWidth(hp) {
      const maxHp = 255;
      const percentage = Math.min((hp / maxHp) * 100, 100);
      return `${percentage}%`;
    },

    /** Determina a cor da barra de HP com base no valor de HP
     * @param {number} hp
     * @returns {string}
     */
    getHpBarColor(hp) {
      if (hp >= 100) return "bg-green-400";
      if (hp >= 70) return "bg-yellow-400";
      if (hp >= 40) return "bg-orange-400";
      return "bg-red-400";
    },
  },

  computed: {
    /** Verifica se o Pokémon tem habilidades válidas
     * @returns {boolean}
     */
    hasAbilities() {
      return this.pokemon.abilities && this.pokemon.abilities.length > 0;
    },

    /** Obtém o tipo primário para o gradiente de fundo
     * @returns {string}
     */
    primaryType() {
      return this.pokemon.types[0] || "normal";
    },

    /** Obtém o estilo dinâmico do cartão baseado no tipo de Pokémon
     * @returns {Object}
     */
    cardStyle() {
      const typeColor = POKEMON_TYPES[this.primaryType]?.color || "#A8A878";
      return {
        background: `linear-gradient(135deg, ${typeColor}CC 0%, ${typeColor}88 100%)`,
      };
    },
  },

  template: `
    <transition name="fade">
      <article 
        class="pokemon-card rounded-xl p-6 text-white shadow-2xl w-96 mx-auto 
               relative overflow-hidden transform transition-all duration-300 
               hover:-translate-y-2 hover:shadow-pokemon-hover"
        :style="cardStyle"
        role="article" 
        :aria-label="'Pokemon card for ' + pokemon.name"
      >
        <div class="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div class="relative z-10">

          <div class="text-center mb-3">
            <div class="relative">
              <img 
                :src="pokemon.image" 
                :alt="pokemon.name + ' official artwork'"
                class="w-36 h-36 mx-auto object-contain transform transition-all duration-300
                       hover:scale-110 filter drop-shadow-2xl"
                @load="onImageLoad"
                @error="onImageError"
              />
              

              <div 
                v-if="!imageLoaded" 
                class="absolute inset-0 flex items-center justify-center 
                       bg-white bg-opacity-20 rounded-full w-36 h-36 mx-auto backdrop-blur-sm"
              >
                <div class="loading-spinner w-8 h-8"></div>
              </div>
            </div>
          </div>
          

          <header class="text-center mb-3">
            <h2 class="text-3xl font-bold mb-1 tracking-wide">{{ pokemon.name }}</h2>
            <p class="text-lg opacity-90 font-medium">{{ formatPokemonId(pokemon.id) }}</p>
          </header>
          

          <div class="grid grid-cols-2 gap-3 mb-3">
            <div class="col-span-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 
                        border border-white border-opacity-20 transform transition-all duration-300
                        hover:bg-opacity-30 hover:-translate-y-1">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm opacity-75 font-medium">Health Points</span>
                <span class="text-xl font-bold">{{ pokemon.hp }}</span>
              </div>
              <div class="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                <div 
                  :class="getHpBarColor(pokemon.hp)"
                  class="hp-bar h-3 rounded-full shadow-sm"
                  :style="{ width: getHpBarWidth(pokemon.hp) }"
                ></div>
              </div>
            </div>
            

            <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 
                        border border-white border-opacity-20 transform transition-all duration-300
                        hover:bg-opacity-30 hover:-translate-y-1">
              <div class="text-sm opacity-75 mb-1 font-medium">Weight</div>
              <div class="text-xl font-bold">{{ formatWeight(pokemon.weight) }}kg</div>
            </div>
            

            <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 
                        border border-white border-opacity-20 transform transition-all duration-300
                        hover:bg-opacity-30 hover:-translate-y-1">
              <div class="text-sm opacity-75 mb-1 font-medium">Height</div>
              <div class="text-xl font-bold">{{ formatHeight(pokemon.height) }}m</div>
            </div>
          </div>
          

          <div class="mb-3">
            <h3 class="text-sm opacity-75 mb-2 text-center font-medium tracking-wide">TYPES</h3>
            <div class="flex justify-center gap-3 flex-wrap">
              <span 
                v-for="type in pokemon.types" 
                :key="type"
                :class="[getTypeStyles(type).bg, getTypeStyles(type).text]"
                class="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider
                       transform transition-all duration-200 hover:scale-110 hover:shadow-lg
                       border-2 border-white border-opacity-20"
                :title="'Type: ' + type"
              >
                {{ type }}
              </span>
            </div>
          </div>
          

          <div v-if="hasAbilities" class="text-center">
            <h3 class="text-sm opacity-75 mb-2 font-medium tracking-wide">ABILITIES</h3>
            <div class="flex flex-wrap justify-center gap-2">
              <span 
                v-for="ability in pokemon.abilities" 
                :key="ability"
                class="bg-white bg-opacity-25 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium
                       border border-white border-opacity-30 transform transition-all duration-200
                       hover:bg-opacity-40 hover:scale-105"
                :title="'Ability: ' + formatAbilityName(ability)"
              >
                {{ formatAbilityName(ability) }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </transition>
  `,
};
