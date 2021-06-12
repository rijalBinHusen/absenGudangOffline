function buatObjBaru (tab, obj) {
	if(tab == "divisi" || tab == "bagian") {
		return {[tab]: obj.satu}
	} else if (tab == "level") {
		return {"level": obj.satu, "jamKerja": obj.dua}
	}
}

new Vue({
	el: "#utama",
	data: {
	  currentTab: "",
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
			  {"nama": "Rijal Bin Husen", "divisi": 0, "bagian": 0}
		  ],
		  edit: ""
	  },
	  form: {
		  divisi: { text: 1 },
		  bagian: {text: 1},
		  level: {text: 2}
	  }
	},
	methods: {
		//untuk menambah record
		tambah (dat) {
			this.modal = false
			
			//masukkan data jika tidak kosong
			if(dat.satu) {
				this.deData[this.currentTab.toLowerCase()].push( buatObjBaru(this.currentTab.toLowerCase(), dat))
			}
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
			return "tab-table" 
		}
	  },
	  //siapin data yang akan diedit
	  akanEdit: function () {
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
	  }
	}
  });

  function jamSekarang () {
	//waktu baru
	let base = new Date()

	//dapatkan tahun, bulan, tanggal, jam, menit, hari
	let tahun = base.getFullYear()
	let bulan = base.getMonth()
	let tanggal = base.getDate() > 9 ? base.getDate() : "0"+base.getDate()
	let hari = base.getDay()
	let jam = base.getHours() > 9 ? base.getHours() : "0"+base.getHours()
	let menit = base.getMinutes() > 9 ? base.getMinutes() : "0"+base.getMinutes()

	//arr hari, bulan
	let arrHari = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	let arrBulan = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]

	//kembailkan untuk ditampilkan
	return dat = {
		"tahun": tahun,
		"bulan": arrBulan[bulan],
		"tanggal": tanggal,
		"hari": arrHari[hari],
		"jam": jam,
		"menit": menit
	}

}