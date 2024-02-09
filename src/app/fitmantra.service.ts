import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FitmantraService {
   //localBaseUrl = 'https://fitmantraapi-production.up.railway.app';
 // localBaseUrl = 'https://fitmantra.onrender.com';
  //localBaseUrl = 'https://fitmantra-a3a5869d2287.herokuapp.com';
  signinUrl = '/api/v1/auth/login';
  signupUrl = '/api/v1/auth/signup';
  getUserByItsIdUrl = '/api/v1/users';
  localBaseUrl = 'http://localhost:8080';
  preferenceUrl = '/api/v1/preference';
  postDataSetUrl = '/api/v1/datasets';
  postOfPostURL = '/api/v1/posts';
  postDayWiseWorkoutUrl = '/api/v1/daywiseworkout'
  getDayWiseWorkoutUrlByUserIdURL = '/api/v1/daywiseworkout/author'
  private baseUrl = 'https://api.openai.com/v1/';
  private apiKey = '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'; // Replace with your actual API key

  private subject = new Subject<any>();
  baseURL = 'AIzaSyAAsZrOq_c_1Y5M-uwjqXLvAu49f1LTC38';
  token =
    '1071406071259-q27vnavo0daqimnjj61f6i35l7m4pfdg.apps.googleusercontent.com';

  private apiUrl = environment.apiKey;

  constructor(private http: HttpClient) {}

  signIn(data: any) {
    return this.http.post<any>(this.localBaseUrl + this.signinUrl, data);
  }

  signUp(data: any) {
    return this.http.post<any>(this.localBaseUrl + this.signupUrl, data);
  }

  getUserById(id: any) {
    return this.http.get<any>(
      this.localBaseUrl + this.getUserByItsIdUrl + '/' + id
    );
  }

  sendMessage(text: any) {
    this.subject.next(text);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  postDataSets(data: any) {
    return this.http.post<any>(this.localBaseUrl + this.postDataSetUrl, data);
  }

  getAllData() {
    return this.http.get<any>(this.localBaseUrl + this.postDataSetUrl);
  }

  postOfPost(data: any) {
    return this.http.post<any>(this.localBaseUrl + this.postOfPostURL, data);
  }

  getAllPosts() {
    return this.http.get<any>(this.localBaseUrl + this.postOfPostURL);
  }

  getDataSet(id: any) {
    return this.http.get<any>(
      this.localBaseUrl + this.postDataSetUrl + '/' + id
    );
  }

  generateText(prompt: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.apiKey}`)
      .set('Content-Type', 'application/json');

    const data = {
      prompt,
      // Add other parameters as needed
    };

    return this.http.post<any>(
      `${this.baseUrl}/engines/davinci/completions`,
      data,
      { headers }
    );
  }

  public sendMsg(message: string) {
    console.log(message);
    return this.http.post<any>(`${this.apiUrl}/chat`, { message });
  }

  putDataSets(id: any, data: any) {
    console.log(id, data);
    return this.http.put<any>(
      this.localBaseUrl + this.postDataSetUrl + '/' + id,
      data
    );
  }

  getUserPreferences(userId: string): Observable<any> {
    return this.http.get(`${this.localBaseUrl + this.preferenceUrl}/${userId}`);
  }

  saveUserPreferences(
    userId: string,
    checkboxValues: string[]
  ): Observable<any> {
    return this.http.post(`${this.localBaseUrl + this.preferenceUrl}/${userId}`, {
      checkboxValues,
    });
  }


  postDayWiseWorkout(data:any){
    console.log(data);
    return this.http.post<any>(this.localBaseUrl + this.postDayWiseWorkoutUrl, data);
  }


  getDataSetByUserID(id:any){
    console.log(id);
    return this.http.get<any>(
      this.localBaseUrl + this.getDayWiseWorkoutUrlByUserIdURL + '/' + id
    );

  }


  getDataSetByID(id:any){
    console.log(id);
    return this.http.get<any>(
      this.localBaseUrl + this.postDataSetUrl + '/' + id
    );
  }
}
