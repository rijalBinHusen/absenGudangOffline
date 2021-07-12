Vue.component("tab-karyawan", {
	props: ["datanya", "icon", "divisi", "bagian", "level"],
	data () {
		return {
			deData: '',
			divisiSelect: ''
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar karyawan
							<select class="w3-large" @change="divisiSelect = $event.target.value">
								<option value="">Pilih Divisi</option>
								<option v-for="div in divisi" :value="div.id_divisi">
									{{div.divisi}}
								</option>
							</select>
							<i :class="icon.plus" 
							@click="newData">
							</i>
						</li>
					</ul>
					
                    <datatable 
                    :heads="['idKaryawan', 'nama', 'bagian', 'level']" 
                    :datanya="dataKaryawanLengkap"
                    :option="['edit']"
                    :keydata="'id_karyawan'"
                    :icon="icon"
					:id="'table1'"
                    @edit="deData = cariVal(datanya, {'equalTo': ['id_karyawan', $event]});
					deData.mode = 'edit'
					$emit('modal', deData)"
					>
					<!--
                    console.log(Object.values(deData))"
					-->
                    </datatable>
				</div>`,
	methods: {
		newData() {
			this.deData = {
				idKaryawan: '',
				nama: '',
				bagian: '',
				level: '',
				divisi: ''
			}
			this.$emit('modal', this.deData)

			console.log(this.datanya)
		}
			
	},
	computed: {
		dataKaryawanLengkap  () {
			let result = []
			  this.datanya.filter( val => {
				
				let res = true

				if(this.divisiSelect) {
					if(this.divisiSelect == val.divisi) {
						res = true
					} else {
						res = false
					}
				} else (
					res = true
				)

				if(res == true) {
				result.push({
					id_karyawan: val.id_karyawan,
					idKaryawan: val.idKaryawan,
					nama: val.nama,
					bagian:  cariVal(this.bagian, {"equalTo": ['id_bagian', val.bagian]}).bagian,
					level:  cariVal(this.level, {"equalTo": ['id_level', val.level]}).level
					})
				}
			  })
			  console.log(result)
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
                :keyData="'id_divisi'"
                :valData="'divisi'"
                :pilih="deData.divisi"
                @ganti="deData.divisi = $event"
                >
                </pilih>

                <pilih
                :datanya="bagian"
                :keyData="'id_bagian'"
                :valData="'bagian'"
                :pilih="deData.bagian"
                @ganti="deData.bagian = $event"
                >
                </pilih>

                <pilih
                :datanya="level"
                :keyData="'id_level'"
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
				@click="send"
				>
                
                <!--
                -->
			</div>`,
	methods: {
		send() {
			this.mode == 'update' ?
			this.$emit('update', {store:'karyawan', id: {id_karyawan: this.datanya.id_karyawan}, val: this.deData }) :
			this.$emit('tambah', this.deData)
		}
	}
});