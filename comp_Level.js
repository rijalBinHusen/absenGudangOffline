Vue.component("tab-level", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: ''
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar level
							<i :class="icon.plus" 
							@click="newData">
							</i>
						</li>
					</ul>
					<table class="w3-table w3-striped w3-border w3-margin-top">
						<tr class="w3-teal">
						<th>Level</th>
						<th>Total jam kerja</th>
						<th>Opsi</th
						<tr>
						
						<tr class="w3-hover-light-gray" v-for="(row, index) in datanya">
							<td>{{row.level}}</td>
							<td>{{row.jamKerja}}</td>
							<td>
								<a @click="deData = datanya[index]; $emit('modal', deData)" 
								class="w3-tag w3-teal w3-round">
									Edit <i :class="icon.pencil"></i>
								</a>
							</td>
						</tr>
					</table>
				</div>`,
	methods: {
		newData() {
			this.deData = { 
				idLevel: 'lev'+(this.datanya.length+1),
				level: '',
				jamKerja: ''
			}
			this.$emit('modal', this.deData)
		}
	}
});

Vue.component("form-level", {
	props: ["datanya", "icon"],
	data () {
		return {
			mode: this.datanya.level ? 'update' : 'new',
			deData: {idLevel: this.datanya.idLevel, level: this.datanya.level, jamKerja: this.datanya.jamKerja}
		}
	},
    template: 
			`<div>
				<h4 class="w3-left">Masukkan nama level </h4>
				
				<input type="text" 
				:value="deData.level" 
				class="w3-input w3-margin-bottom"
				@change="deData.level = $event.target.value">

				<h4 class="w3-left">Masukkan jam kerja (angka)</h4>

				<input type="number" 
				:value="deData.jamKerja" 
				class="w3-input w3-margin-bottom"
				maxlength="2"
				@change="deData.jamKerja = $event.target.value">

				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				:class="['w3-button w3-left w3-margin-top w3-teal w3-round-large', deData.level && deData.jamKerja ? '' : 'w3-hide']" 
				:value="[deData.level && deData.jamKerja && mode == 'update' ? 'Update' : 'Tambah']" 
				@click="$emit([deData.level && deData.jamKerja && mode == 'update' ? 'update' : 'tambah'], deData)"
				>
				
			</div>`,
	methods: {
		
	}
});