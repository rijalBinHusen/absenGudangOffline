Vue.component("tab-karyawan", {

	props: ["datanya", "icon", "divisi", "bagian", "level"],

    data () {
        return {
            deData : {
                nama: '',
                divisi: '',
                bagian: '',
                level: '',
                idKAryawan: '',
            }
        }
    },

    // methods: {
    //     cariVal (obj, criteria) {
    //         //obj = [ {"id": 1, "item1": "item content item content"} ]
    //         //cireteria = { "equalTo": ["ObjectKey", "key to find"] }
    //         let result = ''
            
    //         if(criteria.equalTo) {
    //           for (x in obj) {
    //             if(obj[x][criteria.equalTo[0]] == criteria.equalTo[1]) { //jika sama
    //               result = obj[x]
    //             }
    //           }
    //         }
    //         return result
    //       }
    //     },
    // computed: {
    //     dataKaryawanLengkap () {
    //       let result = []
    //         for (let x = 0; x <  this.datanya.length; x++) {
    //           let res = this.datanya[x]
    //           res.divisi = cariVal(this.divisi, {"equalTo": ['idDivisi', res.divisi]}).divisi
    //           res.bagian =  cariVal(this.bagian, {"equalTo": ['idBagian', res.bagian]}).bagian
    //           res.level =  cariVal(this.level, {"equalTo": ['idLevel', res.level]})
    //           result.push(res)
    //           console.log(res)
    //         }
    //         return result
    //     }
    // },
    template: `
        <div class="w3-center">
                <p class="w3-xlarge">
                    Daftar karyawan
                    <i :class="icon.plus" 
                    @click="deData = '';
                    deData.nama= '';
                    deData.divisi= '';
                    deData.bagian= '';
                    deData.level= '';
                    deData.idKAryawan= '';
                    $emit('modal', deData)">
                    </i>
                </p>
                
        <table class="w3-table w3-striped w3-border w3-margin-top">
			
			<tr class="w3-teal">
				<th>Id karyawan</th>
				<th>Nama</th>
				<th>Divisi</th>
				<th>Bagian</th>
				<th>Level</th>
				<th>Jam kerja</th>
				<th>Opsi</th>
			<tr>
			
			<tr class="w3-hover-light-gray" v-for="(row, index) in datanya">
				<td>{{row.idKaryawan}}</td>
				<td>{{row.nama}}</td>
				<td>{{row.divisi}}</td>
				<td>{{row.bagian}}</td>
				<td>{{row.level}}</td>
				<td>{{row.level.jamKerja}}</td>
				<td>
                    <a @click="deData = datanya[index]; $emit('modal', deData)" 
                    class="w3-tag w3-teal w3-round">
                        Edit <i :class="icon.pencil"></i>
                    </a>
				</td>
			</tr>
		</table>
	</div>`
});

Vue.component("form-karyawan", {
	props: ["datanya", 'level', 'bagian', 'divisi'],
	data () {
		return { 
            mode: this.datanya.nama ? 'update' : 'new',
            deData : {
                idKAryawan: this.datanya.idKAryawan,
                nama: this.datanya.nama,
                divisi: this.datanya.divisi,
                bagian: this.datanya.bagian,
                level: this.datanya.level,
            }
		}
	},
	methods: {
		// gantiLevel (id) {
		// 	this.levelBaru = id
		// 	this.jamKerja = this.level[id].jamKerja
		// }
	},
	template: `
    <div>
    
        <input size="12" type="text" 
        :value="deData.idKaryawan" 
        placeholder="Masukkan id" 
        @change="deData.idKaryawan = $event.target.value">
		
        <input size="12" type="text" 
        :value="deData.nama" 
        placeholder="Masukkan nama" 
        @change="deData.nama = $event.target.value">
		
        <pilih @ganti="deData.divisi = $event" 
        :pilih="deData.divisi" 
        :keyData="'idDivisi'" 
        :valData="'divisi'" 
        :datanya="divisi">
        </pilih>
		
        <pilih @ganti="deData.bagian = $event" 
        :pilih="deData.bagian" 
        :keyData="'idBagian'"
        :valData="'bagian'"
        :datanya="bagian">
        </pilih>
		
        <pilih @ganti="deData.level = $event" 
        :pilih="deData.level" 
        :keyData="'idLevel'"
        :valData="'level'"
        :datanya="level">
        </pilih>

		<!--Tombol untuk tambah record-->
        <input 
        type="submit" 
        :class="['w3-button w3-left w3-margin-top w3-teal w3-round-large', deData.bagian && deData.nama ? '' : 'w3-hide']" 
        :value="[deData.idKaryawan && deData.nama && mode == 'update' ? 'Update' : 'Tambah']" 
        @click="$emit([deData.nama && mode == 'update' ? 'update' : 'tambah'], deData)"
        >
        
        <!--
        @click="console.log(deData)"
        @click="$emit([deData.level && deData.jamKerja && mode == 'update' ? 'update' : 'tambah'], deData)"
        :value="[deData.idKaryawan && deData.nama && mode == 'update' ? 'Update' : 'Tambah']" 
        -->
		
    </div>`
})