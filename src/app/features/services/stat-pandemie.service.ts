import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatPandemieService {
  private baseUrl = 'https://mspr2backend.alwaysdata.net';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stat_pandemie`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/stat_pandemie/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/stat_pandemie`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/stat_pandemie/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/stat_pandemie/${id}`);
  }

  getCustomStats(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/statpandemie`, body);
  }
}
