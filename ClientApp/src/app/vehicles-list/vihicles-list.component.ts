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
    private readonly PAGE_SIZE = 3;
    queryResult: any = {};
    makes: KeyValuePair[];
    filter: any = {
        pageSize: this.PAGE_SIZE
    };
    columns = [
        { title: "Id",},
        { title: "Contact Name", key: 'contactName', isSortable: true},
        { title: "Make", key: 'make', isSortable: true},
        { title: "Model", key: 'model', isSortable: true},
        { }
    ]

    constructor(private vehicleService: VehicleService) {

    }

    ngOnInit() {
        this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
         
        this.populateVehicles();
    }

    private populateVehicles() {
        this.vehicleService.getAllVehicles(this.filter)
            .subscribe(result => this.queryResult = result);
    }

    onFilterChange() {
        this.queryResult.page = 1;
        this.populateVehicles();
    }

    resetFilter() {
        this.filter = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };
        this.populateVehicles();
    }

    sortBy(columnName: string) {
        if(this.filter.sortBy === columnName){
            this.filter.isSortAscending = false;
            console.log(this.filter.isSortAscending);
        } else {
            this.filter.sortBy = columnName;
            this.filter.isSortAscending = true;
            console.log(this.filter.isSortAscending);
        }
        this.populateVehicles();
    }

    onPageChange(page) {
        this.filter.page = page;
        this.populateVehicles();
    }
}
