import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {FirebaseService} from '../../../shared/services/firebase.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public registerForm: UntypedFormGroup;


    constructor(private formBuilder: UntypedFormBuilder, private firebaseAuthService: FirebaseService, ) {
    }

    ngOnInit(): void {
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.registerForm = this.formBuilder.group({
            email: [''],
            password: [''],
            confirmPassword: [''],
        });
    }

    onSignUp() {
        console.log(this.getSignUpEmail);
        console.log(this.getSignUpPassword);
        this.firebaseAuthService.signUp(this.getSignUpEmail, this.getSignUpPassword);


    }

    get getSignUpEmail() {
        return this.registerForm.get('email').getRawValue();
    }

    get getSignUpPassword() {
        return this.registerForm.get('password').getRawValue();
    }
}
