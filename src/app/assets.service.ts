import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Months} from './Models/months';
import {AnnualReports} from './Models/annualreports';
//import { throwError } from 'rxjs';
//import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  sbus:string="http://localhost:3000/sbuTable";
  clusters:string="http://localhost:3000/clusterTable";
  customers:string="http://localhost:3000/customerTable";
  components:string="http://localhost:3000/componentTable";
  months:string="http://localhost:3000/monthTable";
  bands:string="http://localhost:3000/bandTable";
  annualreports:string="http://localhost:3000/annualreportTable";
  arcs:string="http://localhost:3000/arcTable";
  attritions:string="http://localhost:3000/attritionTable";
  promotions:string="http://localhost:3000/promotionTable";
  aafds:string="http://localhost:3000/aafdTable";
  joiningpipes:string="http://localhost:3000/jpTable";
  constructor(private httpclient:HttpClient) { }
  getSbus():Observable<any>
  {
    return this.httpclient.get<any>(this.sbus);
  }
  getClusters():Observable<any>
  {
    return this.httpclient.get(this.clusters);
  }
  getCustomers():Observable<any>
  {
    return this.httpclient.get(this.customers);
  }
  getComponents():Observable<any>
  {
    return this.httpclient.get(this.components);
  }
  getMonths():Observable<Months>
  {
    return this.httpclient.get<Months>(this.months);
  }
  getBands():Observable<any>
  {
    return this.httpclient.get(this.bands);
  }
  getAnnualReports():Observable<AnnualReports>
  {
    return this.httpclient.get<AnnualReports>(this.annualreports);
  }
  getARCs():Observable<any>
  {
    return this.httpclient.get(this.arcs);
  }
  getAttritions():Observable<any>
  {
    return this.httpclient.get(this.attritions);
  }
  getPromotions():Observable<any>
  {
    return this.httpclient.get(this.promotions);
  }
  getAAFDs():Observable<any>
  {
    return this.httpclient.get(this.aafds);
  }
  getJoiningPipes():Observable<any>
  {
    return this.httpclient.get(this.joiningpipes);
  }
}
