const wasteCodes = [
  "01 03 04*",
  "01 03 05*",
  "01 03 07*",
  "01 03 06",
  "01 03 08",
  "01 03 09",
  "01 03 99",
  "01 04 07*",
  "01 04 08",
  "01 04 09",
  "01 04 10",
  "01 04 11",
  "01 04 12",
  "01 04 13",
  "01 04 99",
  "01 05 05*",
  "01 05 06*",
  "01 05 04",
  "01 05 07",
  "01 05 08",
  "01 05 99",
  "01 01 01",
  "01 01 02",
  "02 01 08*",
  "02 01 01",
  "02 01 02",
  "02 01 03",
  "02 01 04",
  "02 01 06",
  "02 01 07",
  "02 01 09",
  "02 01 10",
  "02 01 99",
  "02 02 01",
  "02 02 02",
  "02 02 03",
  "02 02 04",
  "02 02 99",
  "02 03 01",
  "02 03 02",
  "02 03 03",
  "02 03 04",
  "02 03 05",
  "02 03 99",
  "02 04 01",
  "02 04 02",
  "02 04 03",
  "02 04 99",
  "02 05 01",
  "02 05 02",
  "02 05 99",
  "02 06 01",
  "02 06 02",
  "02 06 03",
  "02 06 99",
  "02 07 01",
  "02 07 02",
  "02 07 03",
  "02 07 04",
  "02 07 05",
  "02 07 99",
  "03 01 04*",
  "03 01 01",
  "03 01 05",
  "03 01 99",
  "03 02 01*",
  "03 02 02*",
  "03 02 03*",
  "03 02 04*",
  "03 02 05*",
  "03 02 99",
  "03 03 01",
  "03 03 02",
  "03 03 05",
  "03 03 07",
  "03 03 08",
  "03 03 09",
  "03 03 10",
  "03 03 11",
  "03 03 99",
  "04 01 03*",
  "04 01 01",
  "04 01 02",
  "04 01 04",
  "04 01 05",
  "04 01 06",
  "04 01 07",
  "04 01 08",
  "04 01 09",
  "04 01 99",
  "04 02 14*",
  "04 02 16*",
  "04 02 19*",
  "04 02 09",
  "04 02 10",
  "04 02 15",
  "04 02 17",
  "04 02 20",
  "04 02 21",
  "04 02 22",
  "04 02 99",
  "05 01 02*",
  "05 01 03*",
  "05 01 04*",
  "05 01 05*",
  "05 01 06*",
  "05 01 07*",
  "05 01 08*",
  "05 01 09*",
  "05 01 11*",
  "05 01 12*",
  "05 01 15*",
  "05 01 10",
  "05 01 13",
  "05 01 14",
  "05 01 16",
  "05 01 17",
  "05 01 99",
  "05 06 01*",
  "05 06 03*",
  "05 06 04",
  "05 06 99",
  "05 07 01*",
  "05 07 02",
  "05 07 99",
  "06 01 01*",
  "06 01 02*",
  "06 01 03*",
  "06 01 04*",
  "06 01 05*",
  "06 01 06*",
  "06 01 99",
  "06 02 01*",
  "06 02 03*",
  "06 02 04*",
  "06 02 05*",
  "06 02 99",
  "06 03 11*",
  "06 03 13*",
  "06 03 15*",
  "06 03 14",
  "06 03 16",
  "06 03 99",
  "06 04 03*",
  "06 04 04*",
  "06 04 05*",
  "06 04 99",
  "06 05 02*",
  "06 05 03",
  "06 06 02*",
  "06 06 03",
  "06 06 99",
  "06 07 01*",
  "06 07 02*",
  "06 07 03*",
  "06 07 04*",
  "06 07 99",
  "06 08 02*",
  "06 08 99",
  "06 09 03*",
  "06 09 02",
  "06 09 04",
  "06 09 99",
  "06 10 02*",
  "06 10 99",
  "06 13 01*",
  "06 13 02*",
  "06 13 04*",
  "06 13 05*",
  "06 13 03",
  "06 13 99",
  "06 11 01",
  "06 11 99",
  "07 01 01*",
  "07 01 03*",
  "07 01 04*",
  "07 01 07*",
  "07 01 08*",
  "07 01 09*",
  "07 01 10*",
  "07 01 11*",
  "07 01 12",
  "07 01 99",
  "07 02 01*",
  "07 02 03*",
  "07 02 04*",
  "07 02 07*",
  "07 02 08*",
  "07 02 09*",
  "07 02 10*",
  "07 02 11*",
  "07 02 14*",
  "07 02 16*",
  "07 02 12",
  "07 02 13",
  "07 02 15",
  "07 02 17",
  "07 02 99",
  "07 03 01*",
  "07 03 03*",
  "07 03 04*",
  "07 03 07*",
  "07 03 08*",
  "07 03 09*",
  "07 03 10*",
  "07 03 11*",
  "07 03 12",
  "07 03 99",
  "07 04 01*",
  "07 04 03*",
  "07 04 04*",
  "07 04 07*",
  "07 04 08*",
  "07 04 09*",
  "07 04 10*",
  "07 04 11*",
  "07 04 13*",
  "07 04 12",
  "07 04 99",
  "07 05 01*",
  "07 05 03*",
  "07 05 04*",
  "07 05 07*",
  "07 05 08*",
  "07 05 09*",
  "07 05 10*",
  "07 05 11*",
  "07 05 13*",
  "07 05 12",
  "07 05 14",
  "07 05 99",
  "07 06 01*",
  "07 06 03*",
  "07 06 04*",
  "07 06 07*",
  "07 06 08*",
  "07 06 09*",
  "07 06 10*",
  "07 06 11*",
  "07 06 12",
  "07 06 99",
  "07 07 01*",
  "07 07 03*",
  "07 07 04*",
  "07 07 07*",
  "07 07 08*",
  "07 07 09*",
  "07 07 10*",
  "07 07 11*",
  "07 07 12",
  "07 07 99",
  "08 01 11*",
  "08 01 13*",
  "08 01 15*",
  "08 01 17*",
  "08 01 19*",
  "08 01 21*",
  "08 01 12",
  "08 01 14",
  "08 01 16",
  "08 01 18",
  "08 01 20",
  "08 01 99",
  "08 03 01*",
  "08 03 02*",
  "08 03 05*",
  "08 03 06*",
  "08 03 12*",
  "08 03 14*",
  "08 03 16*",
  "08 03 17*",
  "08 03 19*",
  "08 03 07",
  "08 03 08",
  "08 03 13",
  "08 03 15",
  "08 03 18",
  "08 03 99",
  "08 04 09*",
  "08 04 11*",
  "08 04 13*",
  "08 04 15*",
  "08 04 17*",
  "08 04 10",
  "08 04 12",
  "08 04 14",
  "08 04 16",
  "08 04 99",
  "08 05 01*",
  "08 02 01",
  "08 02 02",
  "08 02 03",
  "08 02 99",
  "09 01 01*",
  "09 01 02*",
  "09 01 03*",
  "09 01 04*",
  "09 01 05*",
  "09 01 06*",
  "09 01 11*",
  "09 01 13*",
  "09 01 07",
  "09 01 08",
  "09 01 10",
  "09 01 12",
  "09 01 99",
  "10 01 04*",
  "10 01 09*",
  "10 01 13*",
  "10 01 14*",
  "10 01 16*",
  "10 01 18*",
  "10 01 20*",
  "10 01 22*",
  "10 01 01",
  "10 01 02",
  "10 01 03",
  "10 01 05",
  "10 01 07",
  "10 01 15",
  "10 01 17",
  "10 01 19",
  "10 01 21",
  "10 01 23",
  "10 01 24",
  "10 01 25",
  "10 01 26",
  "10 01 99",
  "10 02 07*",
  "10 02 11*",
  "10 02 13*",
  "10 02 01",
  "10 02 02",
  "10 02 08",
  "10 02 10",
  "10 02 12",
  "10 02 14",
  "10 02 15",
  "10 02 99",
  "10 03 04*",
  "10 03 08*",
  "10 03 09*",
  "10 03 15*",
  "10 03 17*",
  "10 03 19*",
  "10 03 21*",
  "10 03 23*",
  "10 03 25*",
  "10 03 27*",
  "10 03 29*",
  "10 03 02",
  "10 03 05",
  "10 03 16",
  "10 03 18",
  "10 03 20",
  "10 03 22",
  "10 03 24",
  "10 03 26",
  "10 03 28",
  "10 03 30",
  "10 03 99",
  "10 04 01*",
  "10 04 02*",
  "10 04 03*",
  "10 04 04*",
  "10 04 05*",
  "10 04 06*",
  "10 04 07*",
  "10 04 09*",
  "10 04 10",
  "10 04 99",
  "10 05 03*",
  "10 05 05*",
  "10 05 06*",
  "10 05 08*",
  "10 05 10*",
  "10 05 01",
  "10 05 04",
  "10 05 09",
  "10 05 11",
  "10 05 99",
  "10 06 03*",
  "10 06 06*",
  "10 06 07*",
  "10 06 09*",
  "10 06 01",
  "10 06 02",
  "10 06 04",
  "10 06 10",
  "10 06 99",
  "10 07 07*",
  "10 07 01",
  "10 07 02",
  "10 07 03",
  "10 07 04",
  "10 07 05",
  "10 07 08",
  "10 07 99",
  "10 08 08*",
  "10 08 10*",
  "10 08 12*",
  "10 08 15*",
  "10 08 17*",
  "10 08 19*",
  "10 08 04",
  "10 08 09",
  "10 08 11",
  "10 08 13",
  "10 08 14",
  "10 08 16",
  "10 08 18",
  "10 08 20",
  "10 08 99",
  "10 09 05*",
  "10 09 07*",
  "10 09 09*",
  "10 09 11*",
  "10 09 13*",
  "10 09 15*",
  "10 09 03",
  "10 09 06",
  "10 09 08",
  "10 09 10",
  "10 09 12",
  "10 09 14",
  "10 09 16",
  "10 09 99",
  "10 10 05*",
  "10 10 07*",
  "10 10 09*",
  "10 10 11*",
  "10 10 13*",
  "10 10 15*",
  "10 10 03",
  "10 10 06",
  "10 10 08",
  "10 10 10",
  "10 10 12",
  "10 10 14",
  "10 10 16",
  "10 10 99",
  "10 11 09*",
  "10 11 11*",
  "10 11 13*",
  "10 11 15*",
  "10 11 17*",
  "10 11 19*",
  "10 11 03",
  "10 11 05",
  "10 11 10",
  "10 11 12",
  "10 11 14",
  "10 11 16",
  "10 11 18",
  "10 11 20",
  "10 11 99",
  "10 12 09*",
  "10 12 11*",
  "10 12 01",
  "10 12 03",
  "10 12 05",
  "10 12 06",
  "10 12 08",
  "10 12 10",
  "10 12 12",
  "10 12 13",
  "10 12 99",
  "10 13 09*",
  "10 13 12*",
  "10 13 01",
  "10 13 04",
  "10 13 06",
  "10 13 07",
  "10 13 10",
  "10 13 11",
  "10 13 13",
  "10 13 14",
  "10 13 99",
  "10 14 01*",
  "11 01 05*",
  "11 01 06*",
  "11 01 07*",
  "11 01 08*",
  "11 01 09*",
  "11 01 11*",
  "11 01 13*",
  "11 01 15*",
  "11 01 16*",
  "11 01 98*",
  "11 01 10",
  "11 01 12",
  "11 01 14",
  "11 01 99",
  "11 02 02*",
  "11 02 05*",
  "11 02 07*",
  "11 02 03",
  "11 02 06",
  "11 02 99",
  "11 03 01*",
  "11 03 02*",
  "11 05 03*",
  "11 05 04*",
  "11 05 01",
  "11 05 02",
  "11 05 99",
  "12 01 06*",
  "12 01 07*",
  "12 01 08*",
  "12 01 09*",
  "12 01 10*",
  "12 01 12*",
  "12 01 14*",
  "12 01 16*",
  "12 01 18*",
  "12 01 19*",
  "12 01 20*",
  "12 01 01",
  "12 01 02",
  "12 01 03",
  "12 01 04",
  "12 01 05",
  "12 01 13",
  "12 01 15",
  "12 01 17",
  "12 01 21",
  "12 01 99",
  "12 03 01*",
  "12 03 02*",
  "13 01 01*",
  "13 01 04*",
  "13 01 05*",
  "13 01 09*",
  "13 01 10*",
  "13 01 11*",
  "13 01 12*",
  "13 01 13*",
  "13 02 04*",
  "13 02 05*",
  "13 02 06*",
  "13 02 07*",
  "13 02 08*",
  "13 03 01*",
  "13 03 06*",
  "13 03 07*",
  "13 03 08*",
  "13 03 09*",
  "13 03 10*",
  "13 04 01*",
  "13 04 02*",
  "13 04 03*",
  "13 05 01*",
  "13 05 02*",
  "13 05 03*",
  "13 05 06*",
  "13 05 07*",
  "13 05 08*",
  "13 07 01*",
  "13 07 02*",
  "13 07 03*",
  "13 08 01*",
  "13 08 02*",
  "13 08 99*",
  "14 06 01*",
  "14 06 02*",
  "14 06 03*",
  "14 06 04*",
  "14 06 05*",
  "15 01 10*",
  "15 01 11*",
  "15 01 01",
  "15 01 02",
  "15 01 03",
  "15 01 04",
  "15 01 05",
  "15 01 06",
  "15 01 07",
  "15 01 09",
  "15 02 02*",
  "15 02 03",
  "16 01 04*",
  "16 01 07*",
  "16 01 08*",
  "16 01 09*",
  "16 01 10*",
  "16 01 11*",
  "16 01 13*",
  "16 01 14*",
  "16 01 21*",
  "16 01 03",
  "16 01 06",
  "16 01 12",
  "16 01 15",
  "16 01 16",
  "16 01 17",
  "16 01 18",
  "16 01 19",
  "16 01 20",
  "16 01 22",
  "16 01 99",
  "16 02 09*",
  "16 02 10*",
  "16 02 11*",
  "16 02 12*",
  "16 02 13*",
  "16 02 15*",
  "16 02 14",
  "16 02 16",
  "16 03 03*",
  "16 03 05*",
  "16 03 04",
  "16 03 06",
  "16 04 01*",
  "16 04 02*",
  "16 04 03*",
  "16 05 04*",
  "16 05 06*",
  "16 05 07*",
  "16 05 08*",
  "16 05 05",
  "16 05 09",
  "16 06 01*",
  "16 06 02*",
  "16 06 03*",
  "16 06 06*",
  "16 06 04",
  "16 06 05",
  "16 07 08*",
  "16 07 09*",
  "16 07 99",
  "16 08 02*",
  "16 08 05*",
  "16 08 06*",
  "16 08 07*",
  "16 08 01",
  "16 08 03",
  "16 08 04",
  "16 09 01*",
  "16 09 02*",
  "16 09 03*",
  "16 09 04*",
  "16 10 01*",
  "16 10 03*",
  "16 10 02",
  "16 10 04",
  "16 11 01*",
  "16 11 03*",
  "16 11 05*",
  "16 11 02",
  "16 11 04",
  "16 11 06",
  "17 01 06*",
  "17 01 01",
  "17 01 02",
  "17 01 03",
  "17 01 07",
  "17 02 04*",
  "17 02 01",
  "17 02 02",
  "17 02 03",
  "17 03 01*",
  "17 03 03*",
  "17 03 02",
  "17 04 09*",
  "17 04 10*",
  "17 04 01",
  "17 04 02",
  "17 04 03",
  "17 04 04",
  "17 04 05",
  "17 04 06",
  "17 04 07",
  "17 04 11",
  "17 05 03*",
  "17 05 05*",
  "17 05 07*",
  "17 05 04",
  "17 05 06",
  "17 05 08",
  "17 06 01*",
  "17 06 03*",
  "17 06 05*",
  "17 06 04",
  "17 08 01*",
  "17 08 02",
  "17 09 01*",
  "17 09 02*",
  "17 09 03*",
  "17 09 04",
  "18 01 03*",
  "18 01 06*",
  "18 01 08*",
  "18 01 10*",
  "18 01 01",
  "18 01 02",
  "18 01 04",
  "18 01 07",
  "18 01 09",
  "18 02 02*",
  "18 02 05*",
  "18 02 07*",
  "18 02 01",
  "18 02 03",
  "18 02 06",
  "18 02 08",
  "19 01 05*",
  "19 01 06*",
  "19 01 07*",
  "19 01 10*",
  "19 01 11*",
  "19 01 13*",
  "19 01 15*",
  "19 01 17*",
  "19 01 02",
  "19 01 12",
  "19 01 14",
  "19 01 16",
  "19 01 18",
  "19 01 19",
  "19 01 99",
  "19 02 04*",
  "19 02 05*",
  "19 02 07*",
  "19 02 08*",
  "19 02 09*",
  "19 02 11*",
  "19 02 03",
  "19 02 06",
  "19 02 10",
  "19 02 99",
  "19 03 04*",
  "19 03 06*",
  "19 03 05",
  "19 03 07",
  "19 04 02*",
  "19 04 03*",
  "19 04 01",
  "19 04 04",
  "19 07 02*",
  "19 07 03",
  "19 08 06*",
  "19 08 07*",
  "19 08 08*",
  "19 08 10*",
  "19 08 11*",
  "19 08 13*",
  "19 08 01",
  "19 08 02",
  "19 08 05",
  "19 08 09",
  "19 08 12",
  "19 08 14",
  "19 08 99",
  "19 10 03*",
  "19 10 05*",
  "19 10 01",
  "19 10 02",
  "19 10 04",
  "19 10 06",
  "19 11 01*",
  "19 11 02*",
  "19 11 03*",
  "19 11 04*",
  "19 11 05*",
  "19 11 07*",
  "19 11 06",
  "19 11 99",
  "19 12 06*",
  "19 12 11*",
  "19 12 01",
  "19 12 02",
  "19 12 03",
  "19 12 04",
  "19 12 05",
  "19 12 07",
  "19 12 08",
  "19 12 09",
  "19 12 10",
  "19 12 12",
  "19 13 01*",
  "19 13 03*",
  "19 13 05*",
  "19 13 07*",
  "19 13 02",
  "19 13 04",
  "19 13 06",
  "19 13 08",
  "19 05 01",
  "19 05 02",
  "19 05 03",
  "19 05 99",
  "19 06 03",
  "19 06 04",
  "19 06 05",
  "19 06 06",
  "19 06 99",
  "19 09 01",
  "19 09 02",
  "19 09 03",
  "19 09 04",
  "19 09 05",
  "19 09 06",
  "19 09 99",
  "20 01 13*",
  "20 01 14*",
  "20 01 15*",
  "20 01 17*",
  "20 01 19*",
  "20 01 21*",
  "20 01 23*",
  "20 01 26*",
  "20 01 27*",
  "20 01 29*",
  "20 01 31*",
  "20 01 33*",
  "20 01 35*",
  "20 01 37*",
  "20 01 01",
  "20 01 02",
  "20 01 08",
  "20 01 10",
  "20 01 11",
  "20 01 25",
  "20 01 28",
  "20 01 30",
  "20 01 32",
  "20 01 34",
  "20 01 36",
  "20 01 38",
  "20 01 39",
  "20 01 40",
  "20 01 41",
  "20 01 99",
  "20 02 01",
  "20 02 02",
  "20 02 03",
  "20 03 01",
  "20 03 02",
  "20 03 03",
  "20 03 04",
  "20 03 06",
  "20 03 07",
  "20 03 99"
];
export default wasteCodes;