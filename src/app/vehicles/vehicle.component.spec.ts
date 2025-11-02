import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleComponent } from './vehicle.component';
import { VehiclesService } from './services/vehicles.service';
import { VehicleModel } from './models/vehicles.models';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('VehicleComponent', () => {
    let component: VehicleComponent;
    let fixture: ComponentFixture<VehicleComponent>;
    let vehiclesService: jasmine.SpyObj<VehiclesService>;

    const mockVehicles: VehicleModel[] = [
        new VehicleModel(1, 'Renault', 'Kangoo', 'Intens', '2017', 50000, 'Blanco', 'img1.png'),
        new VehicleModel(2, 'Chevrolet', 'Spark', 'GT', '2018', 30000, 'Rojo', 'img2.png'),
        new VehicleModel(3, 'Nissan', 'March', 'Advance', '2019', 20000, 'Azul', 'img3.png')
    ];

    beforeEach(async () => {
        const vehiclesServiceSpy = jasmine.createSpyObj('VehiclesService', ['getVehicles']);

        await TestBed.configureTestingModule({
            declarations: [VehicleComponent],
            providers: [
                { provide: VehiclesService, useValue: vehiclesServiceSpy }
            ]
        }).compileComponents();

        vehiclesService = TestBed.inject(VehiclesService) as jasmine.SpyObj<VehiclesService>;
        fixture = TestBed.createComponent(VehicleComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should create table with 3 vehicle rows plus header', () => {
        // Arrange: configurar el mock para retornar 3 vehículos
        vehiclesService.getVehicles.and.returnValue(of(mockVehicles));

        // Act: inicializar el componente y detectar cambios
        fixture.detectChanges();

        // Assert: verificar que la tabla se creó correctamente
        const tableElement: DebugElement = fixture.debugElement.query(By.css('table'));
        expect(tableElement).toBeTruthy();

        // Verificar el header (thead)
        const theadRows = tableElement.queryAll(By.css('thead tr'));
        expect(theadRows.length).toBe(1, 'Debe haber exactamente 1 fila en el thead');

        // Verificar las columnas del header
        const headerCells = theadRows[0].queryAll(By.css('th'));
        expect(headerCells.length).toBe(4, 'Debe haber 4 columnas en el header');
        expect(headerCells[0].nativeElement.textContent.trim()).toBe('#');
        expect(headerCells[1].nativeElement.textContent.trim()).toBe('Marca');
        expect(headerCells[2].nativeElement.textContent.trim()).toBe('Línea');
        expect(headerCells[3].nativeElement.textContent.trim()).toBe('Modelo');

        // Verificar el body (tbody) - debe tener 3 filas
        const tbodyRows = tableElement.queryAll(By.css('tbody tr'));
        expect(tbodyRows.length).toBe(3, 'Debe haber exactamente 3 filas en el tbody');

        // Verificar contenido de la primera fila
        const firstRowCells = tbodyRows[0].queryAll(By.css('th, td'));
        expect(firstRowCells.length).toBe(4);
        expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('1');
        expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Renault');
        expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('Kangoo');
        expect(firstRowCells[3].nativeElement.textContent.trim()).toBe('2017');

        // Verificar contenido de la segunda fila
        const secondRowCells = tbodyRows[1].queryAll(By.css('th, td'));
        expect(secondRowCells.length).toBe(4);
        expect(secondRowCells[0].nativeElement.textContent.trim()).toBe('2');
        expect(secondRowCells[1].nativeElement.textContent.trim()).toBe('Chevrolet');
        expect(secondRowCells[2].nativeElement.textContent.trim()).toBe('Spark');
        expect(secondRowCells[3].nativeElement.textContent.trim()).toBe('2018');

        // Verificar contenido de la tercera fila
        const thirdRowCells = tbodyRows[2].queryAll(By.css('th, td'));
        expect(thirdRowCells.length).toBe(4);
        expect(thirdRowCells[0].nativeElement.textContent.trim()).toBe('3');
        expect(thirdRowCells[1].nativeElement.textContent.trim()).toBe('Nissan');
        expect(thirdRowCells[2].nativeElement.textContent.trim()).toBe('March');
        expect(thirdRowCells[3].nativeElement.textContent.trim()).toBe('2019');
    });
});