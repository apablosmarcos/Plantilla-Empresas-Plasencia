import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import type { Observable } from "rxjs";
import type { SiteConfig } from "./site-config";

@Injectable({ providedIn: "root" })
export class SiteConfigService {
	private readonly http = inject(HttpClient);

	getConfig(): Observable<SiteConfig> {
		return this.http.get<SiteConfig>("assets/config/site.config.json");
	}
}
