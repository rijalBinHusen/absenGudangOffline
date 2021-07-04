Vue.component("pilih", {
	props: ["datanya", "pilih", "keyData", "valData"],
	template: `
	<select class="w3-select w3-margin-top w3-margin-bottom " @change="$emit('ganti', $event.target.value)">
		<option value="kosong">{{'Pilih '+ valData}}</option>
		<option :selected="row[keyData] == pilih" v-for="row in datanya" :value="row[keyData]">
		{{ row[valData] }}
		</option>
	</select>
	`
})