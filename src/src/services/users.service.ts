import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(protected http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  //fake req
  updateUserData(userId: string, userData: any): Observable<any> {
    return this.http.patch(`https://jsonplaceholder.typicode.com/users${userId}`, userData);
  }

  //fake req
  addUserInUsers(userData: any): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/users', userData);
  }

   //fake req
   deleteUserInUsers(userId: string): Observable<any> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/users${userId}`);
  }
}
