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

			//update front end data
			let index = cariIndex( this.deData[this.currentTab.toLowerCase()], 
			{'equalTo': ['id_'+this.currentTab.toLowerCase(), 
			this.datanyaForm['id_'+this.currentTab.toLowerCase()] ]}
			)

			this.deData[this.currentTab.toLowerCase()].splice(index, 1)  //hapus
			this.deData[this.currentTab.toLowerCase()].splice(index, 0, Object.assign({}, ev.id, ev.val)) //sisipkan

			//close modal
            this.modalChange()
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
		},
		getBagian() {
			//initiatate bagian data 
			db.collection('bagian').get().then(val => {
				if(val.length > 0) {
					this.deData.bagian = val
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
	}
  });


function cariIndex (obj, criteria) {
	//obj = [ {"id": 1, "item1": "item content item content"} ]
	//cireteria = { "equalTo": ["ObjectKey", "key to find"] }
  
	let result = ''
	if(criteria.equalTo) {
		obj.filter((val, index) => {
			val[criteria.equalTo[0]] == criteria.equalTo[1] ? result = index : ''
		})
	}
	return result
  }