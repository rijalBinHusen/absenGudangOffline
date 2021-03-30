let daftar = {
	divisi : [],
	bagian : [],
	level : [],
	karyawan : [],
	absen : [],
	tableOrigin : {
		absen : [  "tanggal", "id", "nama", "divisi", "bagian", "masuk", "istirahat", "keluar", "total", "normal", "selisih", "keterangan", "action" ],
		level : ['level', 'jam'],
		karyawan : ['id', 'nama', 'divisi', 'level', 'bagian' ]
	}
}
 
if (localStorage.getItem('divisi')) { daftar.divisi = JSON.parse(localStorage.getItem('divisi')) }
if (localStorage.getItem('bagian')) { daftar.bagian = JSON.parse(localStorage.getItem('bagian')) }
if (localStorage.getItem('level')) { daftar.level = JSON.parse(localStorage.getItem('level')) }
if (localStorage.getItem('karyawan')) { daftar.karyawan = JSON.parse(localStorage.getItem('karyawan')) }
if (localStorage.getItem('absen')) { daftar.absen = JSON.parse(localStorage.getItem('absen')) }
 
class baru {
	constructor (table) {
		this.daftar = daftar[table]
		this[table] = []
		this.id = null
		this.baru = true
		this.tableOrgin = daftar.tableOrigin[table]
		this.tableTampil = []
	}
}
 
var app = new Vue({
	el : '#utama',
	data : {
		menu : {  },
		divisi : new baru('divisi'),
		bagian : new baru('bagian'),
		level : new baru('level'),
		karyawan : new baru('karyawan'),
		absen : new baru('absen'),
		gtanggal : '',
		model : {
			1 : null,
			2 : null,
			3 : null,
			4 : null,
			5 : null,
			6 : null,
			7 : null,
			8 : null,
			9 : null
		},
		css : {
			navbar : 'w3-bar-item w3-button w3-hover-light-grey w3-padding',
			table : 'w3-table w3-striped',
			button : 'w3-aqua w3-padding-small w3-round w3-border w3-margin-right',
			input : 'w3-light-gray w3-padding-small w3-round w3-border'
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
			absen : null
		}
	},
	methods : {
		showMenu (el) {
			 this.menu = { [el] : true }
			 this.tableTampil[el] ? '' : this.tableTampil[el] = this.tableOrigin[el]
			 this.resetModel(el)
		},
		tambah (tab, jml) {
			let datanya = [this.model[1], this.model[2], this.model[3], this.model[4], this.model[5], this.model[6], this.model[7], this.model[8], this.model[9] ]
			let condition = 0;
 
			for (let i = 1; i <= jml; i ++) {
				this.model[i] !== null ? condition += 0 : condition +=1
			}
 
			if(!condition) {
				datanya.length = jml
				this[tab].daftar.push(datanya)
				this.resetModel(tab)
				this.simpan(tab)
			}
		},
		edit (tab, v) {
			this[tab].id = v
			this[tab].baru = false
			this.model[1] = this[tab].daftar[v][0]
		},
		update (tab, val) {
			this[tab].daftar[this[tab].id][0] = this.model[val]
			this.resetModel(tab)
			this.simpan(tab)
		},
		update2 (tab, key) {
			this[tab].id == key ? this[tab].id = null : this[tab].id = key
		},
		simpan (tab) {
			localStorage.setItem(tab, JSON.stringify(this[tab].daftar));
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
			for (let i = 1; i <= 10; i++) {
				this.model[i] = null
			}
			this[tab].baru = true
		},
		findObj(key, obj, val) {
			return obj[key][val]
		},
		cekDate (mod) {
			if (!new Date(this.model[mod]).getTime()) {
			this.model[mod] = null
			alert("Masukkan tanggal yang benar dengan format YYYY-MM-DD (2021-03-13)");		
			}
		},
		cekClock (w) {
			let cek = this.model[w].includes(":") ? this.model[w].split(":") : ""
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
		},
		absen1 : function ($event) {
			this.model[2] = $event.target.value;
			this.model[3] = this.karyawan.daftar[this.model[2]][2]
			this.model[4] = this.karyawan.daftar[this.model[2]][3]
		}
	}
})