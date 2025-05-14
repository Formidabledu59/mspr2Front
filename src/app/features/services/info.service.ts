import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private apiUrl = 'https://mspr2backend.alwaysdata.net/info'; // Assure-toi que cette URL est correcte.

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les pays affectés par une pandémie
  getPaysParPandemie(idPandemie: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pays-par-pandemie/${idPandemie}`);
  }

  // Méthode pour obtenir les pandémies affectant un pays
  getPandemiesParPays(idPays: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pandemies-par-pays/${idPays}`);
  }

  // Méthode pour obtenir les données totales par pays pour une pandémie
  getTotalParPays(idPandemie: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/total-par-pays/${idPandemie}`);
  }

  // Méthode pour obtenir les données totales pour un pays et une pandémie spécifiques
  getTotalPaysEtPandemie(idPays: number, idPandemie: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/total-pays-pandemie/${idPays}/${idPandemie}`);
  }

  // Méthode pour obtenir les pays avec la contamination pour une pandémie donnée
  getPaysContaminationParPandemie(idPandemie: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pays-contamination/${idPandemie}`);
  }
}
