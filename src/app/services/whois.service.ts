import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WhoisService {
  domain: string;
  constructor(private apiService: ApiService) { }

  sendWhoisRequest (domain) {
    return this.apiService.fetchWhoisRequest(domain);
  }
}
