Vue.component("datatable", {
	props: ["datanya", "heads", "option","keydata", "icon"],
    data () {
        return {
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
    },
    computed: {
        showRow () {

            if(this.searchInput.length < 1) {
            
            this.rowLenght = this.datanya.length //total data length
            this.allPages = Math.ceil(this.rowLenght / this.lengthRow) //total pages

            return this.datanya.slice(this.startRow, this.startRow+Number(this.lengthRow))
            
            } else {
                let result = []
                this.datanya.filter( (val) => {

                    condition = []

                    this.searchKey.map( (key, index) => {

                        if(isNaN(val[key])) { //if the value is string not a number
                            val[key].toLowerCase().includes(this.searchInput[index].toLowerCase()) ? condition.push(true) : condition.push(false)
                        } else {
                            val[key] == this.searchInput[index] ? condition.push(true) : condition.push(false)
                        }
                        
                    })

                    if(!condition.includes(false)) {
                        result.push(val)
                    }
                })

                this.rowLenght = result.length //total data length
                this.allPages = Math.ceil(this.rowLenght / this.lengthRow)  //total pages

                return result.slice(this.startRow, this.startRow+Number(this.lengthRow))
            }
        },
        totalPage () {
            if(this.allPages > 1) {
            return this.startRow == 1 || this.startRow == 0 ? 
            this.allPages > 2 ? [1,2,3] : [1,2] : //pages more than 2 or not
            [this.currentPage-1, this.currentPage, this.currentPage+1 > this.allPages ? 1 : this.currentPage+1]
            }
        }
    },
    methods: {
        toThePage(num) {
            this.startRow = (num-1)*this.lengthRow
            this.currentPage = num
        },
        changeRow (num) {
            this.lengthRow = num
            this.startRow = 0
            this.currentPage = 0
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
                this.nowSort = sortKey
            }
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
                if (this.searchKey.includes(key)) {
                    let position = this.searchKey.indexOf(key) //find the position of key
                    this.searchInput.splice(position, 1) //delete him
                    this.searchInput.splice(position, 0, val) //insert the new key word
                } else {
                    this.searchInput.push(val); 
                    this.searchKey.push(key); 
                }
            } else {
                if (this.searchKey.includes(key)) {
                    let position = this.searchKey.indexOf(key) //find the position of key
                    this.searchInput.splice(position, 1) //delete from searchInput
                    this.searchKey.splice(position, 1) //delete from searchKey
                } else {
                    this.searchInput = []
                    this.searchKey = [] 
                }
            }

            this.startRow = 0; 
            this.currentPage = 0
        }
    },
    template: `
    <div>
    <!-- pagination length & form -->
        <div class="w3-row"> 
            <nav class="w3-left">
            <h3>Show entries</h3>
                <select class="w3-select" @change="changeRow($event.target.value)">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
            </nav>
            
            <nav class="col">
            </nav>
        </div>
    <!-- End of pagination length -->

    <!-- data Table -->

        <table class="w3-table w3-striped w3-border">
            <tr class="w3-teal">
                <th scope="col">No</th>
                <th v-for="head in heads" 
                @click="sortDedata(head, sortAsc); 
                sortAsc = !sortAsc" 
                scope="col">
                    <span style="font-size:20px; font-weight:bolder;" v-if="!sortAsc && nowSort == head">&darr;</span>
                    <span style="font-size:20px; font-weight:bolder;" v-if="sortAsc && nowSort == head">&uarr;</span>
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
                    @change="searchWord($event.target.value, key)">
                </td>
            </tr>
            <!--end ofsearch form-->

            <tr class="w3-border" v-for="(r, index) in showRow">
                <th>{{index+startRow+1}}</th>
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
                    
                    <button 
                    @click="$emit('delete', r[keydata])" 
                    v-if="option.includes('delete')" 
                    class="w3-button w3-pink">
                        Delete
                    </button>

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
                <p>{{startRow+1}} - {{startRow+Number(lengthRow) < rowLenght ? startRow+Number(lengthRow) : rowLenght}} of {{rowLenght}} item</p>
            </span>

            <div class="w3-bar w3-border w3-round w3-right">
                <a href="#" 
                @click="toThePage(currentPage-1)" 
                :class="['w3-bar-item', 'w3-button', currentPage == 0 || currentPage == 1 ? 'w3-hide' : '']"
                >
                    &laquo;
                </a>

                <a href="#" 
                :class="['w3-bar-item', 'w3-button', currentPage == p || p == 1 && currentPage == 0 ? 'w3-teal' : '' ]" 
                v-for="p in totalPage"
                @click="toThePage(p)"
                >
                    {{p}}
                </a>

                <a href="#" 
                :class="['w3-bar-item', 'w3-button', startRow+Number(lengthRow) >= rowLenght ? 'w3-hide' : '']"
                @click="toThePage(currentPage == 0 ? 2 : currentPage+1)"
                >
                    &raquo;
                </a>

            </div>

        </div>

        <!--End of pagination button and info of qty item-->

    </div>
    `
});