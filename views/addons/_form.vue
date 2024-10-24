<template>
  <div class="w">
    <div class="col-xs-24 col-md-8">
      <div class="form-group">
        <label>{{ $t('ref') }}*</label>
        <span class="error">{{ errors.ref }}</span>
        <input v-model="addon.ref" type="text" class="form-control" />
      </div>

      <div class="form-group">
        <label>{{ $t('name') }}*</label>
        <span class="error">{{ errors.name }}</span>
        <input v-model="addon.name" type="text" class="form-control" />
      </div>

      <div class="form-group">
        <label>{{ $t('device.price') }}</label>
        <span class="error">{{ errors.price }}</span>
        <input v-model="addon.price" type="number" class="form-control" step="0.01" />
      </div>

      <a v-if="addon.id != null" href="#" @click.prevent="destroy" style="text-decoration: none;">
        <i style="color: red; font-size: 18px;padding-right: 5px;">×</i>{{ $t('delete') }}</a>
      <input type="submit" :class="'btn btn-warning pull-right ' + progress" :value="$t('create')" />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return this.$store.state.AddonStore;
  },

  methods: {
    destroy: function () {
      if (confirm(t('confirm'))) {
        this.$store.dispatch('AddonStore/destroy', this.addon.id).then(() => {
          this.$router.push(`/addons`)
        })
      }
    }
  }
};
</script>
