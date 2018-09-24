import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../services/vehicle.service";
import { ToastyService } from "ng2-toasty";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: "vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };
  features: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService
  ) {
    route.params.subscribe(p => {
      this.vehicle.id = +p["id"];
    });
  }

  ngOnInit() {
      var sources = [
        this.vehicleService.getMakes(),
        this.vehicleService.getFeatures()
      ];
      if(this.vehicle.id)
        sources.push(this.vehicleService.getVehicle(this.vehicle.id));
      Observable.forkJoin(sources).subscribe(data => {
          this.makes = data[0];
          this.features = data[1];
          if(this.vehicle.id)
            this.vehicle = data[2];
      },
      err => {
        if (err.status == 404) this.router.navigate(["/"]);
      })
  }

  changeMake() {
    var make = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = make ? make.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle).subscribe(x => console.log(x));
  }
}
