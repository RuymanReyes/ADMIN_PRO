import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficos-dona',
  templateUrl: './graficos-dona.component.html',
  styles: []
})
export class GraficosDonaComponent implements OnInit {

  // Doughnut
  @Input() doughnutChartLabels = [];
  @Input() doughnutChartData = [];
  @Input() doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
