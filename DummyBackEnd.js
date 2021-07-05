
// data for app, you can get from backend or manually here

const allData = 
{ 
  divisi: [ {"idDivisi": 'div1', "divisi": "Gudang depan"}, {"idDivisi": "div2", "divisi": "Gudang sentral"} ],
  bagian: [ {"idBagian": 'bag1', "bagian": "Supervisor"}, {"idBagian": "bag2", "bagian": "Administration"} ],
  level: [ {"idLevel": "lev1" ,"level": "kontrak", "jamKerja": 8} ],
  karyawan: [ 
    {"idKaryawan": 12039, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"} ,
    {"idKaryawan": 12040, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKaryawan": 12041, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKaryawan": 12042, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKaryawan": 12043, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"},
    {"idKaryawan": 12044, "nama": "Rijal Bin Husen", "divisi": "div1", "bagian": "bag2", "level": "lev1"}
  ],
  }

  const keyData = {
    'divisi': 'idDivisi',
    'bagian': 'idBagian',
    'level': 'idLevel',
    'karyawan': 'idKaryawan'
  }

  //siapkkan data karyawan
const dataKaryawanLengkap = function () {
  let result = []
    for (x in allData.karyawan) {
      let res = allData.karyawan[x]
      res.divisi = cariVal(allData.divisi, {"equalTo": ['idDivisi', res.divisi]}).divisi
      res.bagian =  cariVal(allData.bagian, {"equalTo": ['idBagian', res.bagian]}).bagian
      res.level =  cariVal(allData.level, {"equalTo": ['idLevel', res.level]}).level
      result.push(res)
    }
    return result
}

function crud (operation, field, dat) {
  
  if(operation == 'read'){
    // if(field == 'karyawan') {
    //   return dataKaryawanLengkap()
    // } else {
      return allData[field]
    // }
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