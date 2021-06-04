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
		  plus: "fa fa-plus w3-button"
	  },
	  deData: {
		  home: null,
		  divisi: []
	  },
	  form: {
		  divisi: {
			  text: 1
		  }
	  }
	},
	methods: {
		tambah (dat) {
			this.modal = false
			if(this.currentTab.toLowerCase() == "divisi") {
				this.deData.divisi.push(Object.values(dat)[0])
			}
		}
	},
	computed: {
	  currentTabComponent: function() {
		return "tab-" + this.currentTab.toLowerCase();
	  }
	}
  });