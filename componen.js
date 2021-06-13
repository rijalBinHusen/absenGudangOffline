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
	props: ["datanya", "pilih"],
	template: `
	<select @change="$emit('ganti', $event.target.value)">
		<option value="null">{{'Pilih '+ Object.keys(datanya[0])[0]}}</option>
		<option :selected="pilih == index" v-for="(row, index) in datanya" :value="index">
		{{Object.values(row)[0]}}
		</option>
	</select>
	`
})

Vue.component("tab-karyawan", {
	props: ["datanya", "icon", "field", "bagian", "divisi", "level"],
	methods: {
		coba () {
			//$emit('tes')
			return "adfsdf"
		}
	},
    template: `<div class="w3-center">
		<span class="w3-xlarge">Daftar {{field}} <i :class="icon.plus" @click="$emit('modal')"></i></span>
		<table class="w3-table w3-striped w3-border w3-margin-top">
			
			<tr class="w3-teal">
				<th>Nama</th>
				<th>Divisi</th>
				<th>Bagian</th>
				<th>Level</th>
				<th>Opsi</th
			<tr>
			
			<tr class="w3-hover-light-gray" v-for="(row, index) in datanya">
				<td>{{row.nama}}</td>
				<td>{{Object.values(divisi[row.divisi])[0]}}</td>
				<td>{{Object.values(bagian[row.bagian])[0]}}</td>
				<td>{{Object.values(level[row.level])[0]}}</td>
				<td>
				<a @click="$emit('edit', index)" class="w3-tag w3-teal w3-round">
				Edit <i :class="icon.pencil"></i>
				</a>
				</td>
			</tr>
		</table>
	</div>`
});

Vue.component("tab-absen", {
	props: ["datanya"],
	template: `<div>Absen component</div>`
});

Vue.component("tab-home", {
	props: ["datanya"],
	template: `<div>
	<div style="font-size:120px">{{datanya.hari+" - "+datanya.bulan+" "+datanya.tanggal+", "+datanya.tahun}}</div>
	<div class="w3-jumbo">{{datanya.jam+" : "+datanya.menit}}</div>
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
			nama: this.edit.data.nama,
			divisiBaru: this.edit.data.divisi,
			bagianBaru: this.edit.data.bagian,
			levelBaru: this.edit.data.level
		}
	},
	template: `<div>
		<input type="text" :value="nama" :placeholder="'Masukkan '+edit.holder[0]" @input="nama = $event.target.value">
		
		<pilih @ganti="divisiBaru = $event" :pilih="divisiBaru" :datanya="divisi"></pilih>
		<pilih @ganti="bagianBaru = $event" :pilih="bagianBaru" :datanya="bagian"></pilih>
		<pilih @ganti="levelBaru = $event" :pilih="levelBaru" :datanya="level"></pilih>

		<!--Tombol untuk tambah record-->
		<input v-if="!edit.data.nama" class="w3-button w3-teal w3-round-large" type="submit" 
		:disabled="nama == null || divisiBaru == null || bagianBaru == null || levelBaru == null"
		value="Tambah" 
		@click="$emit('tambah', {
			'nama': nama,
			'divisi': divisiBaru,
			'bagian': bagianBaru,
			'level': levelBaru
		})">

		<!--Tombol untuk update-->
		<input v-if="edit.data.nama" class="w3-button w3-teal w3-round-large" type="submit" 
		value="Update" 
		@click="$emit('update', { 
			'nama': nama,
			'divisi': divisiBaru,
			'bagian': bagianBaru,
			'level': levelBaru
		})">
    </div>`
})