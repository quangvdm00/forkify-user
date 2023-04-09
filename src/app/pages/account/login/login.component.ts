import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FirebaseService} from "../../../shared/services/firebase.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;


    constructor(
        private formBuilder: FormBuilder,
        private firebaseAuthService: FirebaseService
    ) {
    }

    ngOnInit(): void {
        this.createLoginForm();
    }

    createLoginForm() {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: [''],
        });
    }

    onSignIn() {
        console.log(this.getSignInEmail);
        console.log(this.getSignInPassword);
        this.firebaseAuthService.signIn(this.getSignInEmail, this.getSignInPassword);
    }

    get getSignInEmail() {
        return this.loginForm.get('email').getRawValue();
    }

    get getSignInPassword() {
        return this.loginForm.get('password').getRawValue();
    }
}
