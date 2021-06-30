Vue.component("tab-list", {
	props: ["datanya", "icon", "field"],
    template: `<div class="w3-center">
			<ul class="w3-ul">
				<li class="w3-xlarge">Daftar {{field}} <i :class="icon.plus" @click="$emit('modal')"></i></li>
				<li v-for="(row, index) in datanya" class="w3-hover-light-gray">
				{{Object.values(row)[0]}}
				<a @click="$emit('edit', index)" class="w3-right w3-tag w3-teal w3-round">
				Edit <i :class="icon.pencil"></i>
				</a>
				</li>
			</ul>
	</div>`
});

Vue.component("tab-level", {
	props: ["datanya", "icon", "field"],
    template: `<div class="w3-center">
		<span class="w3-xlarge">Daftar {{field}} <i :class="icon.plus" @click="$emit('modal')"></i></span>
		<table class="w3-table w3-striped w3-border w3-margin-top">
			
			<tr class="w3-teal">
			<th>Level</th>
			<th>Total jam kerja</th>
			<th>Opsi</th
			<tr>
			
			<tr class="w3-hover-light-gray" v-for="(row, index) in datanya">
				<td>{{Object.values(row)[0]}}</td>
				<td>{{Object.values(row)[1]}}</td>
				<td>
				<a @click="$emit('edit', index)" class="w3-tag w3-teal w3-round">
				Edit <i :class="icon.pencil"></i>
				</a>
				</td>
			</tr>
		</table>
	</div>`
});

Vue.component("pilih", {
	props: ["datanya", "pilih", "menu"],
	template: `
	<select @change="$emit('ganti', $event.target.value)">
		<option value="kosong">{{'Pilih '+ Object.keys(datanya[0])[0]}}</option>
		<option :selected="pilih == index" v-for="(row, index) in datanya" :value="index">
		{{ menu == 2 ? Object.values(row)[0] +' - '+ Object.values(row)[1] : Object.values(row)[0] }}
		</option>
	</select>
	`
})

Vue.component("daftarData", {
	props: ["datanya"],
	template: `
		<datalist>
			<option v-for="(row, index) in datanya" :value="index+' - '+row.id+' - '+row.nama">
		</datalist>
	`
})

Vue.component("tab-karyawan", {
	props: ["datanya", "icon", "bagian", "divisi", "level"],
    template: `<div class="w3-center">
		<span class="w3-xlarge">Daftar karyawan <i :class="icon.plus" @click="$emit('modal')"></i></span>
		<table class="w3-table w3-striped w3-border w3-margin-top">
			
			<tr class="w3-teal">
				<th>Id karyawan</th>
				<th>Nama</th>
				<th>Divisi</th>
				<th>Bagian</th>
				<th>Level</th>
				<th>Jam kerja</th>
				<th>Opsi</th>
			<tr>
			
			<tr class="w3-hover-light-gray" v-for="(row, index) in datanya">
				<td>{{row.id}}</td>
				<td>{{row.nama}}</td>
				<td>{{row.divisi !== "kosong" ? Object.values(divisi[row.divisi])[0] : "kosong"}}</td>
				<td>{{row.bagian !== "kosong" ? Object.values(bagian[row.bagian])[0] : "kosong"}}</td>
				<td>{{row.level !== "kosong" ? level[row.level].level : "kosong"}}</td>
				<td>{{row.level !== "kosong" ? level[row.level].jamKerja : "kosong"}}</td>
				<td>
				<a @click="$emit('edit', index)" class="w3-tag w3-teal w3-round">
				Edit <i :class="icon.pencil"></i>
				</a>
				</td>
			</tr>
		</table>
	</div>`
});

Vue.component("selectCheckboxes", {
	props: ["datanya", "ind"],
	methods: {
		uniqVal: function (dat, key) {
			let hasil = []

			for (x in dat) {				
				if(!hasil.includes(dat[x][key])) {
					hasil.push(dat[x][key])
				}
			}
			return hasil
		}
 	},
	template: `
	<div class="w3-dropdown-hover">	
    	<span class="w3-teal">{{tulisanBaku(ind)}}</span>
		<div class="w3-dropdown-content w3-border">
			<label v-for="lisCol in uniqVal(datanya, ind)" class="w3-bar-item w3-button w3-hover-pale-blue">
				<input type="checkbox" :value="lisCol"> {{lisCol}}
			</label>
		</div>
  	</div>
	`
})

