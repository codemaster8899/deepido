<template>
   <div class="grid responsive">
    <div class="s12 l6">
        <div class="field label border">
          <input type="text" v-model="client.name">
          <label>Nom*</label>
        </div>
        <div class="field label border">
          <template v-if="client.id == null">
            <select v-model="client.organisation_id">
              <option v-for="organisation in organisations" :key="organisation.id" :value="organisation.id">{{ organisation.name }}</option>
            </select>
            <label>Organisation parente</label>
            <i>arrow_drop_down</i>
          </template>
          <template v-else>
            <input type="text" v-model="client.parent_organisation_name" disabled="true"/>
            <label>Organisation parente</label>
          </template>
        </div>
        <div class="field label border" v-if="client.id != null">
          <input type="text" v-model="client.api_uid" disabled="true" />
          <label>
            API UID
            <a @click="initApi()">Générer</a>
          </label>
        </div>
      </div>
      <div class="s12 l6">
        <div class="field label border">
            <select v-model="client.fallback_id">
              <option v-for="fallback in fallbacks" :key="fallback.id" :value="fallback.id">{{ fallback.name }}</option>
            </select>
            <label>Fallback audio</label>
            <i>arrow_drop_down</i>
        </div>
        <div class="field label border">
          <select v-model="client.brand_id">
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
          </select>
          <label>Marque</label>
          <i>arrow_drop_down</i>
        </div>
				<div v-if="client.id == null">          
          <label class="checkbox">
            <input type="checkbox">
            <span></span>
          </label>
          <b>Importer les modèles de template</b>
          <p>En cochant cette case tous les templates de l'organisation DEEPIDOO SIEGE [Bureaux] taggés "Modèle de templates" seront copiés dans la nouvelle organisation</p>
        </div>
        <div class="field label border" v-if="client.id != null">
          <input type="text"  v-model="client.api_secret" disabled="true"/>
          <label>API Secret</label>
        </div>
        <div class="field label border" v-if="client.id != null">
          <select v-model="client.sso_provider">
              <option value="">Pas de SSO</option>
              <option value="okta">Okta</option>
              <option value="ldap">LDAP</option>
          </select>
          <label>SSO Provider (Single Sign-On)</label>
          <i>arrow_drop_down</i>
        </div>
      </div>

      <div class="col-xs-12">
        <a v-if="client.id != null" href="#" @click.prevent="destroy" class="btn btn-danger pull-left">Supprimer</a>
      </div>

      <div class="col-xs-12"> 
        <button  :class="'small-round ' + progress">{{ $t('save') }}</button>
      </div>
    </div>

    <!-- <destroy-modal></destroy-modal> -->
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useClientStore } from '@/javascript/admin/stores/client'

import DestroyModal from "./modals/destroy.vue";

const clientStore = useClientStore()

const props = defineProps({
  modelValue: {
    required: true,
    default: {}
  }
})

const emits = defineEmits(['update:modelValue'])

const client = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const brands = computed(() => clientStore.brands)
const fallbacks = computed(() => clientStore.fallbacks)
const organisations = computed(() => clientStore.organisations)
</script>
