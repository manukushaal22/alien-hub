import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
      this.user = afAuth.authState;
    }

    authUser() {
      return this.user;
    }

    get currentUserId(): string {
      return this.authState !== null ? this.authState.uid : '';
    }

    login( username:string ) {
      let password = 'pwd';
      return this.afAuth.auth.signInWithEmailAndPassword( username , password)
        .then((user) => {
          this.authState = user;
          this.setUserStatus('online');
          this.router.navigate(['chat']);
        });
    }

    logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    }

    signUp( username : string, password: string) {
      //password = "pwd";
      return this.afAuth.auth.createUserWithEmailAndPassword( username , password)
              .then((user) => {
                this.authState = user;
                const status = 'online';
                this.setUserData( username , status);
              }).catch(error => console.log(error));
    }

    setUserData(displayName: string, status: string): void {
      const path = `users/${this.currentUserId}`;
      const data = {
        username: displayName,
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    setUserStatus(status: string): void {
      const path = `users/${this.currentUserId}`;

      const data = {
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }
}
