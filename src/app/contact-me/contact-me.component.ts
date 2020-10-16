import { Component, OnInit } from '@angular/core';
import {MailService} from '../mail.service';
import {Email} from '../email';
import { MatSnackBar } from '@angular/material/snack-bar';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private mailService: MailService, private snackBar: MatSnackBar, private breakpointObserver : BreakpointObserver) { }

  ngOnInit(): void {
  }

  eventTypes: string[] = ["Party", "Wedding", "Dance", "Other (describe in comments)"];
  methodsOfContact: string[] = ["Call", "Text", "Email"];

  name: string;
  email: string;
  number: string;
  typeOfEvent: string;
  comments: string;
  methodOfContact: string;

  submit(): void{

    if(this.typeOfEvent){
      if (this.typeOfEvent.startsWith("Other")){
        this.typeOfEvent = "Other";
      }
    }
    let message: Email = {name: this.name, email: this.email, number: this.number, typeOfEvent: this.typeOfEvent, comments: this.comments, methodOfContact: this.methodOfContact};
    this.mailService.sendEmail(message).subscribe(data => {
      if(data.error){
        this.snackBar.open(`Failed to Send: ${data.error}`, '', {duration: 3000, panelClass: ['mat-toolbar', 'mat-warn']});
      }
      else{
        this.name = "";
        this.email = "";
        this.number = "";
        this.typeOfEvent = "";
        this.comments = "";
        this.methodOfContact = "";
        this.snackBar.open(`Request Sent!`, '', {duration: 3000, panelClass: ['mat-toolbar', 'mat-primary']});
      }
    }, 
    err => {
      this.snackBar.open(`Failed to Send: Could not connect to server`, '', {duration: 3000, panelClass: ['mat-toolbar', 'mat-warn']});
      console.log(err);
    });
  }
  
}
