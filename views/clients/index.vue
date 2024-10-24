<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="clients" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>{{ $t('top_nav.clients') }}</li>
        </ul>
        <div class="pull-right">
          <router-link :to="'/clients/new'" class="add-link">+ {{ $t('clients.new') }}</router-link>
        </div>
      </div>

      <filters :pagination="pagination"></filters>

      <div class="col-xs-24 overflowable">
        <table class="stripes large-space table-users">
          <thead>
            <tr>
              <th class="fixed-width">{{ $t('ref') }}</th>
              <th class="fixed-width">{{ $t('created_at') }}</th>
              <th class="fixed-width">{{ $t('name') }}</th>
              <th class="fixed-width">Marque</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id">
              <td>
                <router-link :to="'/clients/' + client.id ">{{ client.id }}</router-link>
              </td>
              <td>{{ client.created_at }}</td>
              <td>
                <router-link :to="'/clients/' + client.id ">{{ client.name }}</router-link>
              </td>
              <td>
                {{ client.brand }}
              </td>
              <td>
                <span class="glyph-icon si-glyph-bullet-list-2"></span>Générer un rapport
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SharedPagination v-if="clientStore.pagination" :store="clientStore"></SharedPagination>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import SharedPagination from '../shared/_pagination.vue';
import filters from "./_filters.vue";

import { useClientStore } from '@/javascript/admin/stores/client'
import { useRoute } from 'vue-router'

const route = useRoute()

const clientStore = useClientStore()


clientStore.index(route.fullPath)

const pagination = computed(() => clientStore.pagination)
const clients = computed(() => clientStore.clients)
</script>
