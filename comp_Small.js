Vue.component("pilih", {
	props: ["datanya", "pilih", "keyData", "valData"],
	template: `
	<select @change="$emit('ganti', $event.target.value)">
		<option value="kosong">{{'Pilih '+ valData}}</option>
		<option :selected="row[keyData] == pilih" v-for="row in datanya" :value="row[keyData]">
		{{ row[valData] }}
		</option>
	</select>
	`
})