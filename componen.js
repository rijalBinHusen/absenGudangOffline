Vue.component("tab-divisi", {
	props: ["datanya", "icon"],
    template: `<div>
		<div>
			<ul class="w3-ul w3-border w3-striped">
				<li class="w3-xlarge">Daftar divisi <i :class="icon.plus" @click="$emit('modal')"></i> </li>
				<li v-for="row in datanya">{{row}}</li>
			</ul>
		</div>
	</div>`
});

Vue.component("tab-bagian", {
	template: "<div>Bagian component</div>"
});

Vue.component("tab-level", {
	props: ["datanya"],
	template: `<div>Level component</div>`
});

Vue.component("tab-karyawan", {
	props: ["datanya"],
	template: `<div>Karyawan component</div>`
});

Vue.component("tab-absen", {
	props: ["datanya"],
	template: `<div>Absen component</div>`
});

Vue.component("tab-home", {
	template: `<div>Home component</div>`
});

Vue.component("form-content", {
	props: ["field", "text"],
	data () {
		return { 
			satu: "",
			dua: "",
			tiga: "",
			empat: ""
		}
	},
	template: `<div>
		<input v-if="text >=1" type="text" @input="satu = $event.target.value">
		<input v-if="text >=2" type="text" @input="dua = $event.target.value">
		<input v-if="text >=3" type="text" @input="tiga = $event.target.value">
		<input v-if="text >=4" type="text" @input="empat = $event.target.value">
		<input type="submit" 
		value="Kirim" 
		@click="$emit('tambah', { 
			'satu': satu ,
			'dua': dua,
			'tiga': tiga,
			'empat': empat
		})">
    </div>`
})

