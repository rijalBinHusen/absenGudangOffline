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
			id : null,
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
			id : null,
			baru : true
		},
		absen : {
			daftar : daftarabsen,
			absen : {
				"tanggal" : '',
				"idKaryawan" : null,
				"masuk" : '',
				"keluar" : '',
				"keterangan" : '',
				"istirahat" : 1
			},
			id : null,
			baru : true
		},
		gtanggal : '',
		css : {
			navbar : 'w3-bar-item w3-button w3-hover-light-grey w3-padding',
			table : 'w3-bar w3-padding',
			button : 'w3-aqua w3-panel w3-padding-small w3-round w3-border',
			input : 'w3-light-gray w3-panel w3-padding-small w3-round w3-border'
		},
		tableOrigin : {
			absen : [  "tanggal", "id", "nama", "divisi", "bagian", "masuk", "istirahat", "keluar", "total", "normal", "selisih", "keterangan", "action" ],
			inputlevel : ['level', 'jam'],
			karyawan : ['id', 'nama', 'divisi', 'level', 'bagian' ],
			inputdivisi : [],
			inputbagian : [],
			none : [],
			tampilkan : []
		},
		tableTampil : {
		}
	},
	methods : {
		showMenu (el) {
			 this.menu = { [el] : true }
			 this.tableTampil[el] ? '' : this.tableTampil[el] = this.tableOrigin[el]
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
		update2 (tab, key) {
			this[tab].id == key ? this[tab].id = null : this[tab].id = key
		},
		simpan (tab) {
			localStorage.setItem("daftar"+tab, JSON.stringify(this[tab].daftar));
			this[tab].id = null
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
			this[tab].id = null
			this.gtanggal =	 ''
		},
		findObj(key, obj, val) {
			return obj[key][val]
		},
		cekDate (dat) {
			if (new Date(this.gtanggal).getTime()) {
			"" 	
			this[dat][dat].tanggal = new Date(this.gtanggal).getTime();
			} else {
			this.gtanggal = '' 
			alert("Masukkan tanggal yang benar dengan format YYYY-MM-DD (2021-03-13)");		
			}
		},
		cekClock (waktu) {
			let cek = waktu.includes(":") ? waktu.split(":") : ""
			let tes = cek.length == 2 && cek[0].length == 2 && cek[1].length == 2 && cek[0] >= 0 && cek[0] < 24 && cek[1] >= 0 && cek[1] < 60
			if (!tes) { 
				alert("Masukkan jam dengan format yang benar benar HH:MM")
				waktu = ''
			}
		},
		dateFormat(a) {
		  const a001 = a[1] ? new Date(a[1]) : new Date();
		  const a002 = a001.getDate();
		  const a003 = a001.getMonth();
		  const a004 = a001.getFullYear();
		  const a005 = a001.getHours() > 9 ? a001.getHours() : "0"+a001.getHours();
		  const a006 = a001.getMinutes() > 9 ? a001.getMinutes() : "0"+a001.getMinutes();
		  const a007 = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Des"];
 
		  if (a[0] == "time") { return a001.getTime(); } //dapatkan waktu dalam bentuk mili second
		  else if (a[0] == "full") { return a002+" "+a007[a003]+" "+a004+" "+a005+":"+a006; }  //dapatkan waktu penuh yyyy mmm dd hh:mm
		  else if (a[0] == "+1") { return a001.getTime()-25200000+86400000; } // hari selanjutnya pada jam 00:00
		  else if (a[0] == "-1") { return a001.getTime()-25200000-86400000; } // hari sebelumnya pada jam 00:00
		  else if (a[0] == "0") { return a001.getTime()-25200000; } // hari yang tersebut pada jam 00:00
		  else if (a[0] == "tgl") { return a002+" "+a007[a003]+" "+a004; } //tanggal saja
		}
	}
})