Vue.component("tab-absen", {
	props: ["datanya", "icon", "bagian", "karyawan", "divisi", "level"],
	data () {
		return {
			tanggal: []
		}
	},
	computed: {
		arrAbsen: function () {
			let hasil = []
			for (x in this.datanya) {
				if(x == 0) {
					hasil.push(Object.keys(this.datanya[x]))
				}
				hasil.push(Object.values(this.datanya[x]))
			}
			return(hasil)
		}
	},
	template: `
	<div class="w3-center">
	<span class="w3-xlarge">Absensi <i :class="icon.plus" @click="$emit('modal')"></i></span>

	<table class="w3-table w3-striped w3-border w3-margin-top">
		<tr class="w3-teal">
			<th @click="console.log(tanggal)"><selectCheckboxes v-model="tanggal" :datanya="datanya" :ind="'tanggal'"></selectCheckboxes></th>
			<th><selectCheckboxes :datanya="datanya" :ind="'idKaryawan'"></selectCheckboxes></th>
			<th><selectCheckboxes :datanya="datanya" :ind="'nama'"></selectCheckboxes></th>
			<th><selectCheckboxes :datanya="datanya" :ind="'divisi'"></selectCheckboxes></th>
			<th><selectCheckboxes :datanya="datanya" :ind="'bagian'"></selectCheckboxes></th>
			<th><selectCheckboxes :datanya="datanya" :ind="'masuk'"></selectCheckboxes></th>
			<th>Istirahat</th>
			<th><selectCheckboxes :datanya="datanya" :ind="'keluar'"></selectCheckboxes></th>
			<th><selectCheckboxes :datanya="datanya" :ind="'total'"></selectCheckboxes></th>
			<th>Normal</th>
			<th>Selisih</th>
			<th><selectCheckboxes :datanya="datanya" :ind="'keterangan'"></selectCheckboxes></th>
			<th>Opsi</th>
		<tr>
		
		<tr class="w3-hover-light-gray" v-for="(row, index) in datanya">
			<td class="absen-tanggal">{{row.tanggal}}</td>
			<td>{{row.idKaryawan}}</td>
			<td>{{row.nama}}</td>
			<td>{{divisi[row.divisi].divisi}}</td>
			<td>{{bagian[row.bagian].bagian}}</td>
			<td>{{row.masuk}}</td>
			<td>{{row.istirahat}}</td>
			<td>{{row.keluar}}</td>
			<td>{{row.total}}</td>
			<td>{{level[ karyawan[Number(row.idKaryawan)].level ].jamKerja}}</td>
			<td>{{row.total - level[ karyawan[Number(row.idKaryawan)].level ].jamKerja - row.istirahat}}</td>
			<td>{{row.keterangan}}</td>
			<td>
			<a @click="$emit('edit', index)" class="w3-tag w3-teal w3-round">
			Edit <i :class="icon.pencil"></i>
			</a>
			</td>
		</tr>
	</table>
</div>`
});

Vue.component("form-universal", {
	props: ["field", "input", "edit"],
	data () {
		return { 
			satu: this.edit.data[0],
			dua: this.edit.data[1],
		}
	},
	template: `<div>
		<input v-if="input.text >=1" type="text" :value="edit.data[0]" :placeholder="'Masukkan '+edit.holder[0]" @input="satu = $event.target.value">
		<input v-if="input.text >=2" type="text" :value="edit.data[1]" :placeholder="'Masukkan '+edit.holder[1]" @input="dua = $event.target.value">

		<!--Tombol untuk tambah record-->
		<input v-if="!edit.data[0]" class="w3-button w3-teal w3-round-large" type="submit" 
		value="Tambah" 
		@click="$emit('tambah', { 
			'satu': satu ,
			'dua': dua,
		})">

		<!--Tombol untuk update-->
		<input v-if="edit.data[0]" class="w3-button w3-teal w3-round-large" type="submit" 
		value="Update" 
		@click="$emit('update', { 
			'satu': satu ,
			'dua': dua,
		})">
    </div>`
})


Vue.component("form-karyawan", {
	props: ["edit", "bagian", "divisi", "level"],
	data () {
		return { 
			id: this.edit.data.id,
			nama: this.edit.data.nama,
			divisiBaru: this.edit.data.divisi,
			bagianBaru: this.edit.data.bagian,
			levelBaru: this.edit.data.level,
			jamKerja: this.edit.data.jamKerja
		}
	},
	methods: {
		gantiLevel (id) {
			this.levelBaru = id
			this.jamKerja = this.level[id].jamKerja
		}
	},
	template: `<div>
		<input size="8" type="text" :value="id" placeholder="Id karyawan" @input="id = $event.target.value">
		<input size="12" type="text" :value="nama" :placeholder="'Masukkan nama'" @input="nama = $event.target.value">
		
		<pilih @ganti="divisiBaru = $event" :pilih="divisiBaru" :datanya="divisi"></pilih>
		<pilih @ganti="bagianBaru = $event" :pilih="bagianBaru" :datanya="bagian"></pilih>
		<pilih @ganti="gantiLevel($event)" :pilih="levelBaru" :datanya="level"></pilih>

		<input size="8" type="text" disabled :value="jamKerja" placeholder="Jam kerja">

		<!--Tombol untuk tambah record-->
		<input v-if="!edit.data.nama" class="w3-button w3-teal w3-round-large" type="submit" 
		value="Tambah" 
		@click="$emit('tambah', {
			'id': id,
			'nama': nama,
			'divisi': divisiBaru,
			'bagian': bagianBaru,
			'level': levelBaru,
		})">

		<!--Tombol untuk update-->
		<input v-if="edit.data.nama" class="w3-button w3-teal w3-round-large" type="submit" 
		value="Update"
		@click="$emit('update', { 
			'id': id,
			'nama': nama,
			'divisi': divisiBaru,
			'bagian': bagianBaru,
			'level': levelBaru,
			'jamKerja': jamKerja
		})">
    </div>`
})

