import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('maps') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  marker :any;
  constructor(public navCtrl: NavController,private geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    this.geolocation.getCurrentPosition().then((resp) => {
    this.initMap(resp.coords.latitude,resp.coords.longitude);
}).catch((error) => {
  //this.initMap(36.73,3.08);
  console.log('Error getting location', error);
});
  }

  initMap(lat,lon) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: lat, lng: lon}
    });
    this.marker = new google.maps.Marker({
        position: {lat:lat,lng:lon},
        title:"Your Possition",
        animation: google.maps.Animation.DROP,
    });
    this.marker.setMap(this.map);

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
