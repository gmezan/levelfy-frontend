import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data-service.service';
import { User } from '../../shared/_models/user.model';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

const uri = '/auth';

const client_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjEsImVtYWlsIjoiY2xpZW50LmVtYWlsQGdtYWlsLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9teXVuaXZlcnNpdHljbGFzcy5zMy1zYS1lYXN0LTEuYW1hem9uYXdzLmNvbS9jb3Vyc2VzL3Rlc3QucG5nIiwidW5pdmVyc2l0eSI6IlBVQ1AiLCJiaXJ0aGRheSI6IjE5OTktMDgtMTQiLCJyb2xlIjp7ImlkUm9sZSI6MSwibmFtZSI6ImNsaWVudCJ9LCJmdWxsTmFtZSI6IkNsaWVudCBVc2VyIFRlc3QgIn0.XtYTQxaG4GuOGa8AlOMubh8IihVGk4jw_mj9CG45aNk";
const teach_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjIsImVtYWlsIjoidGVhY2guZW1haWxAZ21haWwuY29tIiwicGhvdG8iOiJodHRwczovL215dW5pdmVyc2l0eWNsYXNzLnMzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL2NvdXJzZXMvdGVzdC5wbmciLCJ1bml2ZXJzaXR5IjoiUFVDUCIsImJpcnRoZGF5IjoiMTk5OS0wOC0xNCIsInJvbGUiOnsiaWRSb2xlIjoyLCJuYW1lIjoidGVhY2gifSwiZnVsbE5hbWUiOiJUZWFjaCBVc2VyIFRlc3QgIn0.TPQ9KhglmLD_L0D9tWDmMRbOFeYW5ZJkHeC_03ZuIn8";
const mod_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjMsImVtYWlsIjoibW9kLmVtYWlsQGdtYWlsLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9teXVuaXZlcnNpdHljbGFzcy5zMy1zYS1lYXN0LTEuYW1hem9uYXdzLmNvbS9jb3Vyc2VzL3Rlc3QucG5nIiwidW5pdmVyc2l0eSI6IlBVQ1AiLCJiaXJ0aGRheSI6IjE5OTktMDgtMTQiLCJyb2xlIjp7ImlkUm9sZSI6MywibmFtZSI6Im1vZCJ9LCJmdWxsTmFtZSI6Ik1vZCBVc2VyIFRlc3QgIn0.Tqbh-dFV5Dw_xOJ6XRfI53WQcUzGDTWpdh0q3rVQX2A";
const admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjMsImVtYWlsIjoiYWRtaW4uZW1haWxAZ21haWwuY29tIiwicGhvdG8iOiJodHRwczovL215dW5pdmVyc2l0eWNsYXNzLnMzLXNhLWVhc3QtMS5hbWF6b25hd3MuY29tL2NvdXJzZXMvdGVzdC5wbmciLCJ1bml2ZXJzaXR5IjoiUFVDUCIsImJpcnRoZGF5IjoiMTk5OS0wOC0xNCIsInJvbGUiOnsiaWRSb2xlIjo0LCJuYW1lIjoiYWRtaW4ifSwiZnVsbE5hbWUiOiJBZG1pbiBVc2VyIFRlc3QgIn0.TBTUcPpOjpqlDEgtMXoQqgIU2_9mJH0-MB1xI0Tjf50"


@Injectable()
export class AuthService extends DataService<User> {
    authenticated = false;
    private _currentUser;

    constructor(http: HttpClient, private router: Router) {
        // AuthController
        super(uri, http);
    }

    login(credentials): boolean {
        let token = teach_token;
        if (token){
            localStorage.setItem('token', token);
            this._currentUser = jwt_decode(token);
            return true
        }
        else {
            return false;
        }
    }

    logout(): void {
        this._currentUser = null;
        localStorage.clear();
        this.router.navigate(['login']);
    }

    isLoggedIn(): boolean {
        return this.currentUser != null;
    }

    get currentUser() : any {
        let token = localStorage.getItem('token');
        if (!token) return null;
        this._currentUser = jwt_decode(token);
        return  this._currentUser

    }
}
