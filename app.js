import { pokemonApiService } from "./services/pokemonApi.js";
import { PokemonCard } from "./components/PokemonCard.js";
import { ErrorMessage } from "./components/ErrorMessage.js";
import { LoadingSpinner } from "./components/LoadingSpinner.js";
import { TypeFilter } from "./components/TypeFilter.js";
import { APP_INFO } from "./utils/constants.js";

const { createApp, ref, onMounted, computed } = Vue;

const PokemonApp = {
  name: "PokemonApp",

  components: {
    PokemonCard,
    ErrorMessage,
    LoadingSpinner,
    TypeFilter,
  },

  setup() {
    // Estado da aplicação
    const pokemon = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    const totalFetched = ref(0);
    const isFirstLoad = ref(true);
    const selectedType = ref(null);

    /** Carregar um Pokémon (aleatório ou por tipo)
     * @param {string|null} typeFilter
     */
    const loadPokemon = async (typeFilter = null) => {
      isLoading.value = true;
      error.value = null;

      try {
        const newPokemon = await pokemonApiService.fetchRandomPokemon(
          typeFilter
        );
        pokemon.value = newPokemon;
        totalFetched.value++;
        isFirstLoad.value = false;
      } catch (err) {
        console.error("Failed to load Pokemon:", err);
        error.value = err.message || "Failed to load Pokémon. Try again.";
      } finally {
        isLoading.value = false;
      }
    };

    /** Handler para quando um tipo é selecionado no filtro
     * @param {string|null} type
     */
    const handleTypeSelected = (type) => {
      selectedType.value = type;
      loadPokemon(type);
    };

    /** Handler para retry de erro */
    const handleRetry = () => {
      loadPokemon(selectedType.value);
    };

    /** Carregar novo Pokémon mantendo o filtro atual */
    const loadNewPokemon = () => {
      loadPokemon(selectedType.value);
    };

    // Computed properties
    const hasData = computed(
      () => pokemon.value && !isLoading.value && !error.value
    );

    const showError = computed(() => error.value && !isLoading.value);

    const buttonText = computed(() => {
      if (isLoading.value) return "Loading...";

      if (selectedType.value) {
        const typeCapitalized =
          selectedType.value.charAt(0).toUpperCase() +
          selectedType.value.slice(1);
        return `New Pokémon ${typeCapitalized}`;
      }

      if (isFirstLoad.value) return "Finding First Pokémon";
      return "Find New Pokémon";
    });

    const statsText = computed(() => {
      if (totalFetched.value === 1) return "Ready to explore?";
      if (totalFetched.value === 2) return "1 Pokémon founded";
      return `${totalFetched.value - 1} Pokémon founded`;
    });

    const loadingMessage = computed(() => {
      if (selectedType.value) {
        const typeCapitalized =
          selectedType.value.charAt(0).toUpperCase() +
          selectedType.value.slice(1);
        return `Searching for Pokémon of type ${typeCapitalized}...`;
      }

      if (isFirstLoad.value) {
        return "Discover Your First Pokemon...";
      }

      return "Loading a new Pokémon...";
    });

    // Lifecycle
    onMounted(() => {
      loadPokemon();
    });

    return {
      // State
      pokemon,
      isLoading,
      error,
      totalFetched,
      isFirstLoad,
      selectedType,

      // Computed
      hasData,
      showError,
      buttonText,
      statsText,
      loadingMessage,

      // Methods
      loadPokemon,
      loadNewPokemon,
      handleTypeSelected,
      handleRetry,

      // Constants
      APP_INFO,
    };
  },

  template: `
    <div class="container mx-auto px-4 py-4 min-h-screen flex flex-col">
      <header class="text-center mb-6 flex-shrink-0 header-section">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {{ APP_INFO.TITLE }}
          </span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-600 mb-4">
          {{ APP_INFO.SUBTITLE }}
        </p>
        
        <div class="inline-flex items-center px-3 py-2 bg-white bg-opacity-70 rounded-full shadow-sm mb-4">
          <svg class="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-sm font-medium text-gray-700">
            {{ statsText }}
          </span>
        </div>

        <type-filter 
          :selected-type="selectedType" 
          :is-loading="isLoading"
          @type-selected="handleTypeSelected"
        />
      </header>

      <main class="flex-grow flex items-center justify-center mb-4 main-content">
        <transition name="slide-up" mode="out-in">
          <loading-spinner 
            v-if="isLoading" 
            key="loading"
            :message="loadingMessage"
            size="medium"
          />
          
          <error-message 
            v-else-if="showError" 
            key="error"
            :message="error"
            @retry="handleRetry"
          />
          
          <pokemon-card 
            v-else-if="hasData" 
            key="pokemon"
            :pokemon="pokemon"
          />
          
          <div v-else key="fallback" class="text-center text-gray-500">
            <p>No Pokemon to display</p>
          </div>
        </transition>
      </main>

      <div class="text-center flex-shrink-0 mb-4">
        <button 
          @click="loadNewPokemon"
          :disabled="isLoading"
          class="pokemon-button inline-flex items-center
                 focus:outline-none focus:ring-4 focus:ring-pokemon-primary focus:ring-opacity-50"
          :aria-label="buttonText"
        >
          <svg 
            v-if="!isLoading" 
            class="w-4 h-4 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fill-rule="evenodd" 
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" 
              clip-rule="evenodd"
            />
          </svg>
          
          <div v-else class="w-4 h-4 mr-2">
            <div class="loading-spinner w-4 h-4"></div>
          </div>
          
          {{ buttonText }}
        </button>
        
        <p class="text-xs text-gray-500 mt-2">
          <kbd class="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd> 
          to find a new Pokémon
        </p>
      </div>

      <footer class="text-center mt-4 text-gray-500 flex-shrink-0">
        <p class="text-sm mb-1">
          Made by 
          <strong class="text-gray-700">João Santos</strong>
          for the 
          <strong class="text-blue-600">GoParity</strong> 
          Frontend Challenge
        </p>
      </footer>
    </div>
  `,

  mounted() {
    const handleKeyPress = (event) => {
      if (event.code === "Space" && !this.isLoading) {
        event.preventDefault();
        this.loadNewPokemon();
      }

      if (event.code === "KeyR" && this.showError) {
        event.preventDefault();
        this.handleRetry();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    this.$unmounted = () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  },
};

export function initializeApp() {
  const app = createApp({
    components: {
      PokemonApp,
    },
    template: "<pokemon-app />",
  });

  app.config.errorHandler = (err, instance, info) => {
    console.error("Vue error:", err, info);
  };

  return app.mount("#app");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
