import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../services/vehicle.service";

@Component({
    selector: 'vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})

export class VehicleFormComponent implements OnInit {
    makes: any[];
    models: any[];
    vehicle: any = {
        features: [],
        contact: {}
    };
    features: any[];

    constructor(private vehicleService: VehicleService){
    }

    ngOnInit() {
        this.vehicleService.getMakes().subscribe(makes => this.makes = makes)
        this.vehicleService.getFeatures().subscribe(fe => this.features = fe);
    };

    changeMake(){
        var make = this.makes.find(m => m.id == this.vehicle.makeId);
        this.models = make ? make.models : [];
        delete this.vehicle.modelId;
    }

    onFeatureToggle(featureId, $event){
        if($event.target.checked)
            this.vehicle.features.push(featureId);
        else {
            var index = this.vehicle.features.indexOf(featureId);
            this.vehicle.features.splice(index, 1);
        }
    }
}

