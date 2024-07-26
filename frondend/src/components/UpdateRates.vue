<template>
  <div class="min-h-screen flex items-start pt-20 justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 class="text-2xl font-bold mb-6">Update Exchange Rates</h2>
      <button
        @click="updateRates"
        :disabled="loading"
        class="w-full bg-blue-500 text-white p-2 rounded"
      >
        {{ loading ? "Updating Rates..." : "Update Rates" }}
      </button>
      <div v-if="message" class="mt-6 text-center">
        <p class="text-lg font-semibold">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const message = ref(null);
    const loading = ref(false);

    const updateRates = async () => {
      loading.value = true;
      await axios
        .get("http://localhost:3000/update-rates")
        .then((response) => {
          message.value = response.data;
        })
        .catch((error) => {
          console.error("Error updating rates:", error);
          message.value = "Error updating rates";
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      loading,
      message,
      updateRates,
    };
  },
};
</script>
