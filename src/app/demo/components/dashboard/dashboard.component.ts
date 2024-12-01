import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ContenedorService } from 'src/app/features/contenedor/data-access/contenedor.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(
        private productService: ProductService, 
        public layoutService: LayoutService,
        private contenedorService: ContenedorService
    ) {

    }

    ngOnInit() {

        this.contenedorService.obtenerInformacionDashboard().subscribe({
            next: (response: any) => {
                const data = response.data;
                const contenedoresPorHora = data.contenedoresPorHora;

                this.initChart(contenedoresPorHora);
            },
            error: (error) => {
                console.log(error);
            }
        })



        // this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];





    }

    initChart(contenedoresPorHora: any) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            labels: contenedoresPorHora.labels,
            datasets: [
                {
                    label: 'Total',
                    data: contenedoresPorHora.values,
                    fill: true,
                    backgroundColor: 'rgb(68, 136, 238, 0.25)', // Modifica el valor de opacidad aquí
                    borderColor: 'rgb(68, 136, 238, 0.5)', // Modifica el valor de opacidad aquí
                    tension: .4
                },
            ],
        };

        this.chartOptions = {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                fill: true
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
