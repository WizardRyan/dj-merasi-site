import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {

  constructor() { }

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
    this.name = "";
    this.email = "";
    this.number = "";
    this.typeOfEvent = "";
    this.comments = "";
    this.methodOfContact = "";
  }
  
}
