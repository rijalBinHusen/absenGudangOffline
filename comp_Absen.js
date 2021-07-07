Vue.component("tab-absen", {
	props: ["datanya", "icon", "karyawan", "level", "divisi", "bagian"],
	data () {
		return {
			deData: '',
			header: ['tanggal', 'idKaryawan', 'nama', 'divisi', 'bagian', 'masuk', 'istirahat', 'pulang', 'total', 'jamKerja', 'selisih', 'keterangan' ],
			headShow: localStorage.getItem('headShow') ? localStorage.getItem('headShow').split(",") : ['tanggal', 'idKaryawan', 'nama', 'divisi', 'bagian', 'masuk', 'istirahat', 'pulang', 'total', 'jamKerja', 'selisih', 'keterangan' ]
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar absen
							<i :class="icon.plus" 
							@click="newData">
							</i>
							<span v-if="" class="w3-medium w3- w3-dropdown-hover">

							<button class="w3-button w3-teal w3-round">Tampilkan column</button>
							<div 
							class="w3-dropdown-content w3-bar-block w3-border"
							>	
								<label
								class="w3-bar-item w3-button w3-hover-pale-blue"
								v-for="head in header"
								:value="head"
								@click="changeData(head)"
								>
									<input  @click="changeData(head)" :checked="headShow.includes(head)" type="checkbox" :value="head"> {{head}} 
								</label>
							</div>
						</span>
						</li>
					</ul>

					<datatable 
                    :heads="headShow" 
                    :datanya="dataAbsen"
                    :option="['edit', 'delete']"
                    :keydata="'idAbsen'"
                    :icon="icon"
					:id="'table2'"
                    @edit="deData = cariVal(datanya, {'equalTo': ['idAbsen', $event]});
					deData.mode = 'edit';
					$emit('modal', deData)"
					>

				</div>`,
	methods: {
		newData() {
			this.deData = {
			idAbsen: new Date().getTime(),
			tanggal: "" ,
			karyawan: "", 
			masuk: "", 
			istirahat:'', 
			pulang:"", 
			keterangan: ""
		  }
		  this.$emit('modal', this.deData)
		},
		changeData(val) {
			let index = this.header.indexOf(val)
			this.headShow.includes(val) ? this.headShow.splice(index, 1) : this.headShow.splice(index, 0, val)
			localStorage.setItem('headShow', this.headShow)
			console.log(this.headShow)
		}
	},
	computed: {
		dataAbsen () {
			let result = []
			  this.datanya.map(val => {
				
				let karyawan = cariVal(this.karyawan, {"equalTo": ['idKaryawan', val.karyawan]})
				let jamKerja = cariVal(this.level, {"equalTo": ["idLevel", karyawan.level] }).jamKerja
				let total = jamTotal(val.masuk, val.pulang, val.istirahat)
					  
				  result.push({
					idAbsen: val.idAbsen,
					tanggal: val.tanggal,
					idKaryawan: val.karyawan,
					nama: karyawan.nama,
					divisi: cariVal(this.divisi, {"equalTo": ["idDivisi", karyawan.divisi]}).divisi,
					bagian: cariVal(this.bagian, {"equalTo": ["idBagian", karyawan.bagian]}).bagian,
					masuk: val.masuk,
					istirahat: val.istirahat,
					pulang: val.pulang,
					jamKerja: jamKerja,
					keterangan: val.keterangan,
					total: total, 
					selisih: total-jamKerja
				  })
			  })
			  return result
		  }
	}
	
});

Vue.component("form-absen", {
	props: ["datanya", "icon", "karyawan"],
	data () {
		return {
			mode: this.datanya.mode == 'edit' ? 'update' : 'new',
			deData: {
				idAbsen: this.datanya.idAbsen,
				tanggal: this.datanya.tanggal ,
				karyawan: this.datanya.karyawan, 
				masuk: this.datanya.masuk, 
				istirahat:this.datanya.istirahat, 
				pulang:this.datanya.pulang, 
				keterangan: this.datanya.keterangan
			  }
		}
	},
    template: 
			`<div>

				<div class="w3-row w3-section">
					<div class="w3-col" style="width:50px">
						<i class="w3-xxlarge fa fa-calendar"></i>
					</div>
					<div class="w3-rest">
						<input type="text" 
						:value="deData.tanggal"
						placeholder="Masukkan Tanggal"
						class="w3-input w3-margin-bottom w3-border"
						@change="deData.tanggal = $event.target.value"
						>
					</div>
					
					<pilih
					:datanya="karyawan"
					:keyData="'idKaryawan'"
					:valData="'nama'"
					:pilih="deData.karyawan"
					@ganti="deData.karyawan = $event"
					>
					</pilih>
						
					<div class="w3-margin-top w3-col" style="width:50px">
						<i class="w3-xxlarge fa fa-clock-o"></i>
					</div>
					<div class="w3-rest">
						<input type="text" 
						:value="deData.masuk"
						placeholder="Masukkan jam masuk"
						class="w3-input w3-margin-bottom w3-margin-top w3-border"
						maxlength="6"
						@change="deData.masuk = $event.target.value"
						>
					</div>

					<div class="w3-margin-top w3-col" style="width:50px">
						<i class="w3-xxlarge fa fa-clock-o"></i>
					</div>
					<div class="w3-rest">
						<input type="number" 
						:value="deData.istirahat" 
						placeholder="Istirahat"
						class="w3-input w3-margin-bottom w3-margin-top w3-border"
						maxlength="1"
						@change="deData.istirahat = $event.target.value"
						>
					</div>

					<div class="w3-margin-top w3-col" style="width:50px">
						<i class="w3-xxlarge fa fa-clock-o"></i>
					</div>
					<div class="w3-rest">
						<input type="text" 
						:value="deData.pulang" 
						maxlength="6"
						@change="deData.pulang = $event.target.value"
						placeholder="Pulang"
						class="w3-input w3-margin-bottom w3-margin-top w3-border"
						>
					</div>
				
					<div class="w3-margin-top w3-col" style="width:50px">
						<i class="w3-xxlarge fa fa-file-text"></i>
					</div>
					<div class="w3-rest">
						<input type="text" 
						:value="deData.keterangan" 
						@change="deData.keterangan = $event.target.value"
						placeholder="Keterangan"
						class="w3-input w3-margin-bottom w3-margin-top w3-border"
						>
					</div>
				</div>
				
				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				:class="['w3-button w3-left w3-margin-top w3-teal w3-round-large', deData.karyawan  ? '' : 'w3-hide']" 
				:value="[mode == 'update' ? 'Update' : 'Tambah']" 
				@click="$emit([mode == 'update' ? 'update' : 'tambah'], deData)"
				>			
				
			</div>`,
	methods: {
		
	}
});