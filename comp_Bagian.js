Vue.component("tab-bagian", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: {}
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar bagian
							<i :class="icon.plus" 
							@click="newData">
							</i>
						</li>

						<li 
						v-for="(row, index) in datanya" 
						class="w3-hover-light-gray"
						>
							{{row.bagian}}
							<a @click="deData = datanya[index]; $emit('modal', deData)" 
							class="w3-right w3-tag w3-teal w3-round">
								Edit <i :class="icon.pencil"></i>
							</a>
						</li>
					</ul>
				</div>`,
	methods: {
		newData() {
			this.deData = {
				bagian: ''
			} 
			this.$emit('modal', this.deData)
		}
	}
});

Vue.component("form-bagian", {
	props: ["datanya", "icon"],
	data () {
		return {
			mode: this.datanya.bagian ? 'update' : 'new',
			deData: this.datanya.bagian
		}
	},
    template: 
			`<div>
				<h1 class="w3-left">Masukkan nama bagian</h1>

				<input type="text" 
				class="w3-input w3-margin-bottom"
				:value="deData" 
				@change="deData = $event.target.value">

				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				:class="['w3-button w3-left w3-margin-top w3-teal w3-round-large', deData ? '' : 'w3-hide']" 
				:value="[deData && mode == 'update' ? 'Update' : 'Tambah']" 
				@click="send"
				>
				
				<!-- 
				@click="console.log(deData.idBagian+deData)"
				-->
			</div>`,
	methods: {
		send() {
			this.mode == 'update' ?
			this.$emit('update', {store:'bagian', id: {id_bagian: this.datanya.id_bagian}, val:{bagian: this.deData} }) :
			this.$emit('tambah', {bagian: this.deData})
		}
	}
});