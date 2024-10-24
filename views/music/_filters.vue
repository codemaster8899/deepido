<template>
  <div class="col-xs-24 filters">
    <span class="results-count">{{ pagination.count }} {{ $tc('results', pagination.count) }}</span>
    <ul class="box-filters droppable" @click="$event.target.classList.toggle('dropped')">
      <li class="active">
        <a href="#" @click="toggleFilters" class="toggle">
          <span class="glyph-icon si-glyph-text-search"></span>{{ $t('filter') }}
        </a>
      </li>
      <li>
        <a :href="'/fr/api/admin/music.xlsx?q' + this.$route.fullPath.split('?q')[1]">
          <span class="glyph-icon si-glyph-bullet-list-2"></span>{{ $t('xls_export') }}
        </a>
      </li>
    </ul>

    <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form col-xs-24 well hidden">
      <div class="form-group col-md-5">
        <label>{{ $t('music.created_between_start') }}</label>
        <input type="date" v-model="form.created_at_gteq" class="form-control" />
      </div>
      <div class="form-group col-md-5">
        <label>{{ $t('music.created_between_stop') }}</label>
        <input type="date" v-model="form.created_at_lteq" class="form-control" />
      </div>
      <div class="form-group col-md-5">
        <label>{{ $t('music.tagged') }}</label>
        <select v-model="form.tagged_with" class="form-control">
          <option value="">{{ $t('indifferent') }}</option>
          <option value="none">{{ $t('none') }}</option>
          <option value="any">{{ $t('music.tagged') }}</option>
        </select>
      </div>
      <div class="form-group col-md-5">
        <label>{{ $t('music.played_count') }}</label>
        <select v-model="form.played_values" class="form-control">
          <option value="">{{ $t('indifferent') }}</option>
          <option value="never">{{ $t('music.never_played') }}</option>
          <option value="at_least_one">{{ $t('music.at_least_once') }}</option>
          <option value="at_least_ten">{{ $t('music.at_least_ten') }}</option>
          <option value="more_than_hundred">{{ $t('music.at_least_hundred') }}</option>
        </select>
      </div>
      <div class="form-group col-md-4">
        <label>{{ $t('music.validated') }}</label>
        <select v-model="form.validated_eq" class="form-control">
          <option value="">{{ $t('indifferent') }}</option>
          <option value="true">{{} $t('yes') }}</option>
          <option value="false">{{} $t('no') }}</option>
        </select>
      </div>
      <div class="form-group col-md-12">
        <label>{{} $t('music.artist') }}</label>
        <input type="text" v-model="form.artist_name_cont" class="form-control" />
      </div>
      <div class="form-group col-md-12">
        <label>{{} $t('music.artist') }}</label>
        <input type="text" v-model="form.name_cont" class="form-control" />
      </div>

      <div class="form-group col-md-24">
        <input type="submit" class="btn btn-primary" :value="$t('filter')" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["pagination", "creators"],

  data: function () {
    return {
      form: {
        name_cont: "",
        artists_name_cont: "",
        validated_eq: "",
        played_values: "",
        tagged_with: "",
        created_at_lteq: "",
        created_by_id_eq: ""
      }
    };
  },

  methods: {
    toggleFilters: function () {
      window.$(".filters .well").toggleClass("hidden");
    },
    filter: function () {
      let query = {};
      for (let el in this.form) {
        query["q[" + el + "]"] = this.form[el];
      }
      this.$router.push({ query: query });
      window.$(".filters .well").toggleClass("hidden");
    }
  }
};
</script>
