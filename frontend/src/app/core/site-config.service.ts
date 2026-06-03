import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SiteConfig } from "./site-config";

@Injectable({ providedIn: "root" })
export class SiteConfigService {
  constructor(private readonly http: HttpClient) {}

  getConfig(): Observable<SiteConfig> {
    return this.http.get<SiteConfig>("/assets/config/site.config.json");
  }
}

