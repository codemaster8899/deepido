<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>{{ $t('main_nav.devices') }}</li>
        </ul>
        <div class="pull-right">
          <router-link :to="'/addons/new'" class="add-link">{{ $t('devices.add_addon') }}</router-link>
        </div>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable">
          <li><router-link to="/devices">{{ $t('devices.title') }}</router-link></li>
          <li class="active"><router-link to="/addons">{{ $t('devices.addons') }}</router-link></li>
          <li><router-link to="/shapes">{{ $t('shapes.models') }}</router-link></li>
        </ul>
        <div class="row styled-form">
          <div class="col-xs-24 overflowable">
            <filters :pagination="pagination"></filters>

            <table class="table table-striped table-thin">
              <thead>
                <tr>
                  <th style="width: 30px;">{{ $t('id') }}</th>
                  <th style="width: 160px;">{{ $t('ref') }}</th>
                  <th>{{ $t('name') }}</th>
                  <th style="width: 100px;text-align: right;">{{ $t('devices.price') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="addon in addons" :key="addon.id">
                  <td>
                    <router-link :to="'/addons/' + addon.id + '/edit'">{{ addon.id }}</router-link>
                  </td>
                  <td>{{ addon.ref }}</td>
                  <td>{{ addon.name }}</td>
                  <td style="text-align: right;">{{ addon.price }} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <pagination :pagination="pagination"></pagination>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import Pagination from "../shared/_pagination.vue";
import Filters from "./_filters.vue";

export default {
  components: {
    'pagination': Pagination,
    'filters': Filters
  },

  data: function () {
    return this.$store.state.AddonStore;
  },

  mounted: function () {
    this.$store.dispatch("AddonStore/index", this.$route.fullPath);
  }

};
</script>
