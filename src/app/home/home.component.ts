import { Component, OnInit } from '@angular/core';
import {FormsModule,NgForm} from '@angular/forms';
import {Http,Response,Headers} from '@angular/http';
import {Router} from '@angular/router';
import {AssetsService} from '../assets.service'
import {CommonModule} from '@angular/common';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sbuvalue:number;
  clustervalue:number;
  public customervalue:number=0;
  public componentvalue:string="";
  public componentId:number;
  hcvalue:number;
  count:boolean;
  annualchange;
  public thisMonth:string;
  public errorMsg:string;
  //public Tcount:number;Acount:number=0;Pcount:number=0;

  public detailsObj={};
  public sbusDBData:any=[];
  public clustersDBData:any=[];
  public customersDBData:any=[];
  public componentsDBData:any=[];
  public monthsDBData:any=[];
  public monthsList:any=[];
  public bandsDBData:any=[];
  public annualreportsDBData:any=[];
  public arcsDBData:any=[];
  public attritionsDBData:any=[];
  public promotionsDBData:any=[];
  public aafdsDBData:any=[];
  public joiningpipesDBData:any=[];

  annualist:any=[];
  annualsbulist:any=[];
  annualclusterlist:any=[];
  annualcustomerlist:any=[];
  annualcomponentlist:any=[];
  public annualbandlist:any=[];
  public listClusterData:any=[];
  public listCustomerData:any=[];
  private headers=new Headers({'Content-Type':'application/json'});
  
  constructor(private assetservice:AssetsService,private http:Http,private router:Router) { }

  ngOnInit(): void {
    this.getAllSbus();
    this.getAllClusters();
    this.getAllCustomers();
    this.getAllComponents();
    this.getAllMonths();
    this.getAllBands();
    this.getAllAnnualReports();
    this.getAllARCs();
    this.getAllAttritions();
    this.getAllPromotions();
    this.getAllAAFDs();
    this.getAllJoiningPipes();
    this.totalAnnual();
  }
  
  ngDoCheck() 
  {
    this.totalAnnual();
  }
  
  getAllSbus()
  {
    this.assetservice.getSbus().subscribe((data)=>{
      this.sbusDBData=data[0];
      },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllClusters()
  {
    this.assetservice.getClusters().subscribe((data)=>{
      this.clustersDBData=data[0];
      },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllCustomers()
  {
    this.assetservice.getCustomers().subscribe((data)=>{
      this.customersDBData=data[0];
      },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllComponents()
  {
    this.assetservice.getComponents().subscribe((data)=>{
      this.componentsDBData=data[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllMonths()
  {
    this.assetservice.getMonths().subscribe((data)=>{
      this.monthsDBData=data[0];
      // this.Tcount=this.monthsDBData.length;
      // console.log("T-Count",this.Tcount);
      for(var i=1,x=0;i<this.monthsDBData.length;i++)
      {
        this.monthsList[x]=this.monthsDBData[i];
        x++;
      }
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllBands()
  {
    this.assetservice.getBands().subscribe((data)=>{
      this.bandsDBData=data[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllAnnualReports()
  {
    this.assetservice.getAnnualReports().subscribe((data)=>{
      this.annualreportsDBData=data[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllARCs()
  {
    this.assetservice.getARCs().subscribe((data)=>{
      this.arcsDBData=data[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllAttritions()
  {
    this.assetservice.getAttritions().subscribe((data)=>{
      this.attritionsDBData=data[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllPromotions()
  {
    this.assetservice.getPromotions().subscribe((data)=>{
      this.promotionsDBData=data[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllAAFDs()
  {
    this.assetservice.getAAFDs().subscribe((data)=>{
      this.aafdsDBData=data[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }
  getAllJoiningPipes()
  {
    this.assetservice.getJoiningPipes().subscribe((data)=>{
      this.joiningpipesDBData=data[0];
    },error=>this.errorMsg=this.errorMsg+error)
  }

  totalAnnual() 
  {
    this.annualchange=0;
    for (var i = 0; i < this.monthsDBData.length; i++)
    {
      this.monthsDBData[i].arc = 0;
      this.monthsDBData[i].hcProjected = 0;
    }
    var month= ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var now = new Date();
    var i: number;
    this.thisMonth = month[now.getMonth()].toUpperCase();
    for (i = 0; i < this.monthsDBData.length; i++)
    {
      if (this.monthsDBData[i].monthname.substr(0, 3) != this.thisMonth.substr(0, 3))
      {
        this.monthsDBData[i].arcStatus = "Actual";
        //this.Acount++;
      }
      else 
      {
        break;
      }
    }
    // console.log("A-Count",this.Acount);
    for (var j = i; j < this.monthsDBData.length; j++) 
    {
      this.monthsDBData[j].arcStatus = "Projected";
      //this.Pcount++;
    }
    // console.log("P-Count",this.Pcount);
    for(var i=0;i<this.monthsDBData.length;i++)
    {
      var hcProjected=0;
      if (this.annualreportsDBData.length != 0)
      {
        for (var j = 0; j < this.annualreportsDBData.length; j++)
        {
          if (this.monthsDBData[i].id === this.annualreportsDBData[j].monthid)
          {
            this.monthsDBData[i].hcProjected = this.monthsDBData[i].hcProjected + this.annualreportsDBData[j].HC;
            for(var k=i+1;k<this.monthsDBData.length;k++)
            {
              hcProjected=this.monthsDBData[i].hcProjected;
              this.monthsDBData[k].hcProjected=this.monthsDBData[i].hcProjected;
            }
          }
        }
      }
      this.annualchange=((this.monthsDBData[this.monthsDBData.length-1].hcProjected)-this.monthsDBData[0].hcProjected)/this.monthsDBData[0].hcProjected;
    }
    //Total Arc Values Printing
    for(var i=0,q=0;i<this.monthsDBData.length;i++)
    {
      for(var j=0;j<this.customersDBData.length;j++)
      {
        for(var k=0;k<this.bandsDBData.length;k++)
        {
          for(var p=0;p<this.annualreportsDBData.length;p++)
          {
            if(this.annualreportsDBData[p].customerid===this.customersDBData[j].id && this.annualreportsDBData[p].bandid===this.bandsDBData[k].id && this.annualreportsDBData[p].monthid===this.monthsDBData[i].id) 
            {
              let sum=0;
              for(var q=0;q<this.arcsDBData.length;q++)
              {
                if(this.arcsDBData[q].customerid===this.customersDBData[j].id)
                {
                  sum=sum+this.arcsDBData[q].arcValue;
                }
              }
              for(q=0;q<this.arcsDBData.length;q++)
              {
                if(this.arcsDBData[q].customerid===this.customersDBData[j].id && this.arcsDBData[q].bandid===this.bandsDBData[k].id)
                {
                  this.monthsDBData[i].arc=this.monthsDBData[i].arc+(sum+(this.annualreportsDBData[p].HC*this.arcsDBData[q].arcValue));
                }
                for(var z=i+1;z<this.monthsDBData.length;z++)
                {
                  this.monthsDBData[z].arc=this.monthsDBData[z-1].arc;
                }
              }
            }
            var target =this.monthsDBData[0].arc;
            target = target * 95 / 100;
            this.monthsDBData[i].arcTarget = target.toFixed();
            this.monthsDBData[0].arcTarget="";
          }
        }
      }
    }
  }

  mysbu(event)
  {
    //try{
    if(event.target.value!="ALL")
    {
      this.sbuvalue=parseInt(event.target.value);
      console.log("select sbu value",this.sbuvalue);
      this.listClusterData=[];
      const clusterFilter = this.clustersDBData.filter((list) => list.sbuid === this.sbuvalue);
      this.listClusterData = clusterFilter;
      console.log("list cluster data",this.listClusterData);
      this.annualist=[];
      this.assetservice.getAnnualReports().subscribe((data)=>{
      this.annualreportsDBData=data[0];
      for(var i=0,x=0;i<this.customersDBData.length;i++){
        for(var j=0;j<this.listClusterData.length;j++){
          if(this.customersDBData[i].clusterid===this.listClusterData[j].id){
            for(var k=0;k<this.annualreportsDBData.length;k++){
              if(this.annualreportsDBData[k].customerid===this.customersDBData[i].id){
                this.annualist[x]=this.annualreportsDBData[k];
                x++;
              }}}}}
      console.log("annual list in sbu",this.annualist);
      this.annualreportsDBData=this.annualist;
      this.annualsbulist=this.annualist;
    })
      this.totalAnnual();
    }
  else
  {
    this.getAllAnnualReports();
    this.assetservice.getClusters().subscribe((data)=>{
      this.listClusterData=data;
    })
  }
  // }
  // catch(e)
  // {
  //   return throwError('My Error:-'+this.errorMsg);
  // }
}
  mycluster(event)
  {
    if(event.target.value!="ALL")
    {
      this.clustervalue=parseInt(event.target.value);
      console.log("select cluster value",this.clustervalue);
      this.listCustomerData=[];
      this.annualreportsDBData=this.annualsbulist;
      //console.log("annual reports in cluster",this.annualreportsDBData);
      // this.assetservice.getCustomers().subscribe((data)=>{
      //   this.customersDBData=data;
      const customerFilter = this.customersDBData.filter((list) => list.clusterid === this.clustervalue);
      this.listCustomerData = customerFilter;
      console.log("list customer Data",this.listCustomerData);
        
        this.annualist=[];
        for(var i=0,k=0;i<this.annualreportsDBData.length;i++)
        {
          for(var j=0;j<this.listCustomerData.length;j++)
          {
            if(this.annualreportsDBData[i].customerid===this.listCustomerData[j].id)
            {
              this.annualist[k]=this.annualreportsDBData[i];
              k++;
            }
          }
        }
        console.log("annual list in cluster",this.annualist);
        this.annualreportsDBData=this.annualist;
        this.totalAnnual();
        this.annualclusterlist=this.annualist;
      //})
     }
    else
    {
      this.annualreportsDBData=this.annualsbulist;
      this.totalAnnual();
      this.assetservice.getCustomers().subscribe((data)=>{
        this.listCustomerData=data;
      })
    }
  }
  mycustomer(event)
  {
    if(event.target.value!="ALL")
    {
      this.customervalue=parseInt(event.target.value);
      console.log("selected customer ",this.customervalue);
      this.annualist=[];
      this.annualreportsDBData=this.annualclusterlist;
      for(var i=0,j=0;i<this.annualreportsDBData.length;i++)
      {
          if(this.annualreportsDBData[i].customerid===this.customervalue)
          {
            this.annualist[j]=this.annualreportsDBData[i];
            j++;
          }
      }
      console.log("annual list in customer",this.annualist);  
      this.annualreportsDBData=this.annualist;
      this.totalAnnual();
      this.annualcustomerlist=this.annualist;
      
    }
    else
    {
      this.annualreportsDBData=this.annualclusterlist;
      this.totalAnnual();
    }
  }
  mycomponent(event){
    this.annualist=[];
    this.componentvalue=event.target.value;
    console.log("component value",this.componentvalue);
    // this.assetservice.getComponents().subscribe((data)=>{
    //   this.componentsDBData=data;
      for(var i=0;i<this.componentsDBData.length;i++)
      {
        if(this.componentvalue===this.componentsDBData[i].componentName)
        {
          this.componentId=this.componentsDBData[i].id;
          break;
        }
      }
      console.log("component Id:",this.componentId);
    //})
    if(event.target.value!="ALL")
    {
      this.annualreportsDBData=this.annualcustomerlist;
      console.log("annual reports in component",this.annualreportsDBData);
      for(var i=0,j=0;i<this.annualreportsDBData.length;i++)
      {
        if((this.annualreportsDBData[i].customerid===this.customervalue) && (this.annualreportsDBData[i].componentid===this.componentId))
        {
          this.annualist[j]=this.annualreportsDBData[i];
          j++;
        }
      }
      console.log("annual list in component",this.annualist);
      this.annualreportsDBData=this.annualist;
      this.totalAnnual();
      this.annualcomponentlist=this.annualist;
    }
    else
    {
      this.annualreportsDBData=this.annualcustomerlist;
      this.annualist=this.annualreportsDBData;
      this.totalAnnual();
      this.annualcomponentlist=this.annualist;
      console.log("annual component list in mycomponent()",this.annualcomponentlist);
    }
    //To print hc values in arc Projected months which are actual
    for(var i=0,x=0;i<this.bandsDBData.length;i++)
    {
      for(var j=0;j<this.monthsDBData.length;j++)
      {
        var sum=0;
        if(this.monthsDBData[j].arcStatus==="Actual")
        {
          for(var k=0;k<this.annualcomponentlist.length;k++)
          {
            if(this.annualcomponentlist[k].bandid===this.bandsDBData[i].id && this.annualcomponentlist[k].monthid===this.monthsDBData[j].id)
            {
              this.annualbandlist[x]=this.annualcomponentlist[k];
              sum=sum+this.annualcomponentlist[k].HC;
              this.annualbandlist[x].HC=sum;
            }
          }
          if(sum!=0)
          {
            x++;
          }
        }
      }
    }
    if(this.annualist.length==0)
    {
      alert("No Record Found!!");
    }
  }

  myText(form)
  {
    var array:any=[];
    var flag=false;
    var bandmonth,flag1;
    if(this.customervalue!=0 && this.componentvalue!="ALL")
    {
      for(var i=0,j=0;i<form._directives.length;i++)
      {
        if(form._directives[i].viewModel != "")
        {
          flag=true;
          bandmonth=form._directives[i].name;
          var bmvalue=form._directives[i].viewModel;
          var band,month;
          var bandlength=6;
          // for(var i=0;i<this.bandsDBData.length;i++)
          // {
          //   var id=this.bandsDBData[i].id;
          //   var bandlength=id.toString().length;
          //   if(bandmonth.substr(0,bandlength)===id.toString())
          //   {
          //     band=bandmonth.substr(0,bandlength);
          //     month=bandmonth.substr(bandlength,bandmonth.length);
          //   }
          // }

          band=bandmonth.substr(0,bandlength);
          month=bandmonth.substr(bandlength,bandmonth.length);
         if(bmvalue.includes(".") === true || isNaN(parseInt(bmvalue)))
          {
            flag1 = "invalid";
            alert("invalid input, Input must only contain integer values");
          }
          else
          {
            let id = 0;
            for(let i = 0; i < this.annualcomponentlist.length; i++){
              if(this.annualreportsDBData[i].sbuid == this.sbuvalue && this.annualreportsDBData[i].clusterid == this.clustervalue && this.annualreportsDBData[i].customerid == this.customervalue && this.annualreportsDBData[i].componentid == this.componentId && this.annualreportsDBData[i].bandid == parseInt(band) && this.annualreportsDBData[i].monthid == parseInt(month)) {
                id = this.annualreportsDBData[i].id;
                break;
              }
            }
            console.log("get id",id);
            this.detailsObj=
            {
              "id":id,
              "sbuid":this.sbuvalue,
              "clusterid":this.clustervalue,
              "customerid":this.customervalue,
              "bandid":parseInt(band),
              "monthid":parseInt(month),
              "HC":parseInt(bmvalue),
              "componentid":this.componentId
            }
            flag1="valid"
            this.http.post("http://localhost:3000/annualreportpost",this.detailsObj).subscribe(
              (res:Response)=>{
              console.log("posted response",res);
              array=res.json();
              console.log("array",array);
              let array1=array[0];
              console.log("array1",array1)
              var sid=array1[0].id;
              const url=`${"http://localhost:3000/annualreport"}/${sid}`;
              this.http.get(url).subscribe((res:Response)=>{
              console.log("res",res);
              array=res.json();
              console.log("array",array);
              let array1=array[0];
              console.log("annual component list after posting a record",this.annualcomponentlist);
              let status;
              for(let i = 0; i < this.annualcomponentlist.length; i++) {
                if(this.annualcomponentlist[i].id === array1[0].id) {
                  this.annualcomponentlist[i] = array1[0];
                  status = "updated";
                }
              }
             if(status != "updated"){
              this.annualcomponentlist.push(array1.pop());
              }
              })
            })
          }
        }
      }
      this.annualreportsDBData=this.annualcomponentlist;
      this.totalAnnual();
      if(flag==false)
      {
        alert("invalid form");
      }
      if(flag==true && flag1=="valid")
      {
        alert("updated successfully");
      }
    }
    else
    {
      alert("Choose valid Customer & valid Component");
    }
  } 
  getAllInputs(rowName,colName)
  {
    let total=0;
    const AllInputs=this.annualreportsDBData.filter((list)=>list.monthid===colName  && list.bandid===rowName)
    AllInputs.map((list)=> total = total + list.HC);
    //if(total!=0)
      return total;
  }
  getInputColumnTotal(colName) 
  {
    let total = 0;
    const InputsTotal = this.annualreportsDBData.filter((list) => list.monthid === colName);
    InputsTotal.map((list) => total = total + list.HC);
    return total;
  }
  getPercentage(rowName,colName,hc) {
    let sum = 0,value=0;
    const percentageFilter = this.annualreportsDBData.filter((list) => list.bandid === rowName && list.monthid === colName);
    percentageFilter.map((list) => sum = sum + list.HC);
    value = (sum / hc)*100;
    return value;
  }
  getAttritionIndividualSum(rowName,colName)
  {
    let total=0;
    const AttritionIndividualFilter=this.attritionsDBData.filter((list)=>list.monthid===colName && list.customerid===this.customervalue && list.bandid===rowName)
    AttritionIndividualFilter.map((list)=> total = total + list.hc);
    if(total!=0)
      return total;
  }
  getAttritionTotal(colName)
  {
    let total=0;
    const AttritionMonthTotalFilter=this.attritionsDBData.filter((list)=>list.monthid===colName && list.customerid===this.customervalue)
    AttritionMonthTotalFilter.map((list)=> total = total + list.hc);
    return total;
  }
  getPromotionIndividualSum(rowName,colName)
  {
    let total=0;
    const PromotionIndividualFilter=this.promotionsDBData.filter((list)=>list.monthid===colName && list.customerid===this.customervalue && list.bandid===rowName)
    PromotionIndividualFilter.map((list)=> total = total + list.hc);
    if(total!=0)
      return total;
  }
  getPromotionTotal(colName)
  {
    let total=0;
    const PromotionMonthTotalFilter=this.promotionsDBData.filter((list)=>list.monthid===colName && list.customerid===this.customervalue)
    PromotionMonthTotalFilter.map((list)=> total = total + list.hc);
    return total;
  }
  getAafdIndividualSum(rowName,colName)
  {
    let total=0;
    const AafdIndividualFilter=this.aafdsDBData.filter((list)=>list.monthid===colName && list.customerid===this.customervalue && list.bandid===rowName)
    AafdIndividualFilter.map((list)=> total = total + list.hc);
    if(total!=0)
      return total;
  }
  getAafdTotal(colName)
  {
    let total=0;
    const AafdMonthTotalFilter=this.aafdsDBData.filter((list)=>list.monthid===colName && list.customerid===this.customervalue)
    AafdMonthTotalFilter.map((list)=> total = total + list.hc);
    return total;
  }
  getJoiningPipeIndividualSum(rowName,colName)
  {
    let total=0;
    const JoiningPipeIndividualFilter=this.joiningpipesDBData.filter((list)=>list.monthid===colName && list.customerid===this.customervalue && list.bandid===rowName)
    JoiningPipeIndividualFilter.map((list)=> total = total + list.hc);
    if(total!=0)
      return total;
  }
  getJoiningPipeTotal(colName)
  {
    let total=0;
    const JoiningPipeMonthTotalFilter=this.joiningpipesDBData.filter((list)=>list.monthid===colName && list.customerid===this.customervalue)
    JoiningPipeMonthTotalFilter.map((list)=> total = total + list.hc);
    return total;
  }
  revgrowth()
  {
    this.router.navigate(['/RevGrowth']);
  }
}
