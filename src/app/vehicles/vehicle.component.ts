import { Component, OnInit } from '@angular/core';
import { VehiclesService } from './services/vehicles.service';
import { VehicleModel } from './models/vehicles.models';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicle.component.html',
    standalone: true,
})
export class VehicleComponent implements OnInit {
    constructor(private vehiclesService: VehiclesService) {}
    error: unknown = null;
    vehicles: VehicleModel[] = [];
    ngOnInit(): void {
        this.getVehicles();
    }

    private getVehicles(){
        this.vehiclesService.getVehicles().subscribe({
            error: (error) => {
                console.error('Error fetching vehicles:', error);
            },
            next: (vehicles) => {
                this.vehicles = vehicles;
            }
        });
    }
}