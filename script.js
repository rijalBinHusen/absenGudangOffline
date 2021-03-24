let daftardivisi = []
let daftarbagian = []

if (localStorage.getItem('daftardivisi')) { daftardivisi = JSON.parse(localStorage.getItem('daftardivisi')) }
if (localStorage.getItem('daftarbagian')) { daftarbagian = JSON.parse(localStorage.getItem('daftarbagian')) }


new Vue({
	el : '#utama',
	data : {
		menu : {  },
		divisi : {
			daftar : daftardivisi,
			divisi : '',
			id : 0,
			baru : true			
		},
		bagian : {
			daftar : daftarbagian,
			bagian : '',
			id : 0,
			baru : true
		}
	},
	methods : {
		showMenu (el) {
			 this.menu = { [el] : true }
		},
		tambah (tab) {
			if(this[tab][tab]) {
				this[tab].daftar.push(this[tab][tab])
				this[tab][tab] = ''
				this[tab].baru = true
				this.simpan(tab)
			}
		},
		edit (tab, v) {
			this[tab].id = v
			this[tab].baru = false
			this[tab][tab] = this[tab].daftar[v]
		},
		update (tab) {
			this[tab].daftar[this[tab].id] = this[tab][tab]
			this[tab][tab] = ''
			this[tab].baru = true
			this.simpan(tab)
		},
		simpan (tab) {
			localStorage.setItem("daftar"+tab, JSON.stringify(this[tab].daftar));
		}
	}
})