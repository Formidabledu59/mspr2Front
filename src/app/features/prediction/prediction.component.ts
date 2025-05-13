import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IaService } from '../services/ia.service';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prediction.component.html',
})
export class PredictionComponent {
  form: { [key: string]: number } = {
    nouveaux_cas: 0,
    nouveaux_deces: 0,
    nouveaux_gueris: 0,
    moyenne_3j_cas: 0,
    moyenne_3j_deces: 0,
    moyenne_3j_gueris: 0,
    croissance_cas: 0,
    ratio_gueris_cas: 0
  };

  updateValue(event: Event, key: string) {
    const input = event.target as HTMLInputElement;
    this.form[key] = +input.value;
  }

  result: string | null = null;

  constructor(private iaService: IaService) { }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  getMin(key: string): number {
  return key === 'croissance_cas' ? -1 : 0;
}

getMax(key: string): number {
  if (key.includes('deces')) return 100;
  if (key === 'ratio_gueris_cas') return 1;
  if (key === 'croissance_cas') return 1;
  return 1000;
}

getPercentage(value: number, key: string): number {
  const min = this.getMin(key);
  const max = this.getMax(key);
  return ((value - min) / (max - min)) * 100;
}


getStep(key: string): number {
  return ['ratio_gueris_cas', 'croissance_cas'].includes(key) ? 0.01 : 1;
}

  onSubmit() {
    this.iaService.predict(this.form).subscribe(res => {
      this.result = res.classe_predite;
    });
  }
}
