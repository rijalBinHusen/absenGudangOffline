
// data for app, you can get from backend or manually here

const allData = 
{ 
  divisi: [ {"idDivisi": 'div1', "divisi": "Gudang depan"}, {"idDivisi": "div2", "divisi": "Gudang sentral"} ],
  bagian: [ {"idBagian": 'bag1', "bagian": "Supervisor"}, {"idBagian": "bag2", "bagian": "Administration"} ],
  level: [ {"idLevel": "lev1" ,"level": "kontrak", "jamKerja": 7} ],
  karyawan: [ 
    {"idKar": "kar1", "idKaryawan": 12039, "nama": "SUDIONO", "divisi": "div1", "bagian": "bag2", "level": "lev1"} ,
    {"idKar": "kar2", "idKaryawan": 12040, "nama": "CAHYO HARDIANTO", "divisi": "div2", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar3", "idKaryawan": 12041, "nama": "KHOIRUL", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar4", "idKaryawan": 12042, "nama": "ARIMBI AYUNINGTYAS", "divisi": "div2", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar5", "idKaryawan": 12043, "nama": "M HUDA", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar6", "idKaryawan": 12044, "nama": "DENY ARDIANSYAH", "divisi": "div2", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar8", "idKaryawan": 12045, "nama": "DWI WIDI ARIANTOKO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar9", "idKaryawan": 12046, "nama": "GITA KRISTIANA PRATIWI", "divisi": "div2", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar10", "idKaryawan": 12047, "nama": "IMRON ROSYADI", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar11", "idKaryawan": 12048, "nama": "FX.PERMADI LESMANA PUTRA", "divisi": "div2", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar12", "idKaryawan": 12049, "nama": "SAIFUL RIZAL", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar13", "idKaryawan": 12050, "nama": "TIO ACHMAD FATIHUDIN B.", "divisi": "div2", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar14", "idKaryawan": 12051, "nama": "DEWANTORO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar15", "idKaryawan": 12052, "nama": "SLAMET RIYADI B", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar16", "idKaryawan": 12053, "nama": "ATIM SUBANDI", "divisi": "div2", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar17", "idKaryawan": 12054, "nama": "DIDIK ASMARA", "divisi": "div2", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar18", "idKaryawan": 12055, "nama": "KUSNO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar19", "idKaryawan": 12056, "nama": "AGUS SANTOSO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar20", "idKaryawan": 12057, "nama": "SUJIYAT", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar21", "idKaryawan": 12058, "nama": "SARNO B", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar22", "idKaryawan": 12059, "nama": "TRI HERNO WIYOTO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar23", "idKaryawan": 12060, "nama": "JAMALI", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar24", "idKaryawan": 12061, "nama": "SAMIONO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar25", "idKaryawan": 12062, "nama": "RIYANTO B", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar26", "idKaryawan": 12063, "nama": "ALI MACHFUD", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar27", "idKaryawan": 12064, "nama": "RISDIYANTO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar28", "idKaryawan": 12065, "nama": "BUDIONO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar29", "idKaryawan": 12066, "nama": "M MOHAN", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar30", "idKaryawan": 12067, "nama": "SUPRAPTO", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar31", "idKaryawan": 12068, "nama": "DEBBY BAIHAQI", "divisi": "div1", "bagian": "bag2", "level": "lev1"}
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

function crud (operation, field, dat) {
  
  if(operation == 'read'){
      return allData[field]
  }
  
  else if(operation == 'create') {
    allData[field].push(dat)
  } 
      
  else if (operation == 'update') {
    let index = cariIndex( 
                allData[field], 
                {"equalTo": [keyData[field], dat[keyData[field]] ]} 
                )
    allData[field].splice(index, 1)  //hapus
    allData[field].splice(index, 0, dat) //sisipkan
    // allData[field][index] = dat
    
    }
}

function cariVal (obj, criteria) {
  //obj = [ {"id": 1, "item1": "item content item content"} ]
  //cireteria = { "equalTo": ["ObjectKey", "key to find"] }
  let result = ''
  
  if(criteria.equalTo) {
    for (x in obj) {
      if(obj[x][criteria.equalTo[0]] == criteria.equalTo[1]) { //jika sama
        result = obj[x]
      }
    }
  }
  return result
}



function cariIndex (obj, criteria) {
  //obj = [ {"id": 1, "item1": "item content item content"} ]
  //cireteria = { "equalTo": ["ObjectKey", "key to find"] }

  let result = ''
  if(criteria.equalTo) {
    for (x in obj) {
      if(obj[x][criteria.equalTo[0]] == criteria.equalTo[1]) { //jika sama
        result = x
      }
    }
  }
  return result
}

function jamTotal(masuk, pulang, istirahat) {
  let Amasuk = masuk.split(":")[0]
  let Apulang= pulang.split(":")[0]

  if(Amasuk > Apulang) {
    return Number(Apulang)+24 - (Number(Amasuk)+1) - istirahat
  }

  return Number(Apulang) - (Number(Amasuk)+1) - istirahat

}


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
        "idAbsen": generator(6),
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
  let clock = ['2021-3-2', '2021-4-2', '2021-5-2', '2021-6-2', '2021-7-2', '2021-8-2', '2021-9-2', '2021-10-2', '2021-11-2', '2021-12-2', '2021-1-22', '2021-4-23', ]
  return clock[Math.round(Math.random() * (clock.length-1) ) ]
}