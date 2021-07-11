//initiate for for local dataabse
let db = new Localbase('db')

new Vue({
	el: "#utama",
	data: {
	  currentTab: "",
	  tabs: ['Divisi', 'Bagian', 'Level', 'Karyawan', 'Absen'],
	  modal: false, //buka tutup modal
	  icon: {
		  plus: "fa fa-plus w3-button w3-round-large w3-teal",
		  pencil: "fa fa-pencil w3-teal"
	  },
	  datanyaForm: '',
	  deData: {
		  divisi:[],
          bagian: [],
          level: [],
          karyawan: [],
		  absen: [],
		  lastId: {}
	  }
	},
	methods: {
		//untuk menambah record
		tambah (dat) {
			//the counter +1
			this.deData.lastId[this.currentTab.toLowerCase()]++
			let id = this.deData.lastId[this.currentTab.toLowerCase()]
			//add to data id
			dat['id_'+this.currentTab.toLowerCase()] = id
			//insert to indexeddb
			db.collection(this.currentTab.toLowerCase()).add(dat)
            //push to front end data
			this.deData[this.currentTab.toLowerCase()].push(dat) //masukkan data
			// update the counter
			this.reWrite('data_absen', {absen: 'lastId'}, {absen: 'lastId', value: this.deData.lastId})

            this.modal = false //close modal
		},
		//buka tutup modal
		modalChange (ev) {
			this.modal = !this.modal
			this.datanyaForm = ev
		},
        //untuk update
		update(ev) {
			//{store:'divisi', id: {id_divisi: this.datanya.id_divisi}, val:{divisi: this.deData}
			db.collection(ev.store).doc(ev.id).update(ev.val)
			
			//close modal
            this.modalChange()
			// this.getDataNew()
        },
		reWrite(store, id, val) {
			//(nameStore, {id: idData}, {key: 'new value'})
			//replace old data with the new one
			db.collection(store).doc(id).set(val)
		},
		async getMasterCounter() {
			//initiate master counter identity
			await db.collection('data_absen').get().then( val => {
				if(val.length < 1) {
					db.collection('data_absen').add({
						absen: 'lastId', value: {
							divisi: 0, 
							bagian:0,
							level: 0,
							karyawan:0,
							absen: 0
						}
					})
					this.deData.lastId = {
						divisi: 0, 
							bagian:0,
							level: 0,
							karyawan:0,
							absen: 0
					}
				} else {		
					this.deData.lastId = val[0].value
				}
			})

		},
		getDivisi() {
			//initiatate divisi data
			db.collection('divisi').get().then(val => {
				if(val.length > 0) {
					this.deData.divisi = val
				}
			})
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
	  }
	}, 
	created () {
		this.getDivisi()
		this.getMasterCounter()
		// this.deData.divisi = crud('read', 'divisi')
		// this.deData.bagian = crud('read', 'bagian')
		// this.deData.level = crud('read', 'level')
		// this.deData.karyawan = crud('read', 'karyawan')
		// this.deData.absen = crud('read', 'absen')
	}
  });