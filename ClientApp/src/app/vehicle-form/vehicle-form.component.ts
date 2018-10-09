import * as _ from "underscore";
import { SaveVehicle, Vehicle } from "./../models/vehicle";
import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../services/vehicle.service";
import { ToastyService } from "ng2-toasty";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

@Component({
  selector: "vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: SaveVehicle = {
    id: 0,
    modelId: 0,
    makeId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: "",
      email: "",
      phone: ""
    }
  };
  features: any[];
  vehicles: Vehicle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService
  ) {
    route.params.subscribe(p => {
      this.vehicle.id = +p["id"] || 0;
    });
  }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];
    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    Observable.forkJoin(sources).subscribe(
      data => {
        this.makes = data[0];
        this.features = data[1];

        if (this.vehicle.id) {
          this.setVehicle(data[2]);
          this.populateMake();
        }
      },
      err => {
        if (err.status == 404) this.router.navigate(["/"]);
      }
    );
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.makes.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, "id");
  }

  changeMake() {
    this.populateMake();
    delete this.vehicle.modelId;
  }

  private populateMake() {
    var make = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = make ? make.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle).subscribe(x => {
          this.vehicleService.toastySuccess("The vehicle was updated successfully!", 5000);
          this.router.navigate(["/vehicles/" + x.id]);
        });
      } else {
      let vehicleForCreate = {
        modelId: this.vehicle.modelId,
        makeId: this.vehicle.makeId,
        isRegistered: this.vehicle.isRegistered,
        features: this.vehicle.features,
        contact: this.vehicle.contact
      };
      this.vehicleService.create(vehicleForCreate).subscribe(x => {
          this.vehicleService.toastySuccess("The vehicle was created successfully!", 5000);
          this.router.navigate(["/vehicles/" + x.id]);
        });
      }
  }
}
