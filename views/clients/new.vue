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
          <li>{{ $t('clients.new') }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form styled-form">
          <client-form v-model="client"></client-form>
          <div class="clearfix"></div>
        </form>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ClientForm from "./_form.vue";

import { useClientStore } from '@/javascript/admin/stores/client'

const clientStore = useClientStore()

const router = useRouter()

const client = ref({})

clientStore.new()

const create = async () => {
  const { id } = await clientStore.create(client.value)
  if (id) {
    router.push({ name: 'show-client', id })
  }
}
</script>
