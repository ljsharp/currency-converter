<template>
  <div class="h-screen w-full">
    <nav
      class="bg-gray-800 p-4 text-white w-full flex items-center justify-center gap-5"
    >
      <router-link to="/" class="hover:underline hover:text-blue-200"
        >Currency Converter</router-link
      >
      <router-link
        to="/update-rates"
        class="hover:underline hover:text-blue-200"
        >Update Rates</router-link
      >
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Add any custom styles if needed */
</style>
