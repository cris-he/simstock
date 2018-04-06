import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { AuthService } from '../../../auth/service/auth.service';
import { BackendService } from '../../service/backend.service';


import swal from 'sweetalert2';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  private cash;
  private stock;
  private stock_price;

  private good_date = false;
  private today_date;
  private day_date;
  private week_date;
  private month_date;
  private year_date;

  private search_str: string;
  private buy_str;

  private ready: boolean;
  private notfound: boolean;
  private canbuy: boolean;
  private cansell: boolean;

  private error_symbol: string;
  private error_msg: string;

  private user;
  private my_equity: any[];
  private user_ready = false;
  constructor(
    private _auth: AuthService,
    private _backend: BackendService,
    private _api: ApiService
  ) { }

  ngOnInit() {
    this.search_str = "";
    this.ready = false;
    this.notfound = false;
    this.canbuy = false;
    this.cansell = false;

    this._auth.is_authed().subscribe(__auth => {
      this.user = __auth;
      this.user_ready = true;
      this._backend.getEqt(__auth._id).subscribe(__data => {
        this.my_equity = __data;
        this._api.getStock("aapl", "1d").subscribe(__test => {
          if (__test.length == 0) {
            this.good_date = true;
          }
        })
      })
    })

  }

  ngAfterViewChecked() {

  }

  onSearchChange() {
    if (this.search_str == "") {
      this.ready = false;
    }
    this.notfound = false;
    this.buy_str = "";
  }

  onBuyChange() {
    // console.log(typeof this.buy_str);
    if (this.buy_str == "" || this.buy_str == null) {
      this.error_msg = "";
      this.canbuy = false;
      return;
    }
    if (isNaN(this.buy_str)) {
      this.error_msg = "Input is not a valid number";
      this.canbuy = false;
      return;
    }
    if (Number(this.buy_str) > this.cash) {
      this.error_msg = "You don't have enough money"
      this.canbuy = false;
      return;
    }
    if (this.good_date) {
      this.error_msg = "Market closed on Weekend or Holidays"
      this.canbuy = false;
      return;
    }
    this.canbuy = true;
  }

  buy_btn() {

    let new_item = {
      symbol: this.stock.symbol,
      worth: 0,
      invested: Number(this.buy_str),
      was: this.stock_price[this.stock_price.length - 1],
      earned: 0,
      amount: 0,
    }
    new_item.was == 0 ? new_item.amount = 0 : new_item.amount = new_item.invested / new_item.was;
    new_item.worth = Math.round((new_item.was * new_item.amount) * 100) / 100;

    this._backend.postEqt(this.user._id, new_item).subscribe(__data => {
      console.log("buy", __data);
      this.user.cash = __data.cash;
      this.my_equity = __data.own;
      swal(
        'Good job!',
        'Transaction completed',
        'success'
      )
    }, __err => {
      swal(
        'Error!',
        'Transaction incompleted',
        'error'
      )
    })

  }

  sell(item) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sell it!'
    }).then((result) => {
      if (result.value) {
        this._backend.patchEqt(this.user._id, item).subscribe(__success => {
          this.user.cash = __success.cash;
          this.my_equity = __success.own;
          swal(
            'Sold!',
            'Transaction completed.',
            'success'
          )
        }, __err => {
          console.log(__err);
        });


      }
    })
  }

  search_btn() {
    if (this.search_str.trim() == "") {
      this.ready = false;
      return;
    }
    console.log(this.search_str);

    this._api.getInfo(this.search_str).subscribe(_data => {
      this.stock = _data;
      this.notfound = false;
      this.ready = true;
    }, error => {
      this.notfound = true;
      this.ready = false;
      this.error_symbol = this.search_str;
    });

    this.today_date = new Date();

    this._api.getStock(this.search_str, "1d").subscribe(_data => {
      if (_data.length == 0) {
        this.good_date = true;
        this.day_date = "Market Closed";
      }
      let data = [];
      let label = [];
      if (_data[0] != null || _data[0] != undefined) {
        this.day_date = _data[0].date;
      }
      for (let i = 0; i < _data.length; i++) {
        let goback = i;
        while (_data[goback].average == 0)
          goback = goback - 1;
        data[i] = _data[goback].average;
        label[i] = _data[goback].label;
      }
      this.stock_price = data;
      this.render_chart(data, label, "dayChart");
    });

    this._api.getStock(this.search_str, "1m").subscribe(_data => {
      let data = [];
      let label = [];
      if (_data[0] != null || _data[0] != undefined) {
        this.month_date = _data[0].date.replace(/-/g, '') + " - ";
      }
      if (_data[_data.length - 1] != null || _data[_data.length - 1] != undefined) {
        this.month_date = this.month_date + _data[_data.length - 1].date.replace(/-/g, '');
      }
      for (let i = 0; i < _data.length; i++) {
        data[i] = _data[i].close;
        label[i] = _data[i].date;
      }
      this.render_chart(data, label, "monthChart");
    });

    this._api.getStock(this.search_str, "1y").subscribe(_data => {
      let data = [];
      let label = [];
      if (_data[0] != null || _data[0] != undefined) {
        this.year_date = _data[0].date.replace(/-/g, '') + " - ";
      }
      if (_data[_data.length - 1] != null || _data[_data.length - 1] != undefined) {
        this.year_date = this.year_date + _data[_data.length - 1].date.replace(/-/g, '');
      }
      for (let i = 0; i < _data.length; i++) {
        data[i] = _data[i].close;
        label[i] = _data[i].date;

      }
      this.render_chart(data, label, "yearChart");
    });

  }

  render_chart(_data, _label, _id) {
    console.log("render_chart:data", _data)
    console.log("render_chart:label", _label)
    var ctx = document.getElementById(_id);
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: _label,
        datasets: [{
          label: "hi",
          data: _data,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
          fill: false,
        }]
      },
      options: {
        legend: {
          display: false
        },
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

}
