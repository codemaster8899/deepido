import { defineStore } from 'pinia'
import { useErrorStore } from './errors'

export const useClientStore = defineStore('client', {
	state: () => {
		return {
			progress: '',
			confirm_name: '',
			clients: [],
			client: {},
			errors: {},
			fallbacks: [],
			organisations: [],
			brands: [],
			pagination: {}
		}
	},

	actions: {
		loading() {
      this.progress = 'loading disabled';
    },
    loaded(klass) {
      this.progress = `loaded ${klass}`;
      setTimeout(function () {
        this.progress = ''
      }, 1000)
    },
		errors(data) {
      // this.errors = helpers.showErrors(data);
    },
		reset(data) {
			this.errors = {};
      this.confirm_name = '';
      this.client = data.client;
      this.fallbacks = data.fallbacks;
      this.organisations = data.organisations;
      this.brands = data.brands;
		},
		async initApi(id){
			await this.Api.post(`/clients/${id}/init_api`, { id })
    },
		async index(full_path) {
			try {
				const { data } = await this.Api.get(`${full_path}`)
				this.clients = data.clients;
				this.pagination = data.pagination;
			} catch (e) {
				const errorStore = useErrorStore()
				errorStore.logErrors(e)
			} finally {
				console.log('finally')
			}
		},
		async new() {
			const { data } = await this.Api.get('/clients/new')
			this.reset(data)
		},
		async create(form) {
			try {
				const { data } = await this.Api.post('/clients', { client: form })
				this.loaded('success')
				return data
			} catch(e) {
				this.errors(e.messages)
        this.loaded('failed')
			} 
		},
		async getClient(id) {
			const { data } = await this.Api.get(`/clients/${id}`)
      this.reset(data)
			console.log('data', data)
			return data.client
    },
    async update(form) {
      this.loading()
			try {
				const { data } = await this.Api.put(`/clients/${id}`, { client: form })
				this.reset(data)
				this.loaded('success')
			} catch(e) {
				this.errors(e);
				this.loaded('failed')
			}
    },
	}
})