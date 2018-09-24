import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../services/vehicle.service";
import { ToastyService } from "ng2-toasty";
import { ActivatedRoute, Router } from "@angular/router";

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
    this.vehicleService.getVehicle(this.vehicle.id).subscribe(
      v => {
        this.vehicle = v;
      },
      err => {
        if (err.status == 404) this.router.navigate(["/"]);
      }
    );
    this.vehicleService.getMakes().subscribe(makes => (this.makes = makes));
    this.vehicleService.getFeatures().subscribe(fe => (this.features = fe));
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
