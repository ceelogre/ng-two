import { DataService } from 'src/app/provider/service/data.service';
import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.platform = Capacitor.getPlatform();
  }
}
