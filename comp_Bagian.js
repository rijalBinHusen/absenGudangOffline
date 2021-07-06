Vue.component("tab-bagian", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: ''
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
				idBagian: 'bag'+(this.datanya.length+1),
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
			deData: {idBagian: this.datanya.idBagian, bagian: this.datanya.bagian}
		}
	},
    template: 
			`<div>
				<h1 class="w3-left">Masukkan nama bagian</h1>

				<input type="text" 
				class="w3-input w3-margin-bottom"
				:value="deData.bagian" 
				@change="deData.bagian = $event.target.value">

				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				:class="['w3-button w3-left w3-margin-top w3-teal w3-round-large', deData.bagian ? '' : 'w3-hide']" 
				:value="[deData.bagian && mode == 'update' ? 'Update' : 'Tambah']" 
				@click="$emit([deData.bagian && mode == 'update' ? 'update' : 'tambah'], deData)"
				>
				
				<!-- 
				@click="console.log(deData.idBagian+deData.bagian)"
				-->
			</div>`,
	methods: {
		
	}
});