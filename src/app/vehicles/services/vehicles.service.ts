import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleModel } from '../models/vehicles.models';
import { environment } from '../../../env/environment';

@Injectable({
    providedIn: 'root'
})
export class VehiclesService {
    private readonly http = inject(HttpClient);
    private apiUrl = `${environment.baseUrl}`;


    public getVehicles(): Observable<VehicleModel[]> {
        return this.http.get<VehicleModel[]>(this.apiUrl);
    }
}