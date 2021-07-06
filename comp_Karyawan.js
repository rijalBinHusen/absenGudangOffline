Vue.component("tab-karyawan", {
	props: ["datanya", "icon", "divisi", "bagian", "level"],
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
					
                    <datatable 
                    :heads="['idKaryawan', 'nama', 'divisi', 'bagian', 'level']" 
                    :datanya="dataKaryawanLengkap"
                    :option="['edit']"
                    :keydata="'idKaryawan'"
                    :icon="icon"
                    @edit="deData = cariVal(datanya, {'equalTo': ['idKaryawan', $event]});
					deData.mode = 'edit'
					$emit('modal', deData)"
					>
					<!--
                    console.log(Object.values(deData))"
					-->
                    </datatable>
				</div>`,
	computed: {
		dataKaryawanLengkap  () {
			let result = []
			  this.datanya.map( val => {
				  
				  result.push({
					  idKaryawan: val.idKaryawan,
					  nama: val.nama,
					  divisi: cariVal(this.divisi, {"equalTo": ['idDivisi', val.divisi]}).divisi,
					  bagian:  cariVal(this.bagian, {"equalTo": ['idBagian', val.bagian]}).bagian,
					  level:  cariVal(this.level, {"equalTo": ['idLevel', val.level]}).level
				  })

			  })

			  return  result
		  }
	}
});

// -----------

Vue.component("form-karyawan", {
	props: ["datanya", "icon", "bagian", "level", "divisi"],
	data () {
		return {
			mode: this.datanya.mode == 'edit' ? 'update' : 'new',
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
				<lable class="w3-left">Id karyawan </lable>
				
				<input type="text" 
				:value="deData.idKaryawan" 
				:disabled="mode == 'update'"
				placeholder="Tidak boleh ada sama dengan yang lain"
				:class="['w3-input w3-margin-bottom']"
				@change="deData.idKaryawan = $event.target.value">

				<lable class="w3-left">Nama karyawan</lable>

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
				:class="['w3-button w3-left w3-margin-top w3-teal w3-round-large', this.deData.idKaryawan ? '' : 'w3-hide']" 
				:value="[mode == 'update' ? 'Update' : 'Tambah']" 
				@click="$emit([mode == 'update' ? 'update' : 'tambah'], deData)"
				>
                
                <!--
                -->
			</div>`,
	methods: {
		
	}
});