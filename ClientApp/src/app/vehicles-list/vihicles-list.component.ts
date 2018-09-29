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
    allVehicles: Vehicle[];

    constructor(private vehicleService: VehicleService) {

    }

    ngOnInit() {
        this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
         
        this.vehicleService.getAllVehicles()
            .subscribe(x => this.vehicles = this.allVehicles = x);
    }

    onFilterChange() {
        var vehicles = this.allVehicles;

        if(this.filter.makeId)
            vehicles = vehicles.filter(v => v.makes.id == this.filter.makeId);
        
        if(this.filter.modelId)    
            vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);

        this.vehicles = vehicles;
    }

    resetFilter() {
        this.vehicles = this.allVehicles;
    }
}
