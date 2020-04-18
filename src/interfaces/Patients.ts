export interface Pacjent {
  pacjentId: string
  imie: string
  nazwisko: string
  pesel: string
  numerKarty: string
  ulica: string
  miasto: string
  kodPocztowy: string
  numerTelefonu: string
  nip: string
  stanowisko: string
  dataOrzeczenia: string
  decyzja: DecyzjaEnum
  dataOrzeczeniaUpdated: boolean
  decyzjaUpdated: boolean
  firma?: Firma
}

export interface Firma {
  firmaId: string
  nazwa: string
  ulica: string
  miasto: string
  kodPocztowy: string
  nip: string
  ryczalt: number
}
