
// data for app, you can get from backend or manually here

const allData = 
{ 
  divisi: [ {"idDivisi": 'div1', "divisi": "Gudang depan"}, {"idDivisi": "div2", "divisi": "Gudang sentral"} ],
  bagian: [ {"idBagian": 'bag1', "bagian": "Supervisor"}, {"idBagian": "bag2", "bagian": "Administration"} ],
  level: [ {"id_evel": "1" ,"level": "kontrak", "jamKerja": 7} ],
  karyawan: [ 
    {"id_karyawan": "3", "idKaryawan": 12041, "nama": "KHOIRUL", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "4", "idKaryawan": 12042, "nama": "ARIMBI AYUNINGTYAS", "divisi": "2", "bagian": "2", "level": "1"},
    {"id_karyawan": "5", "idKaryawan": 12043, "nama": "M HUDA", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "6", "idKaryawan": 12044, "nama": "DENY ARDIANSYAH", "divisi": "2", "bagian": "2", "level": "1"},
    {"id_karyawan": "8", "idKaryawan": 12045, "nama": "DWI WIDI ARIANTOKO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "9", "idKaryawan": 12046, "nama": "GITA KRISTIANA PRATIWI", "divisi": "2", "bagian": "2", "level": "1"},
    {"id_karyawan": "10", "idKaryawan": 12047, "nama": "IMRON ROSYADI", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "11", "idKaryawan": 12048, "nama": "FX.PERMADI LESMANA PUTRA", "divisi": "2", "bagian": "2", "level": "1"},
    {"id_karyawan": "12", "idKaryawan": 12049, "nama": "SAIFUL RIZAL", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "13", "idKaryawan": 12050, "nama": "TIO ACHMAD FATIHUDIN B.", "divisi": "2", "bagian": "2", "level": "1"},
    {"id_karyawan": "14", "idKaryawan": 12051, "nama": "DEWANTORO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "15", "idKaryawan": 12052, "nama": "SLAMET RIYADI B", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "16", "idKaryawan": 12053, "nama": "ATIM SUBANDI", "divisi": "2", "bagian": "2", "level": "1"},
    {"id_karyawan": "17", "idKaryawan": 12054, "nama": "DIDIK ASMARA", "divisi": "2", "bagian": "2", "level": "1"},
    {"id_karyawan": "18", "idKaryawan": 12055, "nama": "KUSNO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "19", "idKaryawan": 12056, "nama": "AGUS SANTOSO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "20", "idKaryawan": 12057, "nama": "SUJIYAT", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "21", "idKaryawan": 12058, "nama": "SARNO B", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "22", "idKaryawan": 12059, "nama": "TRI HERNO WIYOTO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "23", "idKaryawan": 12060, "nama": "JAMALI", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "24", "idKaryawan": 12061, "nama": "SAMIONO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "25", "idKaryawan": 12062, "nama": "RIYANTO B", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "26", "idKaryawan": 12063, "nama": "ALI MACHFUD", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "27", "idKaryawan": 12064, "nama": "RISDIYANTO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "28", "idKaryawan": 12065, "nama": "BUDIONO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "29", "idKaryawan": 12066, "nama": "M MOHAN", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "30", "idKaryawan": 12067, "nama": "SUPRAPTO", "divisi": "1", "bagian": "2", "level": "1"},
    {"id_karyawan": "31", "idKaryawan": 12068, "nama": "DEBBY BAIHAQI", "divisi": "1", "bagian": "2", "level": "1"}
  ],
  absen: dummyData()
  }

  const keyData = {
    'divisi': 'idDivisi',
    'bagian': 'idBagian',
    'level': 'idLevel',
    'karyawan': 'idKar',
    'absen': 'idAbsen'
  }

// function crud (operation, field, dat) {
  
//   if(operation == 'read'){
//       return allData[field]
//   }
  
//   else if(operation == 'create') {
//     allData[field].push(dat)
//   } 
      
//   else if (operation == 'update') {
//     let index = cariIndex( 
//                 allData[field], 
//                 {"equalTo": [keyData[field], dat[keyData[field]] ]} 
//                 )
//     allData[field].splice(index, 1)  //hapus
//     allData[field].splice(index, 0, dat) //sisipkan
//     // allData[field][index] = dat
    
//     }
// }

// function cariVal (obj, criteria) {
//   //obj = [ {"id": 1, "item1": "item content item content"} ]
//   //cireteria = { "equalTo": ["ObjectKey", "key to find"] }
//   let result = ''
  
//   if(criteria.equalTo) {
//     for (x in obj) {
//       if(obj[x][criteria.equalTo[0]] == criteria.equalTo[1]) { //jika sama
//         result = obj[x]
//       }
//     }
//   }
//   return result
// }



// function cariIndex (obj, criteria) {
//   //obj = [ {"id": 1, "item1": "item content item content"} ]
//   //cireteria = { "equalTo": ["ObjectKey", "key to find"] }

//   let result = ''
//   if(criteria.equalTo) {
//     for (x in obj) {
//       if(obj[x][criteria.equalTo[0]] == criteria.equalTo[1]) { //jika sama
//         result = x
//       }
//     }
//   }
//   return result
// }

// function jamTotal(masuk, pulang, istirahat) {
//   let Amasuk = masuk.split(":")[0]
//   let Apulang= pulang.split(":")[0]

//   if(Amasuk > Apulang) {
//     return Number(Apulang)+24 - (Number(Amasuk)+1) - istirahat
//   }

//   return Number(Apulang) - (Number(Amasuk)+1) - istirahat

// }


function generator (length) {
  let str = "qwertyuiopasdfghjkllzxcvbnm1234567890QWERYUIOPASDFGHJKLZXCVBNM"
  let result = "";

  for (i = 1; i <= Number(length); i ++) {
      result += str[Math.round(Math.random() * (str.length-1) ) ]
  }
  return result
}

function dummyData () {
  let result = []

  for (let i = 0; i < 150; i ++) {
      result.push({
        "id_absen": generator(6),
        "tanggal": generatorTgl () ,
        "karyawan": generatorNama(), 
        "masuk": generatorClock(), 
        "istirahat":1, 
        "pulang":generatorClock(), 
        "keterangan": "Masuk"
    })
  }
  return result
}

function generatorNama () {
  let nama = [12039,12040,12041,12042,12043,12044,12045,12046,12047,12048,12049,12050,12051,12052,12053,12054,12055,12056,12057,12058,12059,12060,12061,12062,12063,12064,12065,12066,12067,12068]
  return nama[Math.round(Math.random() * (nama.length-1) ) ]
}

function generatorClock () {
  let clock = ['14:30','22:46','06:42','22:39','22:48','14:46','06:50','06:45','22:45','06:46','06:25','22:45','06:51','06:55','06:31','14:29','06:21','06:26','09:49','06:56','14:48','22:41','06:26','18:50','06:47','14:46','22:42','14:30','14:49']
  return clock[Math.round(Math.random() * (clock.length-1) ) ]
}

function generatorTgl () {
  let clock = ['2021-03-02', '2021-04-02', '2021-05-02', '2021-06-02', '2021-07-02', '2021-08-02', '2021-09-02', '2021-10-02', '2021-11-02', '2021-12-02', '2021-01-22', '2021-04-23', ]
  return clock[Math.round(Math.random() * (clock.length-1) ) ]
}