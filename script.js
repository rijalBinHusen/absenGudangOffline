let daftardivisi = []
let daftarbagian = []
let daftarlevel = []
let daftarkaryawan = []
let daftarabsen = []

if (localStorage.getItem('daftardivisi')) { daftardivisi = JSON.parse(localStorage.getItem('daftardivisi')) }
if (localStorage.getItem('daftarbagian')) { daftarbagian = JSON.parse(localStorage.getItem('daftarbagian')) }
if (localStorage.getItem('daftarlevel')) { daftarlevel = JSON.parse(localStorage.getItem('daftarlevel')) }
if (localStorage.getItem('daftarkaryawan')) { daftarkaryawan = JSON.parse(localStorage.getItem('daftarkaryawan')) }
if (localStorage.getItem('daftarabsen')) { daftarabsen = JSON.parse(localStorage.getItem('daftarabsen')) }


var app = new Vue({
	el : '#utama',
	data : {
		menu : {  },
		divisi : {
			daftar : daftardivisi,
			divisi : '',
			id : 0,
			baru : true			
		},
		bagian : {
			daftar : daftarbagian,
			bagian : '',
			id : 0,
			baru : true
		},
		level : {
			daftar : daftarlevel,
			level : {"level" : '', "jamKerja" : ''},
			id : 0,
			baru : true
		},
		karyawan : {
			daftar : daftarkaryawan,
			karyawan : {
				"idKaryawan" : '',
				"namaKaryawan" : '',
				"divisi" : '',
				"level" : '',
				"bagian" : ''
				},
			id : 0,
			baru : true
		},
		absen : {
			daftar : daftarabsen,
			absen : {
				"tanggal" : '',
				"idKaryawan" : null,
				"masuk" : '',
				"keluar" : '',
				"keterangan" : ''
			},
			id : 0,
			baru : true
		},
		gtanggal : ''
	},
	methods : {
		showMenu (el) {
			 this.menu = { [el] : true }
		},
		tambah (tab) {
			if(this[tab][tab]) {
				this[tab].daftar.push(this[tab][tab])
				this.resetModel(tab)
				this.simpan(tab)
			}
		},
		edit (tab, v) {
			this[tab].id = v
			this[tab].baru = false
			this[tab][tab] = this[tab].daftar[v]
		},
		update (tab) {
			this[tab].daftar[this[tab].id] = this[tab][tab]
			this.resetModel(tab)
			this.simpan(tab)
		},
		simpan (tab) {
			localStorage.setItem("daftar"+tab, JSON.stringify(this[tab].daftar));
		},
		isNumber: function(evt) {
		  evt = (evt) ? evt : window.event;
		  var charCode = (evt.which) ? evt.which : evt.keyCode;
		  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
			evt.preventDefault();;
		  } else {
			return true;
		  }
		},
		resetModel (tab) {
			if(tab == 'level') { 
				this[tab][tab] = {"level" : '', "jamKerja" : ''} 
			} else if (tab == 'karyawan') {
				this[tab][tab] = {
				"idKaryawan" : '',
				"namaKaryawan" : '',
				"divisi" : '',
				"level" : '',
				"bagian" : ''
				}
			} else if (tab == 'absen') {
				this[tab][tab] = {
					"tanggal" : '',
					"idKaryawan" : null,
					"masuk" : '',
					"keluar" : '',
					"keterangan" : ''
				}
			}
			else { this[tab][tab] = "" }
			this[tab].baru = true
			this[tab].id = ''
		},
		findObj(key, obj, val) {
			return obj[key][val]
		},
		cekDate (dat) {
			new Date(this.gtanggal).getTime() ? "" : alert("Masukkan tanggal yang benar dengan format YYYY-MM-DD (2021-03-13)")
			this[dat][dat].tanggal = new Date(this.gtanggal).getTime();
		},
		cekClock (waktu) {
			let cek = waktu.includes(":") ? waktu.split(":") : ""
			let tes = cek.length == 2 && cek[0].length == 2 && cek[1].length == 2 && cek[0] >= 0 && cek[0] < 24 && cek[1] >= 0 && cek[1] < 60
			if (!tes) { alert("Masukkan jam dengan format yang benar benar HH:MM") }
		}
	}//, components: { vuejsDatepicker }
})


