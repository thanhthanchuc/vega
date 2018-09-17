import { Component, OnInit } from "@angular/core";
import { MakeService } from "../../services/make.service";

@Component({
    selector: 'vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})

export class VehicleFormComponent implements OnInit {
    makes: any[];
    models: any[];
    vehicle: any = {};

    constructor(private makeService: MakeService){
    }

    ngOnInit() {
        this.makeService.getMakes().subscribe(makes => this.makes = makes)
    };

    changeMake(){
        var make = this.makes.find(m => m.id == this.vehicle.make);
        this.models = make ? make.models : [];
    }
}

