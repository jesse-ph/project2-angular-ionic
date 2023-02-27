import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Rizal Park',
      'A place where Jose P. Rizal had been executed.',
      'https://upload.wikimedia.org/wikipedia/commons/c/cd/Rizal_Park_Front_View.jpg',
      100,
      new Date('2023-03-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p2',
      'Intramuros',
      'Historic place in the Manila and had been established during Spanish colony.',
      'https://upload.wikimedia.org/wikipedia/commons/7/7d/Fort_Santiago%2C_Intramuros.JPG',
      300,
      new Date('2023-03-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p3',
      'Boracay',
      'Well-known beach in the world located in the Philippines.',
      'https://upload.wikimedia.org/wikipedia/commons/c/cd/Boracay_White_Beach.png',
      5000,
      new Date('2023-03-01'),
      new Date('2023-12-31')
    )
  ];

  constructor() { }

  get places() {
    return [...this._places]
  }

  getPlace(id: string): Place {
    return <Place>{ ...this._places.find((p: Place) => p.id === id) };
  }
}
