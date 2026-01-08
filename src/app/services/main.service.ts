import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  // apiURL = 'https://dummyjson.com/'
  // apiURL = 'http://localhost:3000/api/users/'
  loading = signal(false);
  apiKey = 'YOUR_GOOGLE_API_KEY';

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient) { }
  show() {
    this.loading.set(true);
  }

  hide() {
    this.loading.set(false);
  }
  async login(): Promise<any> {
    const data = { username: 'emilys', password: 'emilyspass' }
    return await firstValueFrom(
      this.http.post('https://dummyjson.com/auth/login', data)
    );
  }
  // async login(data: any): Promise<any> {

  //   return await firstValueFrom(
  //     this.http.post('http://localhost:3000/api/users/login', data)

  //   );
  // }
  // translateText(text: string | string[], targetLang: string) {
  //   return this.http.post('https://libretranslate.com/translate', {
  //     q: text,
  //     source: "auto",
  //     target: targetLang,
  //     format: "text"
  //   });
  // }

  // -------------not used------------
  // async register(data: any): Promise<any> {

  //   return await firstValueFrom(
  //     this.http.post(this.apiURL + 'register', data)
  //   );
  // }

  // async profile(data: any): Promise<any> {

  //   return await firstValueFrom(
  //     this.http.post(this.apiURL + 'profile', data)
  //   );
  // }
  // -------------------------
  // async students(): Promise<any> {

  //   return await firstValueFrom(
  //     this.http.get('http://localhost:3000/api/students/studentList')
  //   );
  // }
  // async studentbyfilter(data: any): Promise<any> {

  //   return await firstValueFrom(
  //     this.http.get('http://localhost:3000/api/students/studentList' + data)
  //   );
  // }
}