Vue.component("form-absen", {
	props: ["edit", "karyawan", "level"],
	data () {
		return { 
			dataBaru : {
				idKaryawan: this.edit.data.idKaryawan,
				total: this.edit.data.total,
				tanggal: this.edit.data.tanggal,
				masuk: this.edit.data.masuk,
				istirahat: this.edit.data.istirahat,
				keluar: this.edit.data.keluar,
				keterangan: this.edit.data.keterangan,
				nama: this.edit.data.nama,
				divisi: this.edit.data.divisi,
				bagian: this.edit.data.bagian
			}
		}
	},
	methods: {
		cekKaryawan (id) {
			if(this.karyawan[Number(id)] && !Object.values(this.karyawan[Number(id)]).includes("kosong")) {
				this.dataBaru.idKaryawan = this.karyawan[Number(id)].id
				this.dataBaru.nama = this.karyawan[Number(id)].nama
				this.dataBaru.divisi = this.karyawan[Number(id)].divisi
				this.dataBaru.bagian =  this.karyawan[Number(id)].bagian
			} else {
				this.dataBaru.nama = ""
				alert('Karyawan tidak ada didalam daftar, atau karyawan memiliki data yang masih kosong!')
			}
		},
		ubahJam (out) {
			if(!cekJam(this.dataBaru.masuk)) {
				alert("Masukkan jam masuk dengan benar! (20:00)")
				this.dataBaru.masuk = ""
				return false
			} else if (!cekJam(out)) {
				alert("Masukkan jam keluar dengan benar! (20:00)")
				this.dataBaru.keluar = ""
				return false
			} else {
				this.dataBaru.keluar = out
				if (Number(out.split(":")[0]) < Number(this.dataBaru.masuk.split(":")[0])) {
					this.dataBaru.total = (Number(out.split(":")[0])+ 24) - Number(this.dataBaru.masuk.split(":")[0]) - this.dataBaru.istirahat
				} else {
					this.dataBaru.total = Number(out.split(":")[0]) - Number(this.dataBaru.masuk.split(":")[0]) - this.dataBaru.istirahat
				}
			}
		},
		ubahTanggal (date) {
			if(cekDate(date)) {
				this.dataBaru.tanggal = date
			} else {
				this.dataBaru.tanggal = ""
				alert("Masukkan tanggal yang benar! (2021-3-23)")
			}
		}
	},
	template: `<div>
		<input type="text" size="8" :value="dataBaru.tanggal" placeholder="Tanggal" @change="ubahTanggal($event.target.value)">
		<input type="text" :value="dataBaru.nama" @change="cekKaryawan($event.target.value.split('-')[0])" list="daftarKaryawan">
		
		<daftarData id="daftarKaryawan" :datanya="karyawan"></daftarData>
		
		<!--pilih @ganti="dataBaru.idKrayawan = $event" :menu="2" :pilih="dataBaru.idKaryawan" :datanya="karyawan"></pilih-->
		
		<input type="text" size="6" maxlength="5" :value="dataBaru.masuk" placeholder="Masuk" @input="dataBaru.masuk = $event.target.value">
		<input type="text" size="4" maxlength="1" :value="dataBaru.istirahat" placeholder="Istirahat" @input="dataBaru.istirahat = $event.target.value">
		<input type="text" size="6" maxlength="5" :value="dataBaru.keluar" placeholder="Keluar" @change="ubahJam($event.target.value)">
		<input type="text" size="8" :value="dataBaru.keterangan" placeholder="Keterangan" @input="dataBaru.keterangan = $event.target.value">
		
		<!--Tombol untuk tambah record-->
		<input v-if="!edit.data.nama" class="w3-button w3-teal w3-round-large" type="submit" 
		value="Tambah" 
		@click="$emit('tambah', dataBaru)">

		<!--Tombol untuk update-->
		<input v-if="edit.data.nama" class="w3-button w3-teal w3-round-large" type="submit" 
		value="Update"
		@click="$emit('update', dataBaru)">
		</div>
		`
})