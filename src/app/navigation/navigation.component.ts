import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../_helpers/auth.guard';
import { AutheticationService } from '../_services/authetication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AutheticationService) {}

  ngOnInit(): void {
  }

}
