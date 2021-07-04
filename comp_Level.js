Vue.component("tab-level", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: {
				idLevel: '',
				level: '',
				jamKerja: ''
			}
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar level
							<i :class="icon.plus" 
							@click="deData = ''; 
									deData.idLevel = 'lev'+(datanya.length+1); 
									deData.level = ''; 
									deData.jamKerja = '';
									$emit('modal', deData)">
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
				<input type="text" 
				:value="deData.level" 
				placeholder="Masukkan level" 
				@change="deData.level = $event.target.value">

				<input type="number" 
				:value="deData.jamKerja" 
				placeholder="Masukkan kerja" 
				@change="deData.jamKerja = $event.target.value">

				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				:class="['w3-button', 'w3-teal', 'w3-round-large', deData.level && deData.jamKerja ? '' : 'w3-disabled']" 
				:value="[deData.level && deData.jamKerja && mode == 'update' ? 'Update' : 'Tambah']" 
				@click="$emit([deData.level && deData.jamKerja && mode == 'update' ? 'update' : 'tambah'], deData)"
				>
				
				<!-- 
				@click="console.log(deData.idLevel+deData.level)"
				-->
			</div>`,
	methods: {
		
	}
});