export const ErrorMessage = {
  name: "ErrorMessage",

  props: {
    message: {
      type: String,
      required: true,
    },
  },

  emits: ["retry"],

  methods: {
    handleRetry() {
      this.$emit("retry");
    },
  },

  template: `
    <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white 
                shadow-2xl max-w-md mx-auto transform transition-all duration-300
                hover:scale-105 border border-red-400">
      <div class="text-center">
        <svg class="w-12 h-12 mx-auto mb-4 text-white animate-bounce" 
             fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clip-rule="evenodd"/>
        </svg>
        
        <h3 class="text-xl font-bold mb-3 tracking-wide">
          Oops! Something went wrong
        </h3>
        
        <p class="text-red-100 mb-6 leading-relaxed">
          {{ message }}
        </p>
        
        <button 
          @click="handleRetry"
          class="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm
                 text-white font-semibold py-3 px-6 rounded-full
                 transform transition-all duration-200 hover:scale-105 hover:-translate-y-1
                 border border-white border-opacity-30 shadow-lg hover:shadow-xl
                 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
        >
          <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Try Again
        </button>
      </div>
    </div>
  `,
};
