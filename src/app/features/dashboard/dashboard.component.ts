import { Component, OnInit } from '@angular/core';
import { PandemieService } from '../services/pandemie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pandemies: any[] = [];

  constructor(private pandemieService: PandemieService) {}

  ngOnInit(): void {
    this.pandemieService.getAll().subscribe({
      next: (data) => {
        this.pandemies = data;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des pandémies :", err);
      }
    });
  }
}
