import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace!: Place;
  @Input() selectedMode!: 'select' | 'random';
  @ViewChild('f', { static: true }) form!: NgForm;
  minDateTo!: string;
  startDate!: string;
  endDate!: string;

  constructor(private modalCtrl: ModalController, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.minDateTo = new Date().toISOString();
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    if(this.selectedMode === 'random') {
      this.startDate = new Date(availableFrom.getTime()
                      + Math.random()
                      * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
                      ).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime()
                    + Math.random()
                    * (new Date(this.startDate).getTime()
                    + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())
                  ).toISOString();
    }
  }

  onBookPlace() {
    if(!this.form.valid || !this.datesValid()) return;

    const values = this.form.value;

    this.modalCtrl.dismiss({ bookingData: {
      firstName: values['first-name'],
      lastName: values['last-name'],
      guestNumber: values['guest-number'],
      startDate: values['date-from'],
      endDate: values['date-to']
    } }, 'confirm');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  setMinDate(event: any) {
    if(!event) return;

    const date = new Date(event);
    this.minDateTo = date.toISOString();
    this.endDate = date.toISOString();
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);

    return endDate > startDate;
  }

}
