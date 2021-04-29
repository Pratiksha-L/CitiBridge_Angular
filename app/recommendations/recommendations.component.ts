import {MessageService} from 'primeng/api'
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {RecommendationsService} from '../services/recommendations.service'
import { TableHeadings } from '../model/table-headings';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
  
})

export class RecommendationsComponent implements OnInit {

  tableHeadings : TableHeadings[] ;
  hasError: boolean = false;
  parameters: SelectItem[];
  sectorList: SelectItem[];
  selectedParameter :  string = "growth";
  selectedSector : string = "automobile";
  showTable : boolean = true;
  messageService: MessageService ;
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientFill;
  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;
  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels:Array<any>;
  public lineChartGradientsNumbersColors:Array<any>

  // events

  public recommendationClick($event: any):void
  {

    console.log("Get Recommendation Button is Clicked !" , $event) ;

    if (this.selectedSector.length == 0 || this.selectedParameter.length == 0) 
    {
      this.hasError = true;
      return;
    } 
    else 
    {
      this.hasError = false;
      //this.getRecommendation() ;
      //Show Recommendation Table for selected sector & parameter : Buy, Sell
    }
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  constructor(private recommendationService: RecommendationsService )
  
  { 
    this.sectorList = 
     [ 
       { label:"Automobile", value: "automobile"},
       { label:"Banking", value: "banking"},
       { label:"Cement", value: "cement"},
       { label:"Energy", value: "energy"},
       { label:"Information Technology", value: "informationTechnology"}   
    ],

    this.parameters = 
     [ 
       { label:"Growth", value: "growth"},
       { label:"Moving Average", value: "movingAverage"},
       { label:"Volatility", value: "volatility"},
       { label:"Momentum", value: "momentum"},
       { label:"Volume", value: "volume"}   
    ];

    
  }

  ngOnInit() :void
  {

    this.tableHeadings =
    [
      {
        companyName : "Bal Pharma",
        currentPrice : 334 ,
        bidPrice : 345,
        change : 5.6,
        marketCap : 54678 
      },
      
      {
        companyName : "Infosys",
        currentPrice : 45 ,
        bidPrice : 50,
        change : 7.6,
        marketCap : 245678 
      },

      {
        companyName : "Citi Bank",
        currentPrice : 234 ,
        bidPrice : 245,
        change : 10 ,
        marketCap : 467899
      },

      {
        companyName : "Schneider Electric",
        currentPrice : 456 ,
        bidPrice : 500,
        change : 8.6 ,
        marketCap : 3458495 
      },

      {
        companyName : "MasterCard",
        currentPrice : 89 ,
        bidPrice : 100,
        change : 9 ,
        marketCap : 89765 
      }
    ]
    
    //Sector
     this.recommendationService.getSector()
     .subscribe((result : string[]) =>{
      if(result == null )
      {
        this.messageService.add({severity : 'error', summary : 'Error',detail : 'Incorrect Sector'}) ;

      }

      else
      {
      result.forEach(sectorName  => {

         this.sectorList.push({label: sectorName, value : result[0]});
       }), (err: any) =>{
            this.messageService.add({severity: 'error', summary : 'Error',detail : 'Unable to fetch data, server down '  })
           }

      }

    }, err => {
      
    })
    
    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


    this.lineChartGradientsNumbersData = [
        {
          label: "Growth",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [150, 99, 86, 96, 123]
        }
      ];
    this.lineChartGradientsNumbersColors = [
     {
       backgroundColor: this.gradientFill,
       borderColor: "#2CA8FF",
       pointBorderColor: "#FFF",
       pointBackgroundColor: "#2CA8FF",
     }
   ];
    this.lineChartGradientsNumbersLabels = ["Bal Pharma", "TCS", "Infosys", "Walmart", "MasterCard"];
    this.lineChartGradientsNumbersOptions = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false
            },
            ticks: {
                stepSize: 20
            }
          }],
          xAxes: [{
            display: 0,
            ticks: {
              display: false
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }]
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 15,
            bottom: 15
          }
        }
      }

    this.lineChartGradientsNumbersType = 'bar';

  }
  // getRecommendation()
  // {
  //    this.recommendationService.getRecommendation(this.selectedSector, this.selectedParameter).subscribe((result : boolean) =>
  //   {
  //      if(result == null )
  //      {
  //        this.messageService.add({severity : 'error', summary : 'Error',detail : 'Incorrect Sector or Parameter'}) ;

  //      }
  //      else
  //      {
   
  //          this.showTable = true ;

  //       }), (err: any) =>{
  //            this.messageService.add({severity: 'error', summary : 'Error',detail : 'Unable to fetch data, server down '  })
  //           }

  //    }

    
     }
