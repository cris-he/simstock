import { Component, OnInit } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { AuthService } from '../../auth/service/auth.service';


import * as Chart from 'chart.js';


declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public lineChartData: Array<any> = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Equity' },
    { data: [65, 59, 80, -81, 56, 55, 40], label: 'Earned' },
  ];

  public lineChartLabels: Array<any> = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  public lineChartType: string = 'line';

  public lineChartColors: Array<any> = [
    {
      backgroundColor: "rgba(26,179,148,0.5)",
      // borderColor: "rgba(26,179,148,0.7)",
      pointBackgroundColor: "rgba(26,179,148,1)",
      // pointBorderColor: "#fff",
    },
    {
      backgroundColor: "rgba(220,220,220,0.5)",
      // borderColor: "rgba(220,220,220,1)",
      pointBackgroundColor: "rgba(220,220,220,1)",
      // pointBorderColor: "#fff",
    }
  ];


  public yearChartData: Array<any> = [
    { data: [28, 48, 40, 19, 86, 27, 90], },
  ];
  public yearChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Seq', 'Oct', 'Nov', 'Dec'];
  public yearChartType: string = 'line';

  public yearChartColors: Array<any> = [
    {
      backgroundColor: "rgba(26,179,148,0.5)",
      // borderColor: "rgba(26,179,148,0.7)",
      pointBackgroundColor: "rgba(26,179,148,1)",
      // pointBorderColor: "#fff",
    },
    {
      backgroundColor: "rgba(220,220,220,0.5)",
      // borderColor: "rgba(220,220,220,1)",
      pointBackgroundColor: "rgba(220,220,220,1)",
      // pointBorderColor: "#fff",
    }
  ];


  private user;
  private date;
  private last_year;
  private last_year_empty = true;
  private ready = false;
  private good_date = false;
  private no_eqt = false;
  constructor(
    private _auth: AuthService,
    private _backend: BackendService
  ) { }

  ngOnInit() {
    this.date = new Date();
    this.last_year = this.date.getFullYear() - 1;
    // console.log(this.last_year)
    this._auth.is_authed().subscribe(__auth => {
      this._backend.getUser(__auth._id).subscribe(_user => {
        this.user = _user;
        this.ready = true;
        if (_user.own.length == 0) {
          this.no_eqt = true;
        }
        if (_user.eqt_data.length == 0) {
          this.good_date = true;
        }
        for (let i = 0; i < _user.lastyear.length && this.last_year_empty; i++) {
          if (_user.lastyear[i] != 0) {
            this.last_year_empty = false;
          }
        }
        this.day_chart(_user.labels, _user.eqt_data, _user.ern_data);
        if (!this.last_year_empty) {
          this.year_chart(_user.lastyear);
        }
      });
    })

  }

  day_chart(__label, __eqt, __ern) {
    var ctx = document.getElementById("dayChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: __label,
        datasets: [{
          label: 'Equity',
          data: __eqt,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Earned',
          data: __ern,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
          fill: false,
        }]
      },
      options: {
        elements: { point: { radius: 0 } },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  year_chart(__data) {
    var ctx = document.getElementById("yearChart");
    var myChart = new Chart(ctx, {
      type: 'bar',

      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Seq', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          data: __data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }


}


