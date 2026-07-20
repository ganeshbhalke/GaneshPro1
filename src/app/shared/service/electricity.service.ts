import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IElectricity } from '../modules/electricity';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class ElectricityService {

private BASE_ECOM_URL = `${environment.baseUrl}/electricity.json`;
  constructor(
    
    private routur:Router,
    private http: HttpClient) {}

  getElectricity(): Observable<any> {
    return this.http.get(this.BASE_ECOM_URL);
  }



 getElectricityById(id:string){

 return this.http.get<IElectricity>(
 `${environment.baseUrl}/electricity/${id}.json`
 )

}

addElectricity(data: IElectricity) {

  return this.http.post(

    `${environment.baseUrl}/electricity.json`,

    data

  );

}

updateElectricity(id:string,data:IElectricity){

 return this.http.put(

 `${environment.baseUrl}/electricity/${id}.json`,

 data

 )

}

readMore(id: string) {
  this.routur.navigate(['/details', id]);
}

deleteElectricity(id:string){

 return this.http.delete(

 `${environment.baseUrl}/electricity/${id}.json`

 )

}

uploadDefaultData() {

  this.electricityData.forEach((item) => {

    this.http.post(
      `${environment.baseUrl}/electricity.json`,
      item
    ).subscribe({
      next: () => {
        console.log(item.title + ' Uploaded');
      },
      error: (err) => {
        console.log(err);
      }
    });

  });

}

electricityData :IElectricity[]= [

{
title:'Solar Panel',
image:'assets/images/solar.jpg.jpg',
description:'High-efficiency monocrystalline solar panel for residential and commercial installations.',
voltage:'24V DC',
power:'550W',
category:'Solar Panel'
},

{
title:'Electric Motor',
image:'\assets\images\electric-motor.jpg',
description:'Three-phase induction motor used in industrial machinery and pumping systems.',
voltage:'415V AC',
power:'7.5 HP',
category:'Electric Motor'
},

{
title:'Transformer',
image:'assets/images/transformer.jpg',
description:'Oil-cooled distribution transformer for commercial electrical networks.',
voltage:'11KV / 440V',
power:'100 KVA',
category:'Transformer'
},

{
title:'Battery',
image:'assets/images/battery.jpg',
description:'Deep-cycle battery designed for solar backup and UPS applications.',
voltage:'12V DC',
power:'150Ah',
category:'Battery'
},

{
title:'Power Cable',
image:'assets/images/power-cable.jpg',
description:'Heavy-duty copper insulated power cable for industrial electrical installations.',
voltage:'1.1 KV',
power:'240A',
category:'Power Cable'
},

{
title:'Generator',
image:'assets/images/generator.jpg',
description:'Diesel generator providing emergency backup power for industries.',
voltage:'415V AC',
power:'25 KVA',
category:'Generator'
},

{
title:'Circuit Breaker',
image:'assets/images/circuit-breaker.jpg',
description:'Automatic circuit breaker protecting electrical systems from overloads.',
voltage:'240V AC',
power:'63A',
category:'Circuit Breaker'
},

{
title:'Switch Gear',
image:'assets/images/switch-gear.jpg',
description:'Medium-voltage switchgear for safe electrical distribution and control.',
voltage:'11KV',
power:'630A',
category:'Switch Gear'
},

{
title:'Electrical Wire',
image:'assets/images/electrical-wire.jpg',
description:'Flexible copper electrical wire suitable for residential and industrial wiring.',
voltage:'230V AC',
power:'16A',
category:'Electrical Wire'
},

{
title:'Distribution Board',
image:'assets/images/distribution-board.jpg',
description:'Main electrical distribution board equipped with MCB protection.',
voltage:'415V AC',
power:'125A',
category:'Distribution Board'
},

{
title:'UPS',
image:'assets/images/ups.jpg',
description:'Online UPS system delivering uninterrupted power during outages.',
voltage:'230V AC',
power:'3 KVA',
category:'UPS'
},

{
title:'VFD',
image:'assets/images/vfd.jpg',
description:'Variable Frequency Drive used to control AC motor speed efficiently.',
voltage:'415V AC',
power:'15 KW',
category:'VFD'
},

{
title:'MCB',
image:'assets/images/mcb.jpg',
description:'Miniature Circuit Breaker providing overload and short-circuit protection.',
voltage:'240V AC',
power:'32A',
category:'MCB'
},


];


}
