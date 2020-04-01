import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Covid19Service } from 'src/app/services/covid19.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import * as HighCharts from 'highcharts';


@Component({
    selector: 'app-covid-details',
    templateUrl: './covid-details.page.html',
    styleUrls: ['./covid-details.page.scss'],
})
export class CovidDetailsPage implements OnInit {

    countrieSub: Subscription;
    historySub: Subscription;
    activateRouterSub: Subscription;

    history:any={};
    historyCategory:String[] = [];
    public historyCases:Number[] = [];
    historyDeaths:Number[] = [];
    historyRecovered:Number[] = [];
    casesChar:any[]=[];
    casesToday:any[]=[];
    cases:any[]=[];
    incrementosRecientes:any[]=[];

    countrie: any = {
        countryInfo:{
            flag:""
        }
    };

    constructor(
        private activateRouter:ActivatedRoute, 
        private covidService:Covid19Service,
        private alertController: AlertController,
        ) { }

    ionViewDidEnter() {
        //this.barChartPopulation();
        //this.historialChar();
        //this.pieChartBrowser();
    }

    historialChar(){
        //this.highcharts1 = HighCharts.chart('ddd',{});
        let chartOptions:any = {
            chart: {
                type: 'spline',
            },
            credits: {
                enabled: false
            },
            legend: {
                symbolWidth: 40
            },
        
            title: {
                text: 'Historia Covid-19'
            },
        
            yAxis: {
                title: {
                    text: ''
                }
            },
        
            xAxis: {
                /*title: {
                    text: 'Dates'
                },*/
                categories: this.historyCategory,
            },
        
            tooltip: {
                valueSuffix: '',
                split: true
            },
        
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    },
                    cursor: 'pointer'
                }
            },
        
            series: [
                {
                    name: 'Cases',
                    data: this.historyCases,
                }, {
                    name: 'Deaths',
                    data: this.historyDeaths,
                }, {
                    name: 'Recovered',
                    data: this.historyRecovered,
                }
            ],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 550
                    },
                    chartOptions: {
                        legend: {
                            itemWidth: 150
                        },
                        xAxis: {
                            categories: this.historyCategory
                        },
                        yAxis: {
                            title: {
                                enabled: true
                            },
                            labels: {
                                format: '{value}'
                            }
                        }
                    }
                }]
            }
        };

        HighCharts.chart('historialChar',chartOptions);
    }

    casesPieCharEvent() {
        let chartOptions:any={
            chart: {
                type: 'pie'
            },
            credits: {
              enabled: false
            },
            title: {
              text: `<strong>COVID-19 CASES</strong>`
            },
            tooltip: {
                pointFormat: '<span>Total</span>: <b>{point.y}</b><br/>',
            },
            accessibility: {
                point: {
                    valueSuffix: ''
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: <h1>{point.percentage:.2f}%</h1>'
                    }
                }
            },
            series: [{
                name: 'Coronavirus',
                colorByPoint: true,
                data: this.casesChar
            }]
        }
        HighCharts.chart('casesChart', chartOptions);
    }

    casesTodayEvent(){
        let chartOptions:any={
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: "Today's Cases"
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: ''
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: ''
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: 'Total: {point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
            },

            series: [{
                    name: "Coronavirus",
                    colorByPoint: true,
                    data: this.casesToday
                }
            ]
        }
        HighCharts.chart('casesToday', chartOptions);
    }

    casesEvent(){
        let chartOptions:any={
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: "COVID-19"
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                },
                point: {
                    valueSuffix: ''
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
            },

            series: [{
                    name: "Coronavirus",
                    colorByPoint: true,
                    data: this.cases
                }
            ]
        }
        HighCharts.chart('cases', chartOptions);
    }

    incrementosRecientesEvent(){
        let chartOptions:any={
            chart: {
                type: 'line'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Incrementos de Hoy'
            },
            xAxis: {
                categories: [
                    'Ayer',
                    'Hoy'
                ]
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                valueSuffix: '',
                split: true
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: this.incrementosRecientes
        };
        HighCharts.chart('incrementosRecientes', chartOptions);
        
    }

    ngOnInit() {
        this.activateRouterSub = this.activateRouter.paramMap.subscribe(paramMap => {
            // valida si llega el parametro
            const countrieName = paramMap.get('countrieName');
            // Obtener por pais
            this.countrieSub = this.covidService.getCountrie(countrieName)
            .subscribe(
                data => this.processDetailtEvent(data),
                error => this.stopDetailLoading(-1,error),
                () => this.stopDetailLoading(0,'onComplete')
            );
            // Obtener historia
            this.historySub = this.covidService.getHistory(countrieName).subscribe(
                data => this.processHistoryEvent(data),
                error => this.stopHistoryLoading(-1,error),
                () => this.stopHistoryLoading(0,'onComplete')
            );
        });
    }

    processDetailtEvent(data:any){
        this.countrie = data;
        localStorage.setItem('detail',JSON.stringify(this.countrie));
        // Casos para el porcentaje
        this.casesChar = [{
            name: 'Confirmed Cases',
            y: this.countrie.cases
        },{
            name: 'Deaths',
            y: this.countrie.deaths,
        },{
            name: 'Recovered Cases',
            y: this.countrie.recovered,
        },{
            name: 'Active Cases',
            y: this.countrie.active,
        },{
            name: 'Critical Cases',
            y: this.countrie.critical,
        }];
        // Casos Nuevos
        this.casesToday = [{
            name: 'Confirmed Cases',
            y: this.countrie.todayCases
        },{
            name: 'Deaths',
            y: this.countrie.todayDeaths,
        }];
        // Todos los casos
        this.cases = [{
            name: 'Confirmed Cases',
            y: this.countrie.cases
        },{
            name: 'Active Cases',
            y: this.countrie.active,
        },{
            name: 'Deaths',
            y: this.countrie.deaths,
        },{
            name: 'Recovered Cases',
            y: this.countrie.recovered,
        },{
            name: 'Critical Cases',
            y: this.countrie.critical,
        }];
        // Incrementos recientes
        this.incrementosRecientes.push(
            {
                name: 'Incremento del ' + parseFloat(String((this.countrie.todayCases/this.countrie.cases)*100)).toFixed(1) + '% en Casos confirmados',
                data: [(this.countrie.cases-this.countrie.todayCases), this.countrie.cases],
            }, {
                name: 'Incremento del ' + parseFloat(String((this.countrie.todayDeaths/this.countrie.deaths)*100)).toFixed(1) + '% en Muertes',
                data: [(this.countrie.deaths-this.countrie.todayDeaths), this.countrie.deaths],
            }
        );
        this.casesPieCharEvent();
        this.casesTodayEvent();
        this.casesEvent();
        this.incrementosRecientesEvent();
    }

    processHistoryEvent(data:any){
        this.history = data;
        localStorage.setItem('history',JSON.stringify(this.history));
        // Obtener los valores
        for(let key in this.history.timeline.cases){ 
            this.historyCategory.push(key);
            this.historyCases.push(this.history.timeline.cases[key]);
        }
        for(let key in this.history.timeline.deaths){ 
            this.historyDeaths.push(this.history.timeline.deaths[key]);
        }
        for(let key in this.history.timeline.recovered){ 
            this.historyRecovered.push(this.history.timeline.recovered[key]);
        }
        this.historialChar();
    }

    stopDetailLoading(code:Number,message:String){
        if(code === -1){
            this.presentAlertOffline();
            let caching = localStorage.getItem('detail');
            if(caching){
                this.processDetailtEvent(JSON.parse(caching));
            }
        }
    }

    stopHistoryLoading(code:Number,message:String){
        if(code === -1){
            // this.presentAlertOffline();
            let caching = localStorage.getItem('history');
            if(caching){
                this.processHistoryEvent(JSON.parse(caching));
            }
        }
    }

    async presentAlertOffline() {
        const alert = await this.alertController.create({
            header: 'Ups!',
            message: 'Necesita una conexión a internet para ver información actualizada',
            buttons: [{
                text:'Cancelar',
                role:'cancel',
                cssClass:'secondary',
                handler:(event)=>{
                    // this.router.navigate(['/autor']);
                }
            },{
                text:'Aceptar',
                handler:(event)=>{
                    // this.router.navigate(['/autor']);
                }
            }]
          });
        return await alert.present();
    }

    ngOnDestroy() {
        if (this.activateRouterSub) {
            this.activateRouterSub.unsubscribe();
        }
        if (this.countrieSub) {
            this.countrieSub.unsubscribe();
        }
        if (this.historySub) {
            this.historySub.unsubscribe();
        }
    }

}
