new Vue({
	el: "#utama",
	data: {
	  currentTab: "Home",
	  tabs: ['Home', 'Divisi', 'Bagian', 'Level', 'Karyawan', 'Absen'],
	  modal: false, //buka tutup modal
	  clas : {
		navbar : 'w3-bar-item w3-button w3-hover-light-grey w3-padding'
	  },
	  icon: {
		  plus: "fa fa-plus w3-button w3-round-large w3-teal",
		  pencil: "fa fa-pencil w3-teal"
	  },
	  deData: {
		  home: jamSekarang(),
		  divisi: ["Gudang depan", "Gudang sentral"],
		  bagian: ["Admin", "Supervisor"],
		  id: ""
	  },
	  form: {
		  divisi: { text: 1 },
		  bagian: {text: 1}
	  }
	},
	methods: {
		//untuk menambah record
		tambah (dat) {
			this.modal = false
			if(this.currentTab.toLowerCase() == "divisi" || this.currentTab.toLowerCase() == "bagian") {
				if(Object.values(dat)[0]) {
					this.deData[this.currentTab.toLowerCase()].push(Object.values(dat)[0])
				}
			}
		},
		//untuk edit, memasukkan record yang exist dan diupdate
		edit (id) {
			this.modal = true
			this.deData.edit = id
		},
		modalChange () {
			this.modal = !this.modal
			this.deData.edit = ""
		},
		update(dat) {
			this.deData[this.currentTab.toLowerCase()].splice(this.deData.edit, 1)  //hapus
			this.deData[this.currentTab.toLowerCase()].splice(this.deData.edit, 0, dat.satu) //sisipkan
			this.modalChange()
		}
	},
	computed: {
		//Pindah pindah tab
	  currentTabComponent: function() {
		return "tab-" + this.currentTab.toLowerCase();
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