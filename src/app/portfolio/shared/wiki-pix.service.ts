import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
	headers: new HttpHeaders ({
		"x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
		"x-rapidapi-key": "67cbf39895mshca8e86a504857f4p1dec29jsnd77cd0aa81d7"
	})
};

@Injectable({
  providedIn: 'root'
})
export class WikiPixService {
  getPix(): Observable<any[]>{
    return this.http.get<any[]>('https://hargrimm-wikihow-v1.p.rapidapi.com/images?count=3',httpOptions)
  }
  constructor(private http:HttpClient) { }

}
