Vue.component("tab-karyawan", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: {
				idKaryawan: '',
				nama: '',
				bagian: '',
                level: '',
                divisi: ''
			}
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar karyawan
							<i :class="icon.plus" 
							@click="deData = ''; 
									deData.idKaryawan = ''; 
									deData.nama = ''; 
									deData.bagian = '';
									deData.level = '';
									deData.divisi = '';
									$emit('modal', deData)">
							</i>
						</li>
					</ul>
					<!--table class="w3-table w3-striped w3-border w3-margin-top">
						<tr class="w3-teal">
						<th>Id karyawan</th>
						<th>nama</th>
						<th>divisi</th>
						<th>bagian</th>
						<th>level</th>
						<th>Opsi</th>
						<tr>
						
						<tr class="w3-hover-light-gray" v-for="(row, index) in datanya">
							<td>{{row.idKaryawan}}</td>
							<td>{{row.nama}}</td>
							<td>{{row.divisi}}</td>
							<td>{{row.bagian}}</td>
							<td>{{row.level}}</td>
							<td>
								<a @click="deData = datanya[index]; $emit('modal', deData)" 
								class="w3-tag w3-teal w3-round">
									Edit <i :class="icon.pencil"></i>
								</a>
							</td>
						</tr>
					</table-->
                    <datatable 
                    :heads="['idKaryawan', 'nama', 'divisi', 'bagian', 'level']" 
                    :datanya="datanya"
                    :option="['edit']"
                    :keydata="'idKaryawan'"
                    :icon="icon"
                    @edit="deData = datanya[index]; $emit('modal', deData)"
                    >
                    </datatable>
				</div>`,
	methods: {

	}
});

Vue.component("form-karyawan", {
	props: ["datanya", "icon", "bagian", "level", "divisi"],
	data () {
		return {
			mode: this.datanya.nama ? 'update' : 'new',
			deData: {
                idKaryawan: this.datanya.idKaryawan, 
                nama: this.datanya.nama, 
                divisi: this.datanya.divisi,
                bagian: this.datanya.bagian,
                level: this.datanya.level    
            }
		}
	},
    template: 
			`<div>
				<h4 class="w3-left">Id karyawan </h4>
				
				<input type="text" 
				:value="deData.idKaryawan" 
				class="w3-input w3-margin-bottom"
				@change="deData.idKaryawan = $event.target.value">

				<h4 class="w3-left">Nama karyawan</h4>

				<input type="text" 
				:value="deData.nama" 
				class="w3-input w3-margin-bottom"
				@change="deData.nama = $event.target.value">

                <pilih
                :datanya="divisi"
                :keyData="'idDivisi'"
                :valData="'divisi'"
                :pilih="deData.divisi"
                @ganti="deData.divisi = $event"
                >
                </pilih>

                <pilih
                :datanya="bagian"
                :keyData="'idBagian'"
                :valData="'bagian'"
                :pilih="deData.bagian"
                @ganti="deData.bagian = $event"
                >
                </pilih>

                <pilih
                :datanya="level"
                :keyData="'idLevel'"
                :valData="'level'"
                :pilih="deData.level"
                @ganti="deData.level = $event"
                >
                </pilih>

				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				:class="['w3-button w3-left w3-margin-top w3-teal w3-round-large']" 
				:value="[deData.idKaryawan && deData.nama && mode == 'update' ? 'Update' : 'Tambah']" 
				@click="$emit([deData.nama && mode == 'update' ? 'update' : 'tambah'], deData)"
				>
                
                <!--
                -->
			</div>`,
	methods: {
		
	}
});