import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/services/users.service';
import { AddUserComponent } from './add/add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  allUsersData: any[] = [];
  sortedData: any[] = [];

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  private subject$: BehaviorSubject<string> = new BehaviorSubject('');

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'name',
    'username',
    'address',
    'email',
    'phone',
    'website',
    'company',
    'options',
  ];

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      (response) => {
        this.allUsersData = response;
        this.dataSource = new MatTableDataSource(this.allUsersData);
        this.dataSource.sort = this.sort;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subject$.next(filterValue.trim().toLowerCase());
    const subscriber = this.subject$.pipe(debounceTime(1000)).subscribe(
      (v) => {
        this.dataSource.filter = filterValue;
      },
      (err) => console.error(err)
    );

    setTimeout(() => {
      subscriber.unsubscribe();
    }, 1001);
  }

  addNewUser() {
    this.dialog
      .open(AddUserComponent, {
        data: [],
      })
      .afterClosed()
      .subscribe((value) => {
        if (!value) return;
        this.ngOnInit();
      });
  }

  openPreviewUserDialog(id: number) {
    //TO DO
  }

  openEditUserDialog(id: number) {
    this.dialog
      .open(EditUserComponent, {
        data: this.allUsersData.filter((user) => user.id === id),
      })
      .afterClosed()
      .subscribe((value) => {
        if (!value) return;
      });
  }

  deleteUserById(id: number) {
    this.usersService.deleteUserInUsers(id.toString());
    // .subscribe(response => {
    //   // User Deleted!
    // }, (error: HttpErrorResponse) => {
    //   // User Delete Failed!
    //   console.log(error.error);
    // });
  }
}
