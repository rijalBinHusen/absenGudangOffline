Vue.component("tab-absen", {
	props: ["datanya", "icon", "karyawan", "level", "divisi", "bagian"],
	data () {
		return {
			deData: '',
			header: ['tanggal', 'idKaryawan', 'nama', 'divisi', 'bagian', 'level', 'masuk', 'istirahat', 'pulang', 'total', 'jamKerja', 'selisih', 'keterangan' ],
			headShow: localStorage.getItem('headShow') ? localStorage.getItem('headShow').split(",") : ['tanggal', 'idKaryawan', 'nama', 'divisi', 'bagian', 'level', 'masuk', 'istirahat', 'pulang', 'total', 'jamKerja', 'selisih', 'keterangan' ],
			date: ['2021-5-2']
		}
	},
    template: `<div class="w3-center">
					<div class="">
					Dari tanggal :
					<input @change="changeDate(0, $event.target.value)" class="w3-button w3-border w3-large" type="date">
					Sampai tanggal :
					<input @change="changeDate(1, $event.target.value)" class="w3-button w3-border w3-large" type="date">
					<input @click="$emit('getdata', date)" class="w3-large w3-teal w3-button w3-round" type="submit" value="show">
							<i :class="[icon.plus, 'w3-xlarge']" 
							@click="newData">
							</i>
							<span class="w3-large w3-dropdown-hover">

							<button class="w3-button w3-teal w3-round">Tampilkan column</button>
							<div 
							class="w3-dropdown-content w3-bar-block w3-border"
							>	
								<label
								class="w3-bar-item w3-button w3-hover-pale-blue"
								v-for="head in header""
								
								>
									<input @click="changeData(head)" :checked="headShow.includes(head)" type="checkbox" :value="head"> {{head}} 
								</label>
							</div>
						</span>
					</div>

					<datatable 
                    :heads="headShow" 
                    :datanya="dataAbsen"
                    :option="['edit', 'delete']"
                    :keydata="'id_absen'"
                    :icon="icon"
					:id="'table2'"
                    @edit="deData = cariVal(datanya, {'equalTo': ['id_absen', $event]});
					deData.mode = 'edit';
					$emit('modal', deData);
					"
					>

				</div>`,
	methods: {
		newData() {
			this.deData = {
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
			if(this.headShow.includes(val)) {
				this.headShow.splice(this.headShow.indexOf(val), 1)
			} else {
				let newValue = []
				this.header.map(nowVal => {
					this.headShow.includes(nowVal) || nowVal == val ? newValue.push(nowVal) : false 
				})
				this.headShow = newValue
			}
			localStorage.setItem('headShow', this.headShow)
		},
		changeDate(input, val) {
			!new Date(val).getTime()? this.date[input] = '' : this.date[input] = val
		},
		showData() {
			this.$emit('absen', this.date)
		}
	},
	computed: {
		dataAbsen () {
			let result = []
			  this.datanya.map(val => {
				
				let karyawan = cariVal(this.karyawan, {"equalTo": ['idKaryawan', val.karyawan]})
				let level = cariVal(this.level, {"equalTo": ["id_level", karyawan.level] })
				let total = jamTotal(val.masuk, val.pulang, val.istirahat)
					  
				  result.push({
					id_absen: val.id_absen,
					tanggal: val.tanggal,
					idKaryawan: val.karyawan,
					nama: karyawan.nama,
					divisi: cariVal(this.divisi, {"equalTo": ["id_divisi", karyawan.divisi]}).divisi,
					bagian: cariVal(this.bagian, {"equalTo": ["id_bagian", karyawan.bagian]}).bagian,
					level: level.level,
					masuk: val.masuk,
					istirahat: val.istirahat,
					pulang: val.pulang,
					jamKerja: level.jamKerja,
					keterangan: val.keterangan,
					total: total, 
					selisih: total-level.jamKerja
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
				id_absen: this.datanya.id_absen,
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
						<input type="date" 
						:value="deData.tanggal"
						placeholder="Masukkan Tanggal"
						class="w3-input w3-margin-bottom w3-border"
						@change="changeDate($event.target.value)"
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
						<input type="time" 
						maxlength="5"
						:value="deData.masuk"
						placeholder="Masukkan jam masuk"
						class="w3-input w3-margin-bottom w3-margin-top w3-border"
						@change="clock('masuk', $event.target.value)"
						>
					</div>

					<div class="w3-margin-top w3-col" style="width:50px">
						<i class="w3-xxlarge fa fa-clock-o"></i>
					</div>
					<div class="w3-rest">
						<input type="number" 
						maxlength="1"
						:value="deData.istirahat" 
						placeholder="Istirahat"
						class="w3-input w3-margin-bottom w3-margin-top w3-border"
						@change="deData.istirahat = $event.target.value"
						>
					</div>

					<div class="w3-margin-top w3-col" style="width:50px">
						<i class="w3-xxlarge fa fa-clock-o"></i>
					</div>
					<div class="w3-rest">
						<input type="time" 
						maxlength="5"
						:value="deData.pulang" 
						@change="clock('pulang', $event.target.value)"
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
				@click="send"
				>			
				
			</div>`,
	methods: {
		send() {
			this.mode == 'update' ?
			this.$emit('update', {store:'absen', id: {id_absen: this.datanya.id_absen}, val: this.deData }) :
			// console.log({store:'absen', id: {id_absen: this.datanya.id_absen}, val: this.deData }) :
			this.$emit('tambah', this.deData)
		},
		changeDate(str) {
			check('date', str) ? this.deData.tanggal = str : this.deData.tanggal = 'mm/dd/yyyy'
		},
		clock(input, str) {
			check('clock', str) ? this.deData[input] = str : this.deData[input] = ''
		}
	}
});