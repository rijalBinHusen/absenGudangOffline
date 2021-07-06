Vue.component("tab-divisi", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: {idDivisi: '', divisi: ''}
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar divisi
							<i :class="icon.plus" 
							@click="newData">
							</i>
						</li>

						<li 
						v-for="(row, index) in datanya" 
						class="w3-hover-light-gray"
						>
							{{row.divisi}}
							<a @click="deData = datanya[index]; $emit('modal', deData)" 
							class="w3-right w3-tag w3-teal w3-round">
								Edit <i :class="icon.pencil"></i>
							</a>
						</li>
					</ul>
				</div>`,
	methods: {
		newData () {
			this.deData = {
				idDivisi: 'div'+(this.datanya.length+1),
				divisi: ''
			}
			this.$emit('modal', this.deData)
		}
	}
});

Vue.component("form-divisi", {
	props: ["datanya", "icon"],
	data () {
		return {
			mode: this.datanya.divisi ? 'update' : 'new',
			deData: {idDivisi: this.datanya.idDivisi, divisi: this.datanya.divisi}
		}
	},
    template: 
			`<div class="">

				<h1 class="w3-left">Masukkan nama divisi</h1>

				<input type="text" 
				:value="deData.divisi" 
				class="w3-input w3-margin-bottom"
				placeholder="Masukkan divisi" 
				@change="deData.divisi = $event.target.value">

				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				:class="['w3-button w3-left w3-margin-top w3-teal w3-round-large', deData.divisi ? '' : 'w3-hide']" 
				:value="[deData.divisi && mode == 'update' ? 'Update' : 'Tambah']" 
				@click="$emit([deData.divisi && mode == 'update' ? 'update' : 'tambah'], deData)"
				>
				
				<!-- 
				@click="console.log(deData.idDivisi+deData.divisi)"
				-->
			</div>`,
	methods: {
		
	}
});