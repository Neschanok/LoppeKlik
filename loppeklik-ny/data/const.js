// Faste data til appen: loppemarkeder i Slagelse og de varer, der ligger i appen første gang den åbnes.
// Markederne er eksempeldata til prototypen

export const MARKETS = [
  {
    id: 'nytorv',
    name: 'Loppemarked på Nytorv',
    address: 'Nytorv, 4200 Slagelse',
    latitude: 55.4033,
    longitude: 11.3540,
  },
  {
    id: 'hallerne',
    name: 'Loppemarked i Slagelse Hallerne',
    address: 'Harboesvej, 4200 Slagelse',
    latitude: 55.3985,
    longitude: 11.3365,
  },
  {
    id: 'station',
    name: 'Loppemarked ved Slagelse Station',
    address: 'Jernbanegade, 4200 Slagelse',
    latitude: 55.4005,
    longitude: 11.3520,
  },
];

// Startvarer. sold = false betyder, at varen er til salg
export const START_ITEMS = [
  { id: '1', marketId: 'nytorv', title: 'Vintage Levi\'s jakke', price: 250, stand: '12', placement: 'Ved springvandet', sold: false, latitude: 55.4034, longitude: 11.3537 },
  { id: '2', marketId: 'nytorv', title: 'Vase', price: 180, stand: '4', placement: 'Ved rådhuset', sold: false, latitude: 55.4031, longitude: 11.3544 },
  { id: '3', marketId: 'hallerne', title: 'Sofabord', price: 650, stand: '24', placement: 'Hal 1, ved indgangen', sold: false, latitude: 55.3987, longitude: 11.3362 },
  { id: '4', marketId: 'hallerne', title: 'Polaroid-kamera', price: 300, stand: '8', placement: 'Hal 2, ved caféen', sold: false, latitude: 55.3983, longitude: 11.3369 },
  { id: '5', marketId: 'station', title: 'Puma træningsjakke str. M', price: 200, stand: '31', placement: 'Ved busstoppestedet', sold: false, latitude: 55.4006, longitude: 11.3517 },
  { id: '6', marketId: 'station', title: 'Royal Copenhagen kopper (6 stk.)', price: 350, stand: '9', placement: 'Ved cykelparkeringen', sold: false, latitude: 55.4003, longitude: 11.3524 },
];