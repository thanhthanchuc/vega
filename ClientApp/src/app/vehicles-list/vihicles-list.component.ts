import { KeyValuePair } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
    selector: 'app-vehicles-list',
    templateUrl: 'vehicles-list.component.html',
    styleUrls: ['vehicles-list.component.css']
})

export class VehiclesListComponent implements OnInit {
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    filter: any = {};

    constructor(private vehicleService: VehicleService) {

    }

    ngOnInit() {
        this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
         
        this.vehicleService.getAllVehicles()
            .subscribe(x => this.vehicles = x);
    }

    onFilterChange() {
        
    }
}
