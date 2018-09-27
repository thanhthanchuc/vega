import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
    selector: 'vehicles-list',
    templateUrl: 'vehicles-list.component.html',
    styleUrls: ['vehicles-list.component.css']
})

export class VehiclesListComponent implements OnInit {
    vehicles : Vehicle[];

    constructor(private vehicleService: VehicleService) {

    }

    ngOnInit() {
        this.vehicleService.getAllVehicles()
            .subscribe(x => this.vehicles = x);
    }
}