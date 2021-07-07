Vue.component("datatable", {
	props: ["datanya", "heads", "option","keydata", "icon", "id"],
    data () {
        return {
            deData: localStorage.getItem(this.id) ? JSON.parse(localStorage.getItem(this.id)) : {
                startRow: 0,
                lengthRow: 5,
                nowSort: null,
                currentPage: 0,
                searchInput: [],
                searchKey: [],
                rowLenght: 0,
                allPages: 0,
                sortAsc: true
            }
        }
    },
    computed: {
        showRow () {

            if(this.deData.searchInput.length < 1) {
            
            this.deData.rowLenght = this.datanya.length //total data length
            this.deData.allPages = Math.ceil(this.deData.rowLenght / this.deData.lengthRow) //total pages

            return this.datanya.slice(this.deData.startRow, this.deData.startRow+Number(this.deData.lengthRow))
            
            } else {
                let result = []
                this.datanya.filter( (val) => {

                    condition = []

                    this.deData.searchKey.map( (key, index) => {

                        if(isNaN(val[key])) { //if the value is string not a number
                            val[key].toLowerCase().includes(this.deData.searchInput[index].toLowerCase()) ? condition.push(true) : condition.push(false)
                        } else {
                            val[key] == this.deData.searchInput[index] ? condition.push(true) : condition.push(false)
                        }
                        
                    })

                    if(!condition.includes(false)) {
                        result.push(val)
                    }
                })

                this.deData.rowLenght = result.length //total data length
                this.deData.allPages = Math.ceil(this.deData.rowLenght / this.deData.lengthRow)  //total pages

                return result.slice(this.deData.startRow, this.deData.startRow+Number(this.deData.lengthRow))
            }
        },
        totalPage () {
            if(this.deData.allPages > 1) {
            return this.deData.startRow == 1 || this.deData.startRow == 0 ? 
            this.deData.allPages > 2 ? [1,2,3] : [1,2] : //pages more than 2 or not
            [this.deData.currentPage-1, this.deData.currentPage, this.deData.currentPage+1 > this.deData.allPages ? 1 : this.deData.currentPage+1]
            }
        }
    },
    methods: {
        toThePage(num) {
            this.deData.startRow = (num-1)*this.deData.lengthRow
            this.deData.currentPage = num
            this.saveData()
        },
        changeRow (num) {
            this.deData.lengthRow = num
            this.deData.startRow = 0
            this.deData.currentPage = 0
            this.saveData()
        }, sortDedata (sortKey, sortAsc) {
            if (sortKey) {
                this.datanya.sort(function (a, b) {
                    let x = a[sortKey]
                    let y = b[sortKey]
                    if(isNaN(a[sortKey])) {
                        x = a[sortKey].toLowerCase()
                        y = b[sortKey].toLowerCase()
                    } 
                    if(sortAsc) {
                        if (x < y) { return -1 }
                        if (x > y) { return 1 }
                    } else {
                        if (x > y) { return -1 }
                        if (x < y) { return 1 }
                    }
                    return 0
                })
                this.deData.nowSort = sortKey
                this.searchWord ('', sortKey)
            }
            this.saveData()
        },
        tulisanBaku (str) { //to make inClock become In Clock
            let hasil;
        
            let res = str.replace(/([A-Z])/g,' $1'); //insert space before middle capital letter
            hasil = res[0].toUpperCase()
            hasil += res.slice(1)
        
            return hasil
        },
        searchWord (val, key) {
            if (val) {
                if (this.deData.searchKey.includes(key)) {
                    let position = this.deData.searchKey.indexOf(key) //find the position of key
                    this.deData.searchInput.splice(position, 1) //delete him
                    this.deData.searchInput.splice(position, 0, val) //insert the new key word
                } else {
                    this.deData.searchInput.push(val); 
                    this.deData.searchKey.push(key); 
                }
            } else {
                if (this.deData.searchKey.includes(key)) {
                    let position = this.deData.searchKey.indexOf(key) //find the position of key
                    this.deData.searchInput.splice(position, 1) //delete from deData.searchInput
                    this.deData.searchKey.splice(position, 1) //delete from deData.searchKey
                } else {
                    this.deData.searchInput = []
                    this.deData.searchKey = [] 
                }
            }

            this.deData.startRow = 0; 
            this.deData.currentPage = 0
            this.saveData()
        },
        saveData() {
            localStorage.setItem(this.id, JSON.stringify(this.deData))
        }
    },
    template: `
    <div>
    <!-- pagination length & form -->
        <div class="w3-row"> 
            <nav class="w3-left">
            <h3>Show entries</h3>
                <select class="w3-select" @change="changeRow($event.target.value)">
                    <option :selected="deData.lengthRow == 5" value="5">5</option>
                    <option :selected="deData.lengthRow == 10" value="10">10</option>
                    <option :selected="deData.lengthRow == 20" value="20">20</option>
                    <option :selected="deData.lengthRow == 30" value="30">30</option>
                    <option :selected="deData.lengthRow == 40" value="40">40</option>
                    <option :selected="deData.lengthRow == 50" value="50">50</option>
                </select>
            </nav>
        </div>
    <!-- End of pagination length -->

    <!-- data Table -->

        <table class="w3-table w3-striped w3-border">
            <tr class="w3-teal">
                <th scope="col">No</th>
                <th v-for="head in heads" 
                @click="sortDedata(head, deData.sortAsc); 
                deData.sortAsc = !deData.sortAsc" 
                scope="col">
                    <span style="font-size:20px; font-weight:bolder;" v-if="!deData.sortAsc && deData.nowSort == head">&darr;</span>
                    <span style="font-size:20px; font-weight:bolder;" v-if="deData.sortAsc && deData.nowSort == head">&uarr;</span>
                    {{tulisanBaku(head)}}
                </th>
                <th v-if="option.length > 0" scope="col">Option</th>
            </tr>

            <!--search form-->
            <tr>
                <td></td>
                <td v-for="key in heads">
                    <input type="text" 
                    style="max-width:80px;" 
                    placeholder="Search" 
                    :value="[deData.searchKey.includes(key) ? deData.searchInput[deData.searchKey.indexOf(key)] : '']"
                    @change="searchWord($event.target.value, key)">
                </td>
            </tr>
            <!--end ofsearch form-->

            <tr class="w3-border" v-for="(r, index) in showRow">
                <th>{{index+deData.startRow+1}}</th>
                <td v-for="key in heads">{{r[key]}}</td>
                
                <td v-if="option.length > 0">
                    <!--button 
                    @click="$emit('edit', r[keydata])" 
                    v-if="option.includes('edit')" 
                    class="w3-teal w3-tag">
                        Edit
                    </button-->

                    <a @click="$emit('edit', r[keydata])" 
                    v-if="option.includes('edit')" 
                    class="w3-tag w3-teal w3-round">
                        Edit <i :class="icon.pencil"></i>
                    </a>
                    
                    <a 
                    @click="$emit('delete', r[keydata])" 
                    v-if="option.includes('delete')" 
                    class="w3-tag w3-pink w3-round">
                        Delete <i class="fa fa-trash-o"></i>
                    </a>

                    <button 
                    @click="$emit('detail', r[keydata])" 
                    v-if="option.includes('detail')" 
                    class="w3-button w3-pale-blue">
                        Detail
                    </button>
                </td>
            </tr>
        </table>
        
        <!--End of data Table -->

        
        <!--Pagination button and info of qty item-->
        
        <div class="w3-margin-top">
            <span class="w3-left">
                <p>{{deData.startRow+1}} - {{deData.startRow+Number(deData.lengthRow) < deData.rowLenght ? deData.startRow+Number(deData.lengthRow) : deData.rowLenght}} of {{deData.rowLenght}} item</p>
            </span>

            <div class="w3-bar w3-border w3-round w3-right">
                <a href="#" 
                @click="toThePage(deData.currentPage-1)" 
                :class="['w3-bar-item', 'w3-button', deData.currentPage == 0 || deData.currentPage == 1 ? 'w3-hide' : '']"
                >
                    &laquo;
                </a>

                <a href="#" 
                :class="['w3-bar-item', 'w3-button', deData.currentPage == p || p == 1 && deData.currentPage == 0 ? 'w3-teal' : '' ]" 
                v-for="p in totalPage"
                @click="toThePage(p)"
                >
                    {{p}}
                </a>

                <a href="#" 
                :class="['w3-bar-item', 'w3-button', deData.startRow+Number(deData.lengthRow) >= deData.rowLenght ? 'w3-hide' : '']"
                @click="toThePage(deData.currentPage == 0 ? 2 : deData.currentPage+1)"
                >
                    &raquo;
                </a>

            </div>

        </div>

        <!--End of pagination button and info of qty item-->

    </div>
    `
});