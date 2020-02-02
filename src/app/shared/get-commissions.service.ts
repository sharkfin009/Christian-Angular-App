import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import {
  shareReplay
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetCommissionsService {
  private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/getCommissions/v1/please";
  commissions$: Observable < any >
    constructor(private http: HttpClient) {
      this.storeCommissions();
    }
  storeCommissions() {
    this.commissions$ = this.getCommissions();
  }
  getCommissions() {
    return this.http.get(this.apiUrl).pipe(
      shareReplay(1),
    );
  }
}
