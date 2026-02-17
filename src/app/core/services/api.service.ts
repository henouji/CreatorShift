import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedResponse } from '../models';

export interface RequestOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, options?: RequestOptions): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(
      this.buildUrl(endpoint),
      this.buildOptions(options)
    );
  }

  getPaginated<T>(endpoint: string, options?: RequestOptions): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(
      this.buildUrl(endpoint),
      this.buildOptions(options)
    );
  }

  post<T>(endpoint: string, body: unknown, options?: RequestOptions): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(
      this.buildUrl(endpoint),
      body,
      this.buildOptions(options)
    );
  }

  put<T>(endpoint: string, body: unknown, options?: RequestOptions): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(
      this.buildUrl(endpoint),
      body,
      this.buildOptions(options)
    );
  }

  patch<T>(endpoint: string, body: unknown, options?: RequestOptions): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(
      this.buildUrl(endpoint),
      body,
      this.buildOptions(options)
    );
  }

  delete<T>(endpoint: string, options?: RequestOptions): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(
      this.buildUrl(endpoint),
      this.buildOptions(options)
    );
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  private buildOptions(options?: RequestOptions): { params?: HttpParams; headers?: HttpHeaders } {
    const result: { params?: HttpParams; headers?: HttpHeaders } = {};

    if (options?.params) {
      let params = new HttpParams();
      Object.entries(options.params).forEach(([key, value]) => {
        params = params.set(key, String(value));
      });
      result.params = params;
    }

    if (options?.headers) {
      let headers = new HttpHeaders();
      Object.entries(options.headers).forEach(([key, value]) => {
        headers = headers.set(key, value);
      });
      result.headers = headers;
    }

    return result;
  }
}
