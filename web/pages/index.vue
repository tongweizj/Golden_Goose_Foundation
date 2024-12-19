<template>
  <div class="mb-8 border-b border-dotted border-gray-300 pb-8">
    <ol>
      <li v-for="item in data" :key="item">
        <a :href="'/posts/' + item.id"> {{ item.title }} </a>
      </li>
    </ol>
  </div>
</template>

<script setup>
import {} from 'vue'

const res = await useFetch(
  'https://api.goldpanda.net/api/news?action=get-data-ids&category=battery',
  {
    method: 'get',
    id: 1,
  }
)
console.log(res.data)
const { data } = res
</script>

<style scoped></style>
