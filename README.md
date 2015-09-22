# dashboard-saude

## getting started

```
npm install
bower install
npm start
```

Built with Mithril.js, stylus, browserify and gulp.

## Formato dos dados

- Os dados estão no arquivo `static/json/hospitais.json`
- Cada entrada de um hospital tem o seguinte esquema:

```
{
  "id": 1,                          // [int] id desse item
  "name": "",                       // [str] nome do hospital
  "type": "",                       // [str] tipo (hospital | upa)
  "city": "",                       // [str] cidade
  "region": "",                     // [str] macro-região da saúde
  "lat": "",                        // [str] latitude no formato: "7°13'33.20\"S"
  "lon": "",                        // [str] longitude no formato: "39°19'31.70\"O"
  "info": {
    "specializedServices": "",      // [str] lista separada por ";" de serviços. (ex: "servico1; servico2; servico3")

    "ambulatoryCare": "H",          // [str] atenção ambulatorial. Os valores validos são:
                                    //       H = high (alta); M = medium (média); L = low (baixa); - = inexistente
    "hospitalCare": "H",            // [str] atenção hospitalar. Valores seguem a mesma regra acima: H | M | L | -
    "numPhysicians": "136",         // [str] número de médicos
    "numOtherProfessionals": "99",  // [str] número de outros profissionais
    "numBeds": "234",               // [str] número de leitos
    "numPatients": "117,338",       // [str] número de pacientes
    "ombudsman": "631"              // [str] ouvidoria
  },
  "ratings": {
    "services": 5,                  // [int] nota para "serviços" (de 0 a 10)
    "equipments": 2,                // [int] nota para "equipamentos" (de 0 a 10)
    "physicians": 6,                // [int] nota para "atenção dos médicos" (de 0 a 10)
    "waitingTime": 8                // [int] nota para "tempo de espera" (de 0 a 10)
  }
}
```
