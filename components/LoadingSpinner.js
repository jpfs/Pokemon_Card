export const LoadingSpinner = {
  name: "LoadingSpinner",

  props: {
    message: {
      type: String,
      default: "A carregar novos Pokémons...",
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
  },

  computed: {
    spinnerClasses() {
      const sizeClasses = {
        small: "w-6 h-6",
        medium: "w-10 h-10",
        large: "w-16 h-16",
      };

      return `loading-spinner ${sizeClasses[this.size]} mx-auto mb-4`;
    },

    containerClasses() {
      return "text-center animate-pulse";
    },
  },

  template: `
    <div :class="containerClasses">
      <div :class="spinnerClasses"></div>
      <p class="text-gray-600 text-lg font-medium mb-4">{{ message }}</p>
      <div class="flex justify-center space-x-2">
        <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"></div>
        <div class="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce" 
             style="animation-delay: 0.1s"></div>
        <div class="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce" 
             style="animation-delay: 0.2s"></div>
      </div>
    </div>
  `,
};
