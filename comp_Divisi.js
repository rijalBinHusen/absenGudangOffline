Vue.component("tab-divisi", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: {id: '', divisi: ''}
		}
	},
    template: `<div class="w3-center">
					<ul class="w3-ul">
						<li class="w3-xlarge">
							Daftar divisi
							<i :class="icon.plus" 
							@click="$emit('modal')">
							</i>
						</li>

						<li 
						v-for="(row, index) in datanya" 
						class="w3-hover-light-gray"
						>
							{{Object.values(row)[0]}}
							<a @click="$emit('edit', index)" 
							class="w3-right w3-tag w3-teal w3-round">
								Edit <i :class="icon.pencil"></i>
							</a>
						</li>
					</ul>
				</div>`,
	methods: {

	}
});

// Vue.component("form-divisi", {
// 	props: [""],
// 	template: 
// 		`<div>
// 			<input type="text" 
// 			value="divisi" 
// 			placeholder="Masukkan divisi" 
// 			@change="">

// 			<!--Tombol untuk tambah record-->
// 			<input 
// 			type="submit" 
// 			class="w3-button w3-teal w3-round-large" 
// 			value="Tambah" 
// 			@click="tambah">

// 			<!--Tombol untuk update-->
// 			<input 
// 			type="submit" 
// 			v-if=" "
// 			class="w3-button w3-teal w3-round-large" 
// 			value="Update" 
// 			@click="update">
// 		</div>`,
// 	methods: {

// 	}
// })

Vue.component("form-divisi", {
	props: ["datanya", "icon"],
	data () {
		return {
			deData: {id: '', divisi: ''}
		}
	},
    template: `<div>
				<input type="text" 
				value="divisi" 
				placeholder="Masukkan divisi" 
				@change="">
	
				<!--Tombol untuk tambah record-->
				<input 
				type="submit" 
				class="w3-button w3-teal w3-round-large" 
				value="Tambah" 
				@click="tambah">
	
				<!--Tombol untuk update-->
				<input 
				type="submit" 
				v-if=" "
				class="w3-button w3-teal w3-round-large" 
				value="Update" 
				@click="update">
			</div>`,
	methods: {

	}
});