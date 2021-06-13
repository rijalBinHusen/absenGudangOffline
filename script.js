function buatObjBaru (tab, obj) {
	if(tab == "divisi" || tab == "bagian") {
		return {[tab]: obj.satu}
	} else if (tab == "level") {
		return {"level": obj.satu, "jamKerja": obj.dua}
	} else if (tab == "karyawan") {
		return {"nama": obj.nama, "divisi": obj.divisi, "bagian": obj.bagian, "level": obj.level}
	}
}

new Vue({
	el: "#utama",
	data: {
	  currentTab: "Divisi",
	  tabs: ['Divisi', 'Bagian', 'Level', 'Karyawan', 'Absen'],
	  modal: false, //buka tutup modal
	  clas : {
		navbar : 'w3-bar-item w3-button w3-hover-light-grey w3-padding'
	  },
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
			  {"nama": "Rijal Bin Husen", "divisi": 0, "bagian": 0, "level":0}
		  ],
		  edit: ""
	  },
	  form: {
		  divisi: { "text": 1, "select": [] },
		  bagian: {"text": 1, "select": []},
		  level: {"text": 2, "select": []},
		  karyawan: { "text": 1, "select": ["divisi", "bagian", "level"] }
	  }
	},
	methods: {
		//untuk menambah record
		tambah (dat) {
			
			//masukkan data jika tidak kosong
			if(dat.satu || dat.divisi && dat.level && dat.bagian) {
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
	  currentTabComponent: function() {
		  if(this.currentTab.toLowerCase() == "divisi" || this.currentTab.toLowerCase() == "bagian") {
			  return "tab-list" 
		  } else {
			return "tab-"+this.currentTab.toLowerCase() 
		}
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
				return {
					"holder": Object.keys(this.deData[this.currentTab.toLowerCase()][0]),
					"data": {"nama": "", "bagian": "kosong", "level": "kosong", "divisi": "kosong"}
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
	  //extract data dari object menjadi array
	  
	}
  });