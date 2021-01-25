import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenDto } from '../../shared/_models/token-dto.model';
import { Observable } from 'rxjs';

const headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

/*
    This component only manages the OAuth2
 */

@Injectable({
    providedIn: 'root',
})
export class OauthService {
    /*
        TODO: url
     */
    oauthURL = 'http://localhost:8080/oauth/';

    constructor(private httpClient: HttpClient) {}

    public google(tokenDto: TokenDto): Observable<TokenDto> {
        return this.httpClient.post<TokenDto>(
            this.oauthURL + 'google',
            tokenDto,
            headers
        );
    }

    public facebook(tokenDto: TokenDto): Observable<TokenDto> {
        return this.httpClient.post<TokenDto>(
            this.oauthURL + 'facebook',
            tokenDto,
            headers
        );
    }
}
