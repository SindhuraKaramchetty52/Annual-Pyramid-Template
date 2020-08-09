import { Component, OnInit } from '@angular/core';
import {AssetsService} from '../assets.service';
import {Http,Response,Headers} from '@angular/http';
import {Router} from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-revgrowth',
  templateUrl: './revgrowth.component.html',
  styleUrls: ['./revgrowth.component.scss']
})
export class RevgrowthComponent implements OnInit {

  sbuvalue:number;
  clustervalue:number;
  customervalue:number;
  componentvalue:number;
  public detailsObj={};
  public sbusDBData:any=[];
  public clustersDBData:any=[];
  public customersDBData:any=[];
  public componentsDBData:any=[];
  public listClusterData:any=[];
  public listCustomerData:any=[];
  public errorMsg:string;
  //private headers=new Headers({'Content-Type':'application/json'});
  constructor(private assetservice:AssetsService,private http:Http,private router:Router) { }

  ngOnInit() {
    this.getAllSbus();
    this.getAllClusters();
    this.getAllCustomers();
    this.getAllComponents();
  }
  getAllSbus()
  {
    this.assetservice.getSbus().subscribe((data)=>{
      this.sbusDBData=data[0];
      //this.sbusDBData=this.sbusDBData[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllClusters()
  {
    this.assetservice.getClusters().subscribe((data)=>{
      this.clustersDBData=data[0];
      //this.clustersDBData=this.clustersDBData[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllCustomers()
  {
    this.assetservice.getCustomers().subscribe((data)=>{
      this.customersDBData=data;
      this.customersDBData=this.customersDBData[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllComponents()
  {
    this.assetservice.getComponents().subscribe((data)=>{
      this.componentsDBData=data;
      this.componentsDBData=this.componentsDBData[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  mysbu(event)
  {
    if(event.target.value!="ALL")
    {
      this.sbuvalue=parseInt(event.target.value);
      console.log("selected sbu ",this.sbuvalue);
      this.listClusterData=[];
      const clusterFilter = this.clustersDBData.filter((list) => list.sbuid === this.sbuvalue);
      this.listClusterData = clusterFilter;
      console.log("list cluster data",this.listClusterData);
    }
  }
  mycluster(event)
  {
    if(event.target.value!="ALL")
    {
      this.clustervalue=parseInt(event.target.value);
      console.log("selected cluster ",this.clustervalue);
      this.listCustomerData=[];
      const customerFilter = this.customersDBData.filter((list) => list.clusterid === this.clustervalue);
      this.listCustomerData = customerFilter;
      console.log("list customer Data",this.listCustomerData);
    }
  }
  mycustomer(event)
  {
    if(event.target.value!="ALL")
    {
      this.customervalue=parseInt(event.target.value);
      console.log("selected customer ",this.customervalue);
    }
  }
  mycomponent(event)
  {
    console.log(event.target.value);
    this.componentvalue=parseInt(event.target.value);
    console.log("component value",this.componentvalue);
  }
  onSubmit(form)
  {
    // if(form.controls.revgrowth.value!=0)
    // {
      // try
      // {
        console.log("rgrowth value",form.controls.revgrowth.value);
        var id=0,flag:boolean;
        this.detailsObj=
        {
          "id":id,
          "sbuid":this.sbuvalue,
          "clusterid":this.clustervalue,
          "customerid":this.customervalue,
          "componentid":this.componentvalue,
          "rgrowth":parseInt(form.controls.revgrowth.value)
        }
        this.http.post("http://localhost:3000/PostRGrowth",this.detailsObj).subscribe(
          (res:Response)=>{
            console.log("res",res);
        })
        flag=true;
        if(flag===true)
        {
          alert("posted successfully");
        }
      // }
      // catch(e)
      // {
      //   console.log(e);
      // }
    // }
    // else
    // {
    //   alert("Must enter revgrowth value");
    // }
  }
  replace()
  {
    this.router.navigate(['/Home']);
  }
}
