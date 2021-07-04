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
	  datanyaForm: '',
	  deData: {
		  divisi: allData.divisi,
          bagian: allData.bagian,
          level: allData.level,
          karyawan: allData.karyawan
	  }
	},
	methods: {
		//untuk menambah record
		tambah (dat) {
            crud('create', this.currentTab.toLowerCase(), dat) //masukkan data
            this.modal = false //close modal
		},
		//buka tutup modal
		modalChange (ev) {
			this.modal = !this.modal
			this.datanyaForm = ev
		},
        //untuk update
		update(dat) {
            crud('update', this.currentTab.toLowerCase(), dat)
            this.modalChange()
        }
	},
	computed: {
	  //Pindah pindah tab
	  currentTabComponent () {
			return "tab-"+this.currentTab.toLowerCase() 
	  },
	  //untuk panggil form input
	  currentForm () {
			return "form-"+this.currentTab.toLowerCase()
	  },
	  getKaryawan () {
		return dataKaryawanLengkap()
	  }
	}
  });