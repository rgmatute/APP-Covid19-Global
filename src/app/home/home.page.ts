import { Component } from '@angular/core';
import { Covid19Service } from '../services/covid19.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    verifyNetworSub:any=null;
    disconnectSubscription:any=null;
    connectSubscription:any=null;
    countriesSub: Subscription;
    countries:any[] = [];
    isSearch:Boolean=false;
    textoBuscar:String='';

    constructor(
        private covidService: Covid19Service,
        private loadingController: LoadingController,
        private statusBar: StatusBar,
        private platform: Platform,
        private splashScreen: SplashScreen,
        public network: Network,
        private alertController: AlertController,
        private router: Router) {
        // this.present();
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            if(this.platform.is('android')){
                this.statusBar.backgroundColorByHexString('#ffffff');
            }
            this.splashScreen.hide();
        });
    }

    ionViewWillEnter(){
        
    }

    searchEvent(event){
        if(event === null){
            this.isSearch =! this.isSearch;
            this.textoBuscar = '';
        }else{
            this.textoBuscar = event.detail.value;
        }
    }

    ngOnInit(): void {
        this.getAllCountries();
        this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            // Cuando se desconecta guardamos la la informacion en cache
            localStorage.setItem('countries',JSON.stringify(this.countries));
        });
        this.connectSubscription = this.network.onConnect().subscribe(() => {
            // Cuando se conecta actualizamos la cache guardamos la la informacion en cache
            console.log('conectado');
            this.getAllCountries();
        });
    }

    getAllCountries(){
        this.countriesSub = this.covidService.getAllCountries()
        .subscribe(
            data => this.cachingEasyEvent(data),
            error => this.stopLoading(-2,error),
            () => this.stopLoading(0,'onComplete')
        );
    }

    cachingEasyEvent(contries:any){
        this.countries = contries.sort((x,y)=>{ return x.cases - y.cases }).reverse();
        localStorage.setItem('countries',JSON.stringify(this.countries));
    }

    stopLoading(code:Number,message:String){
        // this.dismiss()
        if(code === -1){
            this.presentAlertOffline();
            let caching = localStorage.getItem('countries');
            if(caching){
                this.countries = JSON.parse(caching);
            }
        }
    }

    async present() {
        let loading = await this.loadingController.create({
            message: 'Cargando...',
        })
        return await loading.present();
    }

    async dismiss() {
        return await this.loadingController.dismiss();
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
        if (this.countriesSub) {
            this.countriesSub.unsubscribe();
        }
        if (this.connectSubscription) {
            this.connectSubscription.unsubscribe();
        }
        if (this.disconnectSubscription) {
            this.disconnectSubscription.unsubscribe();
        }
        if (this.verifyNetworSub) {
            this.verifyNetworSub.unsubscribe();
        }

        // localStorage.removeItem('countries');
    }

}
