import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    flag:String;
    country:String;

    constructor(
        private activateRouter:ActivatedRoute, 
        private covidService:Covid19Service,
        private alertController: AlertController
        ) {  }

    ionViewDidEnter() {
        //this.barChartPopulation();
        //this.historialChar();
        //this.pieChartBrowser();
    }

    historialChar(data:any,category:any){
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
                categories: category,
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
            series: data,
        };

        HighCharts.chart('historialChar',chartOptions);
    }

    casesPieCharEvent(data:any) {
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
                        format: '<b>{point.name}</b>: <h1>{point.percentage:.2f}%</h1>',
                        //distance:8
                    }
                }
            },
            series: [{
                name: 'Coronavirus',
                colorByPoint: true,
                data: data
            }]
        }
        HighCharts.chart('casesChart', chartOptions);
    }

    casesTodayEvent(data:any){
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
                    data: data
                }
            ]
        }
        HighCharts.chart('casesToday', chartOptions);
    }

    casesEvent(data:any){
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
                    data: data
                }
            ]
        }
        HighCharts.chart('cases', chartOptions);
    }

    incrementosRecientesEvent(data:any){
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
            series: data
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
                error => this.errorDetailLoading(-1,error),
                () => this.errorDetailLoading(0,'onComplete')
            );
            // Obtener historia
            this.historySub = this.covidService.getHistory(countrieName).subscribe(
                data => this.processHistoryEvent(data),
                error => this.errorHistoryLoading(-1,error),
                () => this.errorHistoryLoading(0,'onComplete')
            );
        });
    }

    processDetailtEvent(countrie:any){
        this.flag = countrie.countryInfo.flag;
        this.country = countrie.country;
        // Casos para el porcentaje
        let casesChar = [{
            name: 'Confirmed Cases',
            y: countrie.cases,
        },{
            name: 'Deaths',
            y: countrie.deaths,
        },{
            name: 'Recovered Cases',
            y: countrie.recovered,
        },{
            name: 'Active Cases',
            y: countrie.active,
        },{
            name: 'Critical Cases',
            y: countrie.critical,
        }];
        // Casos Nuevos
        let casesToday = [{
            name: 'Confirmed Cases',
            y: countrie.todayCases
        },{
            name: 'Deaths',
            y: countrie.todayDeaths,
        }];
        // Todos los casos
        let cases = [{
            name: 'Confirmed Cases',
            y: countrie.cases
        },{
            name: 'Active Cases',
            y: countrie.active,
        },{
            name: 'Deaths',
            y: countrie.deaths,
        },{
            name: 'Recovered Cases',
            y: countrie.recovered,
        },{
            name: 'Critical Cases',
            y: countrie.critical,
        }];
        // Incrementos recientes
        let incrementosRecientes = [
            {
                name: 'Incremento del ' + parseFloat(String((countrie.todayCases/countrie.cases)*100)).toFixed(1) + '% en Casos confirmados',
                data: [(countrie.cases-countrie.todayCases), countrie.cases],
            }, {
                name: 'Incremento del ' + parseFloat(String((countrie.todayDeaths/countrie.deaths)*100)).toFixed(1) + '% en Muertes',
                data: [(countrie.deaths-countrie.todayDeaths), countrie.deaths],
            }
        ];
        this.casesPieCharEvent(casesChar);
        this.casesTodayEvent(casesToday);
        this.casesEvent(cases);
        this.incrementosRecientesEvent(incrementosRecientes);
    }

    processHistoryEvent(history:any){
        // Obtener los valores
        let historyCategory:any=[];
        let historyCases:any=[];
        let historyDeaths:any=[];
        let historyRecovered:any=[];
        for(let key in history.timeline.cases){ 
            historyCategory.push(key);
            historyCases.push(history.timeline.cases[key]);
        }
        for(let key in history.timeline.deaths){ 
            historyDeaths.push(history.timeline.deaths[key]);
        }
        for(let key in history.timeline.recovered){ 
            historyRecovered.push(history.timeline.recovered[key]);
        }
        let historyData = [
            {
                name: 'Cases',
                data: historyCases,
            }, {
                name: 'Deaths',
                data: historyDeaths,
            }, {
                name: 'Recovered',
                data: historyRecovered,
            }
        ];

        // Mandar a graficar
        this.historialChar(historyData,historyCategory);
    }

    errorDetailLoading(code:Number,message:String){
        if(code === -1){
            //this.presentAlertOffline('');
            // message error
        }
    }

    errorHistoryLoading(code:Number,message: any){
        if(code === -1){
            // message error
            this.presentAlertOffline('Country not found or doesn\'t have any historical data');
        }
    }

    async presentAlertOffline(message:String) {
        const alert = await this.alertController.create({
            header: 'Ups!',
            message: message+'',
            // 'Necesita una conexión a internet para ver información actualizada'
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
