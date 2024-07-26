<template>
  <div class="min-h-screen flex items-start pt-20 justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Currency Converter</h2>
      <form @submit.prevent="convertCurrency">
        <div class="mb-4">
          <label class="block text-gray-700">Amount:</label>
          <input
            v-model.number="amount"
            type="number"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">From:</label>
          <select
            v-model="fromCurrency"
            class="w-full p-2 border rounded"
            required
          >
            <option
              v-for="currency in currencies"
              :key="currency"
              :value="currency.currency"
            >
              {{ currency.currency }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">To:</label>
          <select
            v-model="toCurrency"
            class="w-full p-2 border rounded"
            required
          >
            <option
              v-for="currency in currencies"
              :key="currency"
              :value="currency.currency"
            >
              {{ currency.currency }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded"
          :disabled="loading"
        >
          {{ loading ? "Converting..." : "Convert" }}
        </button>
      </form>
      <div v-if="convertedAmount !== null" class="mt-6 text-center">
        <p class="text-lg font-semibold">
          Converted Amount: {{ convertedAmount.toFixed(2) }}
        </p>
      </div>
      <div v-if="message !== null" class="mt-6 text-center">
        <p class="text-lg text-red-400 font-semibold">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import currencies from "../currency_converter.js";

export default {
  setup() {
    const loading = ref(false);
    const message = ref(null);
    const amount = ref(0);
    const fromCurrency = ref("USD");
    const toCurrency = ref("GHS");
    const convertedAmount = ref(null);
    // const currencies = ref(["USD", "EUR", "GHS"]); // Add more currencies as needed

    const convertCurrency = async () => {
      loading.value = true;
      message.value = null;
      await axios
        .get("http://localhost:3000/convert", {
          params: {
            from: fromCurrency.value,
            to: toCurrency.value,
            amount: amount.value,
          },
        })
        .then((response) => {
          convertedAmount.value = response.data.convertedAmount;
        })
        .catch((error) => {
          console.error("Error converting currency:", error);
          message.value = "Error occurred while converting currency!";
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      loading,
      amount,
      fromCurrency,
      toCurrency,
      convertedAmount,
      currencies,
      convertCurrency,
    };
  },
};
</script>
