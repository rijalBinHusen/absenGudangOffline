Vue.component("tab-bagian", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: {idBagian: '', bagian: ''}
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar bagian
							<i :class="icon.plus" 
							@click="deData = ''; deData.idBagian = 'bag'+(datanya.length+1); deData.bagian = '';$emit('modal', deData)">
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
				<input type="text" 
				:value="deData.bagian" 
				placeholder="Masukkan bagian" 
				@change="deData.bagian = $event.target.value">

				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				:class="['w3-button', 'w3-teal', 'w3-round-large', deData.bagian ? '' : 'w3-disabled']" 
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