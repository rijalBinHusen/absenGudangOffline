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
		  divisi: [ {"idDivisi": 'div1', "divisi": "Gudang depan"}, {"idDivisi": "div2", "divisi": "Gudang sentral"} ],
          bagian: [ {"idBagian": 'bag1', "bagian": "Supervisor"}, {"idBagian": "bag2", "bagian": "Administration"} ]
	  },
      keyData: {
          divisi: 'idDivisi'
      }
	},
	methods: {
		//untuk menambah record
		tambah (dat) {
			//masukkan data
				this.deData[this.currentTab.toLowerCase()].push(dat)
			//close modal
			this.modal = false
		},
		//buka tutup modal
		modalChange (ev) {
			this.modal = !this.modal
			this.datanyaForm = ev
		},
        //untuk update
		update(dat) {
            let index = cariIndex( 
                                this.deData[this.currentTab.toLowerCase()], 
                                {"equalTo": [this.keyData[this.currentTab.toLowerCase()], 
                                 this.datanyaForm[this.keyData[this.currentTab.toLowerCase()]] 
                                ]} 
                                )
			this.deData[this.currentTab.toLowerCase()].splice(index, 1)  //hapus
			this.deData[this.currentTab.toLowerCase()].splice(index, 0, dat) //sisipkan
			this.modalChange()
		}
	},
	computed: {
	  //Pindah pindah tab
	  currentTabComponent () {
			return "tab-"+this.currentTab.toLowerCase() 
	  },
	  //untuk panggil form input
	  currentForm: function () {
			return "form-"+this.currentTab.toLowerCase()
	  },
	}
  });

function cariIndex (obj, criteria) {
	//obj = [ {"id": 1, "item1": "item content item content"} ]
	//cireteria = { "equalTo": ["ObjectKey", "key to find"] }

	let result = ''
	if(criteria.equalTo) {
		for (x in obj) {
			if(obj[x][criteria.equalTo[0]] == criteria.equalTo[1]) { //jika sama
				result = x
			}
		}
	}
	return result
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