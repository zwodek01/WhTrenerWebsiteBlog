import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.routeParam = this.route.snapshot.paramMap.get('id');
    this.getDetails(this.routeParam);
  }

  routeParam = '';
  user;
  activeTab = 'Wykresy';

  getDetails(uid) {
    this.firebaseService.afs
      .collection('users')
      .doc(uid)
      .valueChanges()
      .subscribe((details) => {
        this.user = details;
      });
  }

  changeTab($event) {
    this.activeTab = $event.target.id;
  }

  changeAccountStatus(status) {
    this.firebaseService.afs
      .collection('users')
      .doc(this.routeParam)
      .update({ premium: status });
  }

  statusAccount(): boolean {
    return this.user?.premium;
  }
}
