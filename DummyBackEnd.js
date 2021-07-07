
// data for app, you can get from backend or manually here

const allData = 
{ 
  divisi: [ {"idDivisi": 'div1', "divisi": "Gudang depan"}, {"idDivisi": "div2", "divisi": "Gudang sentral"} ],
  bagian: [ {"idBagian": 'bag1', "bagian": "Supervisor"}, {"idBagian": "bag2", "bagian": "Administration"} ],
  level: [ {"idLevel": "lev1" ,"level": "kontrak", "jamKerja": 7} ],
  karyawan: [ 
    {"idKar": "kar1", "idKaryawan": 12039, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"} ,
    {"idKar": "kar2", "idKaryawan": 12040, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar3", "idKaryawan": 12041, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar4", "idKaryawan": 12042, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar5", "idKaryawan": 12043, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKar": "kar6", "idKaryawan": 12044, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"}
  ],
  absen: [
      {"idAbsen": "abs1",
      "tanggal": "2021-3-2" ,
      "karyawan": "12039", 
      "masuk": "06:23", 
      "istirahat":1, 
      "pulang":"15:23", 
      "keterangan": "Masuk"
    }
  ]  }

  const keyData = {
    'divisi': 'idDivisi',
    'bagian': 'idBagian',
    'level': 'idLevel',
    'karyawan': 'idKar',
    'absen': 'idAbsen'
  }

  //siapkkan data karyawan
const dataAbsen = function () {
  let result = []
    allData.absen.map((val, index) => {
      
      let karyawan = cariVal(allData.karyawan, {"equalTo": ['idKaryawan', val.karyawan]})
      let jamKerja = cariVal(allData.level, {"equalTo": ["idLevel", karyawan.level] }).jamKerja
      let total = jamTotal(val.masuk, val.pulang, val.istirahat)
            
        result.push({
          idAbsen: val.idAbsen,
          tanggal: val.tanggal,
          idKaryawan: val.karyawan,
          nama: karyawan.nama,
          divisi: cariVal(allData.divisi, {"equalTo": ["idDivisi", karyawan.divisi]}).divisi,
          bagian: cariVal(allData.bagian, {"equalTo": ["idBagian", karyawan.bagian]}).bagian,
          masuk: val.masuk,
          istirahat: val.istirahat,
          pulang: val.pulang,
          jamKerja: jamKerja,
          keterangan: val.keterangan,
          total: total, 
          selisih: total-jamKerja
        })
    })
    return result
}

function crud (operation, field, dat) {
  
  if(operation == 'read'){
    if(field == 'absen') {
      return dataAbsen()
    }
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