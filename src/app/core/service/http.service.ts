import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthData } from '@feature/usuarios/shared/model/auth-data.model';

export interface Options {
  headers?: HttpHeaders;
}

@Injectable({ providedIn: 'root' })
export class HttpService {
  private API_ENDPOINT = environment.endpoint;

  private loginHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded', Authorization: environment.authorization
  });

  constructor(protected httpClient: HttpClient) { }

  private createDefaultOptions(): Options {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  loginRequest(authData: AuthData): Promise<any> {
    const loginPath = environment.token_path;
    const params = new URLSearchParams();
    params.set('grant_type', environment.grant_type);
    params.set('username', authData.login);
    params.set('password', authData.contrasena);
    return lastValueFrom(this.httpClient.post(`${this.API_ENDPOINT}/${loginPath}`, params.toString(), { headers: this.loginHeaders }));
  }

  postRequest<T, R>(path: string, data: T): Observable<R> {
    return this.httpClient.post<R>(
      `${this.API_ENDPOINT}/${path}`,
      data,
      this.createDefaultOptions()
    );
  }

  putRequest<T, R>(path: string, data: T): Observable<R> {
    return this.httpClient.put<R>(
      `${this.API_ENDPOINT}/${path}`,
      data,
      this.createDefaultOptions()
    );
  }

  getRequest<T>(path: string): Observable<T> {
    return this.httpClient.get<T>(
      `${this.API_ENDPOINT}/${path}`,
      this.createDefaultOptions()
    );
  }

  deleteRequest<R>(path: string) {
    return this.httpClient.delete<R>(`${this.API_ENDPOINT}/${path}`);
  }
}
