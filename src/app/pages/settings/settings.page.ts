import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SettingsService, Measurement } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SettingsPage {
  measurement: Measurement = 'metric'; //default shown until loaded
  loading = true;

  constructor(private settings: SettingsService, private router: Router) {}

  async ionViewWillEnter() {
    //load the stored value
    this.loading = true;
    this.measurement = await this.settings.getMeasurement();
    this.loading = false;
  }

  async onMeasurementChange(value: Measurement) {//runs when the user selects the choice
    this.measurement = value;
    await this.settings.setMeasurement(value);
  }

  back() {//back to the home page
    this.router.navigateByUrl('/home');
  }
}
