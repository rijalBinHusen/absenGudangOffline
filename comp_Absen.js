Vue.component("tab-absen", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: ''
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar absen
							<i :class="icon.plus" 
							@click="console.log(datanya)">
							</i>
						</li>
					</ul>
					<!--table class="w3-table w3-striped w3-border w3-margin-top">
						<tr class="w3-teal">
						<th>Tanggal</th>
						<th>Karyawan</th>
						<th>Masuk</th>
						<th>Istirahat</th>
						<th>Pulang</th>
						<th>Keterangan</th>
						<th>Opsi</th>
						<tr>
						
						<tr class="w3-hover-light-gray" v-for="(row, index) in datanya">
							<td>{{row.tanggal}}</td>
							<td>{{row.karyawan}}</td>
							<td>{{row.masuk}}</td>
							<td>{{row.istirahat}}</td>
							<td>{{row.pulang}}</td>
							<td>{{row.keterangan}}</td>
							<td>
								<a @click="deData = datanya[index]; $emit('modal', deData)" 
								class="w3-tag w3-teal w3-round">
									Edit <i :class="icon.pencil"></i>
								</a>
							</td>
						</tr>
					</table-->

					<datatable 
                    :heads="['tanggal', 'idKaryawan', 'nama', 'divisi', 'bagian', 'masuk', 'istirahat', 'pulang', 'total', 'jamKerja', 'selisih', 'keterangan' ]" 
                    :datanya="datanya"
                    :option="['edit', 'delete']"
                    :keydata="'idAbsen'"
                    :icon="icon"
					:id="'table2'"
                    @edit="deData = cariVal(datanya, {'equalTo': ['idKar', $event]});
					deData.mode = 'edit'
					$emit('modal', deData)"
					>

				</div>`,
	methods: {
		newData() {
			
			}
		}
	
});

// Vue.component("form-absen", {
// 	props: ["datanya", "icon"],
// 	data () {
// 		return {
// 			mode: this.datanya.absen ? 'update' : 'new',
// 			deData: {idAbsen: this.datanya.idLevel, level: this.datanya.level, jamKerja: this.datanya.jamKerja}
// 		}
// 	},
//     template: 
// 			`<div>
// 				<h4 class="w3-left">Masukkan nama level </h4>
				
// 				<input type="text" 
// 				:value="deData.level" 
// 				class="w3-input w3-margin-bottom"
// 				@change="deData.level = $event.target.value">

// 				<h4 class="w3-left">Masukkan jam kerja (angka)</h4>

// 				<input type="number" 
// 				:value="deData.jamKerja" 
// 				class="w3-input w3-margin-bottom"
// 				maxlength="2"
// 				@change="deData.jamKerja = $event.target.value">

// 				<!--Tombol untuk tambah record-->
// 				<input 
// 				type="submit" 
// 				:class="['w3-button w3-left w3-margin-top w3-teal w3-round-large', deData.level && deData.jamKerja ? '' : 'w3-hide']" 
// 				:value="[deData.level && deData.jamKerja && mode == 'update' ? 'Update' : 'Tambah']" 
// 				@click="$emit([deData.level && deData.jamKerja && mode == 'update' ? 'update' : 'tambah'], deData)"
// 				>
				
// 			</div>`,
// 	methods: {
		
// 	}
// });