function buatObjBaru (tab, obj) {
	if(tab == "divisi" || tab == "bagian") {
		return {[tab]: obj.satu}
	} else if (tab == "level") {
		return {"level": obj.satu, "jamKerja": obj.dua}
	} else if (tab == "karyawan" || tab == "absen") {
		return obj
	} 
}

function ObjKaryawanAbsen(obj) {
	let kosong = {}
	for (i=0; i < obj.length; i++) {
		kosong[obj[i].id] = obj[i]
	}
	return kosong
	
}

function cekJam (jam) {
	return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(jam) //return true or false
}

function cekDate(date) {
	return Boolean(new Date(date).getTime())
}

function cari (obj, criteria) {
	//obj = [ {"id": 1, "item1": "item content item content"} ]
	//cireteria = { "equalTo": ["ObjectKey", "key to find"] }

	let result = []
	if(criteria.equalTo) {
		for (x in obj) {
			if(obj[x][equalTo[0]] == equalTo[1]) { //jika sama
				result.push(obj.x)
			}
		}
	}
	return result
}

function tulisanBaku (str) {
	let hasil;

	let res = str.replace(/([A-Z])/g,' $1');//sisipkan sapasi sebelum huruf besar ditenghah
	hasil = res[0].toUpperCase()
	hasil += res.slice(1)

	return hasil
}

new Vue({
	el: "#utama",
	data: {
	  currentTab: "Divisi",
	  tabs: ['Divisi', 'Bagian', 'Level', 'Karyawan', 'Absen'],
	  modal: false, //buka tutup modal
	  icon: {
		  plus: "fa fa-plus w3-button w3-round-large w3-teal",
		  pencil: "fa fa-pencil w3-teal"
	  },
	  deData: {
		  divisi: [
			  {"divisi": "Gudang depan"}, {"divisi": "Gudang sentral"}
			],
		  bagian: [
			  {"bagian": "Admin"}, { "bagian": "Supervisor"}
			],
		  level: [
			  {"level": "kontrak", "jamKerja": 8}
		  ],
		  karyawan: [
			  {"id": 12039, "nama": "Rijal Bin Husen", "divisi": 0, "bagian": 0, "level":0}
		  ],
		  absen: [
			  {
			  "tanggal": "2021-12-19", 
			  "masuk": "22:23", 
			  "istirahat": 1, 
			  "keluar": "07:53", 
			  "idKaryawan": 12039, 
			   "total": 8, 
			   "keterangan": "tes",
			   "nama": "Rijal bin Husen",
			   "divisi": 0,
			   "bagian": 0
			},
			{
				"tanggal": "2021-12-19", 
				"masuk": "22:23", 
				"istirahat": 1, 
				"keluar": "07:53", 
				"idKaryawan": 12039, 
				 "total": 8, 
				 "keterangan": "tes",
				 "nama": "Rijal bin Husen",
				 "divisi": 0,
				 "bagian": 0
			  },
			  {
				"tanggal": "2021-12-19", 
				"masuk": "22:23", 
				"istirahat": 1, 
				"keluar": "07:53", 
				"idKaryawan": 12039, 
				 "total": 8, 
				 "keterangan": "tes",
				 "nama": "Rijal bin Husen",
				 "divisi": 0,
				 "bagian": 0
			  },
			  {
				"tanggal": "2021-12-19", 
				"masuk": "22:23", 
				"istirahat": 1, 
				"keluar": "07:53", 
				"idKaryawan": 12039, 
				 "total": 8, 
				 "keterangan": "tes",
				 "nama": "Rijal bin Husen",
				 "divisi": 0,
				 "bagian": 0
			  },
			  {
				"tanggal": "2021-12-19", 
				"masuk": "22:23", 
				"istirahat": 1, 
				"keluar": "07:53", 
				"idKaryawan": 12039, 
				 "total": 8, 
				 "keterangan": "tes",
				 "nama": "Rijal bin Husen",
				 "divisi": 0,
				 "bagian": 0
			  },
			  {
				"tanggal": "2021-12-19", 
				"masuk": "22:23", 
				"istirahat": 1, 
				"keluar": "07:53", 
				"idKaryawan": 12039, 
				 "total": 8, 
				 "keterangan": "tes",
				 "nama": "Rijal bin Husen",
				 "divisi": 0,
				 "bagian": 0
			  }
		  ],
		  edit: ""
	  }
	},
	methods: {
		//untuk menambah record
		tambah (dat) {
			
			//masukkan data jika tidak kosong
			if(dat.satu || dat.divisi && dat.level && dat.bagian || dat.nama) {
				this.deData[this.currentTab.toLowerCase()].push( buatObjBaru(this.currentTab.toLowerCase(), dat))
			}
			
			this.modal = false
		},
		//untuk edit, memasukkan record yang exist dan diupdate
		edit (id) {
			this.modal = true
			this.deData.edit = id
		},
		//buka tutup modal
		modalChange () {
			this.modal = !this.modal
			this.deData.edit = ""
		},
		//update record
		update(dat) {
			this.deData[this.currentTab.toLowerCase()].splice(this.deData.edit, 1)  //hapus
			this.deData[this.currentTab.toLowerCase()].splice(this.deData.edit, 0, buatObjBaru(this.currentTab.toLowerCase(), dat)) //sisipkan
			this.modalChange()
		}
	},
	computed: {
	  //Pindah pindah tab
	  currentTabComponent () {
			return "tab-"+this.currentTab.toLowerCase() 
	  },
	  currentFormComponent () {
			return "form-"+this.currentTab.toLowerCase() 
	  },
	  //siapin data yang akan diedit
	  akanEdit: function () {
	  if(this.currentTab.toLowerCase() == "bagian" || this.currentTab.toLowerCase() == "level" || this.currentTab.toLowerCase() == "divisi" )
		  { 
			if (this.deData.edit !== "") {
				return { 
					"holder": Object.keys(this.deData[this.currentTab.toLowerCase()][this.deData.edit]),
					"data": Object.values(this.deData[this.currentTab.toLowerCase()][this.deData.edit])
				}
			} else {
				return {
					"holder": Object.keys(this.deData[this.currentTab.toLowerCase()][0]),	
					"data": ["", "", "", ""]
				}
			}
		} else {
			if(this.deData.edit !== "") {
				return {
					"holder": Object.keys(this.deData[this.currentTab.toLowerCase()][this.deData.edit]),
					"data": this.deData[this.currentTab.toLowerCase()][this.deData.edit]
					
				}
			} else {
				//data karyawan
				return {
					"holder": Object.keys(this.deData[this.currentTab.toLowerCase()][0]),
					"data": {
						"id": "", 
						"nama": "", 
						"bagian": "kosong", 
						"level": "kosong", 
						"divisi": "kosong", 
						"jamKerja": "",
						"tanggal": "", 
			  			"masuk": "", 
			  			"istirahat": "", 
			  			"keluar": "", 
			  			"idKaryawan": "", 
			   			"total": "", 
			   			"keterangan": "",
			   			"nama": "",
			   			"normal": "",
			   			"selisih":""
					}
				}
			}
		}
	  },
	  //untuk panggil form input
	  currentForm: function () {
		if(this.currentTab.toLowerCase() == "bagian" || this.currentTab.toLowerCase() == "level" || this.currentTab.toLowerCase() == "divisi" ) {
			return "form-universal"
		} else {
			return "form-"+this.currentTab.toLowerCase()
		}
	  },
	  //siapkkan absen untuk ditampilkan
	  karyawanSiap: function() {
		return ObjKaryawanAbsen(this.deData.karyawan)
	  }
	}
  });