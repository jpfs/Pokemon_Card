import { POKEMON_TYPES } from "../utils/constants.js";

export const TypeFilter = {
  name: "TypeFilter",

  props: {
    selectedType: {
      type: String,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["type-selected"],

  data() {
    return {
      availableTypes: [
        "fire",
        "water",
        "grass",
        "electric",
        "psychic",
        "dragon",
        "fighting",
        "poison",
        "ice",
        "ghost",
        "rock",
        "flying",
      ],
    };
  },

  methods: {
    /** Seleciona um type de Pokémon ou remove o filtro
     * @param {string|null} type
     */
    selectType(type) {
      if (this.isLoading) return;

      const newType = this.selectedType === type ? null : type;
      this.$emit("type-selected", newType);
    },

    /** Obter as classes Tailwind para o estilo do type de Pokémon
     * @param {string} type
     * @returns {Object}
     */
    getTypeStyles(type) {
      return (
        POKEMON_TYPES[type] || {
          bg: "bg-gray-400",
          text: "text-white",
        }
      );
    },

    /** Verifica se um type está selecionado
     * @param {string} type
     * @returns {boolean}
     */
    isTypeSelected(type) {
      return this.selectedType === type;
    },

    /** Obtém as classes CSS para um botão de type
     * @param {string} type
     * @returns {Array}
     */
    getTypeButtonClasses(type) {
      const baseClasses = [
        "type-filter-button",
        "px-3",
        "py-2",
        "rounded-full",
        "text-sm",
        "font-bold",
        "uppercase",
        "tracking-wide",
        "border-2",
        "transition-all",
        "duration-200",
      ];

      const typeStyles = this.getTypeStyles(type);
      const stateClasses = [typeStyles.bg, typeStyles.text];

      const interactionClasses = this.isTypeSelected(type)
        ? ["active", "shadow-lg", "border-white", "border-opacity-50"]
        : [
            "border-transparent",
            "hover:border-white",
            "hover:border-opacity-30",
          ];

      const loadingClasses = this.isLoading
        ? ["opacity-50", "cursor-not-allowed"]
        : ["cursor-pointer"];

      return [
        ...baseClasses,
        ...stateClasses,
        ...interactionClasses,
        ...loadingClasses,
      ];
    },

    /** Obtém as classes CSS para o botão "Todos"
     * @returns {Array}
     */
    getAllTypesButtonClasses() {
      const baseClasses = [
        "type-filter-button",
        "px-3",
        "py-2",
        "rounded-full",
        "text-sm",
        "font-bold",
        "uppercase",
        "tracking-wide",
        "border-2",
        "transition-all",
        "duration-200",
      ];

      const stateClasses = !this.selectedType
        ? [
            "bg-gray-600",
            "text-white",
            "border-gray-600",
            "active",
            "shadow-lg",
          ]
        : [
            "bg-gray-200",
            "text-gray-600",
            "border-gray-200",
            "hover:bg-gray-300",
          ];

      const loadingClasses = this.isLoading
        ? ["opacity-50", "cursor-not-allowed"]
        : ["cursor-pointer"];

      return [...baseClasses, ...stateClasses, ...loadingClasses];
    },
  },

  computed: {
    /** Mensagem de status do filtro atual
     * @returns {string|null}
     */
    filterStatusMessage() {
      if (!this.selectedType) return null;
      return `Showing only Pokémon of type ${this.selectedType}`;
    },

    /** Verifica se algum filtro está ativo
     * @returns {boolean}
     */
    hasActiveFilter() {
      return Boolean(this.selectedType);
    },
  },

  template: `
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-3 text-center">
        Filter by Type
      </h3>
      
      <div class="flex flex-wrap justify-center gap-2 mb-3">
        <button
          @click="selectType(null)"
          :class="getAllTypesButtonClasses()"
          :disabled="isLoading"
          :aria-pressed="!selectedType"
          aria-label="Show all Pokémon types"
        >
          All
        </button>
        
        <button
          v-for="type in availableTypes"
          :key="type"
          @click="selectType(type)"
          :class="getTypeButtonClasses(type)"
          :disabled="isLoading"
          :aria-pressed="isTypeSelected(type)"
          :title="'Filter by ' + type + ' type'"
        >
          {{ type }}
        </button>
      </div>
      
      <transition name="fade">
        <p 
          v-if="filterStatusMessage" 
          class="text-center text-sm text-gray-600"
        >
          {{ filterStatusMessage }}
          <strong class="capitalize">{{ selectedType }}</strong>
        </p>
      </transition>
    </div>
  `,
};
