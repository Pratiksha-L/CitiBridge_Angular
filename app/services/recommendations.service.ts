import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {


  constructor(private http:HttpClient) { }
  serviceUrl = "" ;//Backend url
  getSector() 
  { 
     return this.http.get(this.serviceUrl + "/getSectors" ) ;
   
  } 

  getRecommendation(sector : string , dropdownOption : string)
  {
    return this.http.get(this.serviceUrl + "/getRecommendation/" + sector+"/" + dropdownOption ) ;
   
    // return this.http.get(this.serviceUrl + "/getRecommendation?sector=" + sector+"&parameter=" + dropdownOption ) ;
  }
}
