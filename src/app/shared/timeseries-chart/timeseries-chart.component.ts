import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  SmoothieChart,
  TimeSeries,
  IChartOptions,
  IGridOptions,
  ITimeSeriesPresentationOptions,
  ILabelOptions
} from 'smoothie';

@Component({
  selector: 'timeseries-chart',
  template: '<canvas #chartRef width="800" height="150"></canvas>',
  styles: [`
    :host { display: block; }
    @media (min-width: 800px) { canvas { width: 800px; } }
    @media (min-width: 600px) { canvas { width: 500px; } }
    @media (min-width: 400px) { canvas { width: 300px; } }
  `]
})
export class TimeseriesChartComponent implements OnInit, OnChanges {

  @ViewChild('chartRef') chartRef;
  @Input() value: number;
  @Input() disabled: boolean;

  private graph;
  private data;

  private isRendered: boolean;

  constructor() {
    this.isRendered = false;
  }

  ngOnInit() {
    this.render();
  }

  ngOnChanges(records: SimpleChanges) {
    let currentValue = 0;
    if (this.data && (<any>records).value) {
      currentValue = (<any>records).value.currentValue;

      if( isNaN(currentValue) ) {
        currentValue = 0;
      }

      this.data.append(new Date().getTime(), currentValue);
    }

    if( (<any>records).disabled ) {
      if ( (<any>records).disabled.currentValue ) {
        this.graph.stop();
        this.data.clear();
      }
    }
  }

  render() {
    this.graph = new (<ExtendedWindow>window).SmoothieChart(<IChartOptions>{
      grid: <IGridOptions>{
        strokeStyle: 'rgba(250, 250, 250, 1)',
        fillStyle: 'rgba(250, 250, 250, 1)',
        lineWidth: 1,
        millisPerLine: 100,
        verticalSections: 10
      },
      labels: <ILabelOptions>{
        fillStyle:'rgba(250, 250, 250, 1)'
      },
      maxValue: 300,
      minValue: 0,
      horizontalLines:[{
        color: '#ffffff',
        lineWidth: 1,
        value: 0
      }, {
        color: '#880000',
        lineWidth: 1,
        value: 100
      }]
    });

    this.graph.streamTo(this.chartRef.nativeElement, 1000);
    this.data = new (<ExtendedWindow>window).TimeSeries();
    this.graph.addTimeSeries(this.data, <ITimeSeriesPresentationOptions>{
      resetBounds: false,
      strokeStyle:'rgba(64, 114, 213, 1)',
      fillStyle:'rgba(64, 114, 213, 0.5)',
      lineWidth: 1
    });
  }

}
