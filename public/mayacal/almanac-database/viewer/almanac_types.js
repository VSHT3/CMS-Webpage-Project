// Typ a struktura almanachov prevzate z mayacodices.org (AlmDetail.asp).
// Generovane automaticky - neupravuj rucne.
// Kluc: <codex>|<strana bez vodiacich nul>
//   match:'verified' = pocet urovni aj nazvy dni sedia s datami appky
//   match:'mismatch' = mayacodices cita almanach inak -> Interpretacia 2
const IMPORTED_TYPES = {
 "DRE|10a-12a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 321,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|10b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 322,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|10b-11b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 323,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|10c-11c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 324,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "DRE|12a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 326,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "DRE|12b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 328,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|12c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 329,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "DRE|13a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 330,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|13b-14b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 331,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|13c-14c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 332,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "mismatch"
 },
 "DRE|14a-15a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 333,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|15a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 334,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|15b-16b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 335,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "DRE|15c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 336,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "DRE|16a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 355,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|16a-17a": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 337,
  "structure": null,
  "levels": null,
  "interval": null,
  "match": "verified"
 },
 "DRE|16b-17b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 338,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|16c-17c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 339,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "DRE|17b-18b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 340,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|17c-18c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 341,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|18a-19a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 342,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|18c-19c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 343,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|19a-21a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 344,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "DRE|19b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 356,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|19b-20b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 345,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "DRE|19c-20c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 346,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|20b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 347,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|21a-22a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 348,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "DRE|21b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 349,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "DRE|21c-22c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 350,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|22a-23a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 351,
  "structure": "20 x 39",
  "levels": 20,
  "interval": 39,
  "match": "verified"
 },
 "DRE|22b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 352,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|22c-23c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 353,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|23b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 354,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|25-28": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 357,
  "structure": "52-year",
  "levels": null,
  "interval": null,
  "match": "verified"
 },
 "DRE|29a-30a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 358,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "DRE|29b-30b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 359,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|29c-30c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 360,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "DRE|2a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 303,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|2b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 304,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|2c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 305,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|2d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 306,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|30a-31a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 361,
  "structure": null,
  "levels": null,
  "interval": null,
  "match": "verified"
 },
 "DRE|30b-31b": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 362,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "DRE|30c-33c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 363,
  "structure": "20 x 117",
  "levels": 20,
  "interval": 117,
  "match": "verified"
 },
 "DRE|35b-37b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 367,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "DRE|38b-41b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 368,
  "structure": "5 x 104",
  "levels": 5,
  "interval": 104,
  "match": "verified"
 },
 "DRE|3a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 307,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|40a-41a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 369,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "DRE|40c-41c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 370,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|41b-43b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 371,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|42a-44a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 372,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "DRE|42c-45c": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 373,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "DRE|4a-10a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 310,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|4c-5c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 312,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "DRE|5b-6b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 313,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|5c-6c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 314,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "DRE|65a-69a": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 384,
  "structure": "2 x 91",
  "levels": 2,
  "interval": 91,
  "match": "mismatch"
 },
 "DRE|65b-69b": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 385,
  "structure": "2 x 91",
  "levels": 2,
  "interval": 91,
  "match": "mismatch"
 },
 "DRE|6b-7b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 315,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|6c-7c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 316,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|8b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 317,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "DRE|8c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 318,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "DRE|9b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 319,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "DRE|9c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 320,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "mismatch"
 },
 "MAD|100d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 217,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|101b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 219,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|101c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 220,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|101d": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 221,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "MAD|102b": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 223,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|102c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 224,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|102d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 225,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|103a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 226,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|103b-106b": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 227,
  "structure": "13 x 20",
  "levels": 13,
  "interval": 20,
  "match": "mismatch"
 },
 "MAD|103c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 228,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|103c-104c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 229,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|104a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 230,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|104c-105c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 231,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|105a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 232,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|105c-106c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 233,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|106a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 234,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|106b-108b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 235,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|106c-107c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 236,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|107a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 237,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|107c-108c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 238,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|108b-109b": {
  "type": "Circular",
  "uncertain": true,
  "alm": 240,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|108c-109c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 241,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|109a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 242,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|109b-110b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 243,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|109c-110c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 244,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|10a-13a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 12,
  "structure": "5 x 104",
  "levels": 5,
  "interval": 104,
  "match": "verified"
 },
 "MAD|10b-11b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 13,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|10c-11c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 14,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|110b": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 246,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|110c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 247,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|111a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 248,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|111b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 249,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|111b-112b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 250,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|111c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 251,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|111c'": {
  "type": "Standard",
  "uncertain": false,
  "alm": 252,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|112c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 254,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "MAD|12b-18b": {
  "type": "In extenso",
  "uncertain": false,
  "alm": 15,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "MAD|14a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 16,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|15a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 17,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|16a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 18,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|17a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 19,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|18a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 20,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|19a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 21,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|19b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 22,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|20a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 23,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|20b-21b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 24,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|20c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 25,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|20d-21d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 26,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|21a-22a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 27,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|21c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 28,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|21d-22d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 29,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|22a-23a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 30,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|22b-23b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 31,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|22c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 32,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|22d-23d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 33,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "MAD|23b": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 34,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|23c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 35,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|24a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 36,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|24b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 37,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|24c-25c": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 38,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|24d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 39,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|25a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 40,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|25b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 41,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|25d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 42,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|26a-27a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 43,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|26b-27b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 44,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|26c-27c": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 45,
  "structure": "5 x 156",
  "levels": 5,
  "interval": 156,
  "match": "mismatch"
 },
 "MAD|26d-27d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 46,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|27a-28a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 47,
  "structure": "2 x 130",
  "levels": 2,
  "interval": 130,
  "match": "mismatch"
 },
 "MAD|27b-28b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 48,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|27c-28c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 49,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|28d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 50,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|29a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 51,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|29b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 52,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|29c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 53,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|29d": {
  "type": "Circular",
  "uncertain": false,
  "alm": 54,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|30a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 55,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|30b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 56,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|31a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 57,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|31b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 58,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|32a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 59,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|32b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 60,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|33a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 61,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|33b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 62,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|38a-39a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 64,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|38b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 65,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|38c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 67,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|39c": {
  "type": "Circular",
  "uncertain": false,
  "alm": 69,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|3a-6a": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 4,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|40a-41a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 70,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|40b-41b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 71,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|40c-41c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 72,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|42b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 74,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "mismatch"
 },
 "MAD|42c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 75,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|43a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 76,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|43b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 77,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|43c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 79,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|44a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 81,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|44b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 82,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|44c": {
  "type": "Circular",
  "uncertain": false,
  "alm": 83,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|45a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 84,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|45b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 85,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|45c": {
  "type": "Circular",
  "uncertain": false,
  "alm": 86,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|46a-47a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 87,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|46b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 88,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|46c": {
  "type": "Circular",
  "uncertain": false,
  "alm": 89,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|47b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 90,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|47c": {
  "type": "Circular",
  "uncertain": false,
  "alm": 91,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|48a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 92,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|48b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 93,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|48c": {
  "type": "Circular",
  "uncertain": false,
  "alm": 94,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|49a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 95,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|49b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 96,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|49c-50c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 98,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|4b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 5,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|50a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 100,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|50b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 101,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "MAD|51a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 103,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|51b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 104,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|51c": {
  "type": "Circular",
  "uncertain": false,
  "alm": 105,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|52a-53a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 106,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|52b-53b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 108,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|52c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 109,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|53c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 110,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|54a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 111,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|54b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 112,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|55a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 114,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|55b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 115,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|55c": {
  "type": "Circular",
  "uncertain": false,
  "alm": 116,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|57a-59a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 121,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|57b": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 122,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|58b-59b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 124,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|58c-62c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 125,
  "structure": "20 x 91",
  "levels": 20,
  "interval": 91,
  "match": "mismatch"
 },
 "MAD|59a-60a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 126,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|5b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 6,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "MAD|60b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 127,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|60b-61b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 128,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|61a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 129,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|61b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 131,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|62a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 132,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|62b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 133,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|63a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 134,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|63b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 135,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|63c-64c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 136,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|64a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 137,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|64b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 138,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|6b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 7,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|73a-74a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 141,
  "structure": "2 x 130",
  "levels": 2,
  "interval": 130,
  "match": "mismatch"
 },
 "MAD|74b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 142,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|77-78": {
  "type": "In extenso",
  "uncertain": true,
  "alm": 144,
  "structure": null,
  "levels": null,
  "interval": null,
  "match": "mismatch"
 },
 "MAD|79a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 145,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|79b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 146,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|79c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 147,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|7a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 8,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|7b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 9,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|8": {
  "type": "Circular",
  "uncertain": false,
  "alm": 10,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|80a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 148,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|80b": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 149,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|80b-81b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 150,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|80c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 151,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|81a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 152,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|81c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 153,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|82a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 155,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|82a-83a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 156,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|82b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 157,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|82c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 159,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|83a-84a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 160,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|83b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 161,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|83c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 162,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|84a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 163,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|84b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 164,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|84c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 165,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|85a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 166,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|85a-86a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 167,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "mismatch"
 },
 "MAD|85b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 168,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|85b-86b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 169,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|85c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 170,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|86b-87b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 171,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|86c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 172,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|87a-88a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 173,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|87b-88b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 174,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|87c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 175,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|88a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 176,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|88b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 177,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|88c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 178,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|89a-90a": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 179,
  "structure": "4 x 5",
  "levels": 4,
  "interval": 5,
  "match": "verified"
 },
 "MAD|89b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 180,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|89c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 181,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|89c-90c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 182,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "MAD|89d-90d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 183,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|90a-92a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 184,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|90b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 185,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|90d-92d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 186,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|91b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 187,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "mismatch"
 },
 "MAD|91b-92b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 188,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|91c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 189,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|92a-93a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 190,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "mismatch"
 },
 "MAD|92b-93b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 191,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|92c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 192,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|92c-93c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 193,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|93a-94a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 194,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|93b-94b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 195,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|93d-94d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 196,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|94c-95c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 197,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|94d-95d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 198,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|95a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 199,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|95b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 200,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|95b-96b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 201,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|95d-96d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 202,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|96a": {
  "type": "Circular",
  "uncertain": false,
  "alm": 203,
  "structure": "10 x 26",
  "levels": 10,
  "interval": 26,
  "match": "verified"
 },
 "MAD|96b": {
  "type": "Circular",
  "uncertain": false,
  "alm": 204,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|96c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 205,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|97a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 206,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|97b-98b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 207,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|97c-98c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 208,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|97d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 209,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|98a": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 210,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|98c-99c": {
  "type": "Crossover",
  "uncertain": false,
  "alm": 211,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|98d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 212,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|99a-100a": {
  "type": "Standard",
  "uncertain": false,
  "alm": 213,
  "structure": "4 x 65",
  "levels": 4,
  "interval": 65,
  "match": "verified"
 },
 "MAD|99b-100b": {
  "type": "Standard",
  "uncertain": false,
  "alm": 214,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|99c-100c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 215,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "MAD|99d": {
  "type": "Standard",
  "uncertain": false,
  "alm": 216,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "PAR|17c-18c": {
  "type": "Standard",
  "uncertain": false,
  "alm": 426,
  "structure": "5 x 52",
  "levels": 5,
  "interval": 52,
  "match": "verified"
 },
 "PAR|23-24": {
  "type": "Non-standard",
  "uncertain": false,
  "alm": 430,
  "structure": "5 x 364",
  "levels": 5,
  "interval": 364,
  "match": "mismatch"
 }
};
