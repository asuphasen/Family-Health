import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var google;
import { Plugins } from '@capacitor/core'
import { NavController } from '@ionic/angular';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-map-cost',
  templateUrl: './map-cost.page.html',
  styleUrls: ['./map-cost.page.scss'],
})
export class MapCostPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    Geolocation.getCurrentPosition().then(data => {
      console.log(data)
      let latLng = { lat: data.coords.latitude, lng: data.coords.longitude }
      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var iconok = {
        url: 'assets/icon/navigation.svg',
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 30)
      };
      var marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        icon: iconok
      });
      this.directionsDisplay.setMap(this.map);

      var service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch({
        location: latLng,
        radius: 5000,
        type: ['hospital']
      }, (results, status) => {
        console.log("results--------------------------",results)
        console.log("status---------------", status)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i], this.map);
            // console.log(results[i])
          }
        }
      });
    }).catch(err => {
      console.log(err)
    })

  }

  createMarker(place, map) {
    var iconok = {
      url: 'assets/icon/placeholder.svg',
      scaledSize: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 30)
    };
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc,
      icon: iconok
    });

    google.maps.event.addListener(marker, 'click', () => {
      // this.navCtrl.push(HomePage)
      // window.open(map, marker);
    });
  }

  close() {
    this.navCtrl.back();
  }

}
