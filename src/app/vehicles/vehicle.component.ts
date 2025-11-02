import { Component, OnInit } from '@angular/core';
import { VehiclesService } from './services/vehicles.service';
import { VehicleModel } from './models/vehicles.models';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicle.component.html',
    standalone: false,
})
export class VehicleComponent implements OnInit {
    constructor(private vehiclesService: VehiclesService) {}
    error: unknown = null;
    vehicles: VehicleModel[] = [];
    ngOnInit(): void {
        this.getVehicles();
    }

    public getVehicles(){
        this.vehiclesService.getVehicles().subscribe({
            error: (error) => {
                console.error('Error fetching vehicles:', error);
            },
            next: (vehicles) => {
                this.vehicles = vehicles;
            }
        });
    }

    public getMarcasCount(): { marca: string, count: number }[] {
        const marcasMap = new Map<string, number>();
        
        this.vehicles.forEach(vehicle => {
            const count = marcasMap.get(vehicle.marca) || 0;
            marcasMap.set(vehicle.marca, count + 1);
        });

        return Array.from(marcasMap.entries()).map(([marca, count]) => ({
            marca,
            count
        }));
    }
}