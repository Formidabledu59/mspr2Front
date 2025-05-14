import { Component, OnInit } from "@angular/core";
import { PaysService } from "../services/pays.service";
import { PandemieService } from "../services/pandemie.service";
import { InfoService } from "../services/info.service"; // Import de InfoService correctement
import { StatPandemieService } from "../services/stat-pandemie.service"; // Import de StatPandemieService
import * as Highcharts from "highcharts";
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular'; // Module Highcharts pour afficher les graphiques

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule], // Ajout du module Highcharts
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.css"],
})
export class StatsComponent implements OnInit {
  countries: any[] = [];
  pandemies: any[] = [];

  // Form selections
  tempSelectedCountry: number | null = null;
  tempSelectedPandemic: number | null = null;
  tempStartDate: string = "";
  tempEndDate: string = "";

  // Résultats
  totalCases = 0;
  totalDeaths = 0;
  totalRecoveries = 0;

  // Graphique
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag = false;
  chartVisible = false;

  constructor(
    private paysService: PaysService,
    private pandemieService: PandemieService,
    private infoService: InfoService, // Utilisation correcte de InfoService
    private statPandemieService: StatPandemieService, // Utilisation correcte de StatPandemieService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
    this.loadPandemies();

    // Initialiser les variables si nécessaire
    this.tempSelectedCountry = this.countries.length > 0 ? this.countries[0].id_pays : null;  // Premier pays de la liste
    this.tempSelectedPandemic = this.pandemies.length > 0 ? this.pandemies[0].id_pandemie : null;  // Première pandémie de la liste
    this.tempStartDate = "";
    this.tempEndDate = "";
  }

  loadCountries() {
    this.paysService.getAll().subscribe((data) => {
      this.countries = data;
    });
  }

  loadPandemies() {
    this.pandemieService.getAll().subscribe((data) => {
      this.pandemies = data;
    });
  }

  onCountryChange(event: any) {
    this.tempSelectedCountry = Number(event.target.value);
    console.log('Selected Country:', this.tempSelectedCountry); // Vérification
  }

  onPandemicChange(event: any) {
    this.tempSelectedPandemic = Number(event.target.value);
    console.log('Selected Pandemic:', this.tempSelectedPandemic); // Vérification
  }

  onStartDateChange(event: any) {
    this.tempStartDate = event.target.value;
    console.log('Start Date:', this.tempStartDate); // Vérification
  }

  onEndDateChange(event: any) {
    this.tempEndDate = event.target.value;
    console.log('End Date:', this.tempEndDate); // Vérification
  }

  handleOkClick() {
    console.log("Button clicked, processing...");

    // Log des valeurs avant la validation
    console.log("Country:", this.tempSelectedCountry);
    console.log("Pandemic:", this.tempSelectedPandemic);
    console.log("Start Date:", this.tempStartDate);
    console.log("End Date:", this.tempEndDate);

    if (
      this.tempSelectedCountry &&
      this.tempSelectedPandemic &&
      this.tempStartDate.trim() !== "" &&  // Vérification si la date de début est non vide
      this.tempEndDate.trim() !== ""      // Vérification si la date de fin est non vide
    ) {
      const requestBody = {
        countryId: this.tempSelectedCountry,
        typeId: this.tempSelectedPandemic,
        startDate: this.tempStartDate,
        endDate: this.tempEndDate
      };

      // Log du corps de la requête pour vérifier les données envoyées
      console.log("Request body for API call:", requestBody);

      // Utilisation de StatPandemieService pour obtenir les statistiques
      this.statPandemieService.getCustomStats(requestBody).subscribe((data) => {
        console.log("Data received from API:", data); // Log des données reçues de l'API

        if (data && data.length > 0) {
          const latestStats = data[0]; // Récupérer les résultats
          this.totalCases = latestStats.nouveaux_cas || 0;
          this.totalDeaths = latestStats.nouveaux_deces || 0;
          this.totalRecoveries = latestStats.nouveaux_gueris || 0;

          this.chartVisible = true;
          this.generateChart();
        } else {
          console.error("No data received from API");
        }
      }, error => {
        console.error("Error fetching data:", error); // Log d'erreur si la requête échoue
      });
    } else {
      console.log("Veuillez remplir tous les champs avant de soumettre.");
    }
  }

  generateChart() {
    this.chartOptions = {
      chart: {
        type: "column",
      },
      title: {
        text: "Statistiques des cas",
      },
      xAxis: {
        categories: ["Cas", "Décès", "Guérisons"],
      },
      yAxis: {
        title: {
          text: "Nombre",
        },
      },
      series: [
        {
          name: "Statistiques",
          type: "column",
          data: [this.totalCases, this.totalDeaths, this.totalRecoveries],
          colorByPoint: true,
        },
      ],
    };
    this.updateFlag = true;
  }
}
