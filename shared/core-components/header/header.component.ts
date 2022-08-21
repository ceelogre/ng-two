import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EStatePartial } from '../../../provider/enum/state-partial.enum';
import { IUser } from '../../../provider/model/user.model';
import { DataService, EStorageFields } from '../../../provider/service/data.service';
import { StateService } from '../../../provider/service/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService) { }

  ngOnInit(): void {
    this.setAuthUser();
  }

  get authUser(): IUser {
    return this.stateService.authUser.data;
  }

  get isLoading(): boolean {
    return this.stateService.authUser.isLoading;
  }

  get profilePicture(): string {
    return this.stateService.profilePicture;
  }

  get translations() {
    return this.dataService.translations
  }

  get selectedLanguage() {
    return this.dataService.getCurrentLanguage();
  }

  get languages() {
    return this.dataService.languages.filter(l => l.value !== this.selectedLanguage?.value)
  }

  // logout
  logout(): void {
    this.dataService.clearAll();
    this.stateService.clearAll();
    this.router.navigateByUrl('/auth');
  }

  // set auth
  setAuthUser(): void {
    if (!this.authUser) {
      const mutation = EStatePartial.AUTH_USER;
      const data = this.route.snapshot.data?.user?.data;
      this.stateService.setState(mutation, { isLoading: false, data });
    }
  }

  // set language
  setLanguage(e: any): void {
    this.dataService.localStorageSet(EStorageFields.LANGUAGE, e.value);
    window.location.reload();
  }

  // toggle side bar
  openSideBar(): void {
    this.dataService.toggleSideMenu(true);
  }

}
