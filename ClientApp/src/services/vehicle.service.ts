import { ToastyService } from 'ng2-toasty';
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { SaveVehicle } from "../app/models/vehicle";

@Injectable()
export class VehicleService {
  private readonly vehiclesEndPoint = "/api/vehicles";

  constructor(private http: Http, private toastyService: ToastyService) {}

  getMakes() {
    return this.http.get("/api/makes").map(res => res.json());
  }

  getFeatures() {
    return this.http.get("/api/features").map(res => res.json());
  }

  create(vehicle) {
    return this.http.post(this.vehiclesEndPoint, vehicle).map(res => res.json());
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndPoint + "/" + id).map(res => res.json());
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndPoint + "/" + vehicle.id, vehicle).map(res => res.json());
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndPoint + "/" + id).map(res => res.json());
  }

  getAllVehicles(filter) {
    return this.http.get(this.vehiclesEndPoint + "?" + this.onQueryString(filter)).map(res => res.json());
  }

  onQueryString(obj) {
    var parts = [];
    for(var property in obj){
      var value = obj[property];
      if(value != null && value != undefined)
        parts.push(encodeURIComponent(property) + "=" + encodeURIComponent(value));
    }

    return parts.join("&");
  }

  toastySuccess(msg: string, timeout: number) {
    this.toastyService.success({
      title: 'Success',
      msg: msg,
      theme: 'bootstrap',
      showClose: true,
      timeout: timeout
    })
  }
}
