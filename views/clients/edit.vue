<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="clients" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>
            <router-link :to="'/clients'">{{ $t('top_nav.clients') }}</router-link>
          </li>
          <li>{{ client.name }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form styled-form">
          <client-form v-model="client"></client-form>   
          <div class="clearfix"></div>       
        </form>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ClientForm from "./_form.vue";

import { useClientStore } from '@/javascript/admin/stores/client'

let client = ref({})

const clientStore = useClientStore()

const route = useRoute()

onMounted(async () => {
  client.value = await clientStore.getClient(route.params.id)
})

const update = async () => {
 await clientStore.update(client.value)
}
</script>
