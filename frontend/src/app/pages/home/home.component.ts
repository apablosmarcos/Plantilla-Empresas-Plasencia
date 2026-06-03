import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { SiteConfigService } from "../../core/site-config.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {
  readonly config$ = this.siteConfig.getConfig();

  readonly leadForm = this.formBuilder.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    phone: [""],
    message: ["", [Validators.required, Validators.minLength(10)]]
  });

  submitStatus = "";

  constructor(
    private readonly siteConfig: SiteConfigService,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient
  ) {}

  async submitLead(): Promise<void> {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    const config = await firstValueFrom(this.config$);
    const apiBaseUrl = config.apiBaseUrl?.trim();

    if (!apiBaseUrl) {
      this.submitStatus =
        "Demo activa en GitHub Pages. Configura apiBaseUrl para conectar el formulario con tu backend.";
      this.leadForm.reset();
      return;
    }

    this.http.post(this.buildLeadsUrl(apiBaseUrl), this.leadForm.getRawValue()).subscribe({
      next: () => {
        this.submitStatus = "Solicitud enviada correctamente.";
        this.leadForm.reset();
      },
      error: () => {
        this.submitStatus = "No se pudo enviar. Intentalo de nuevo.";
      }
    });
  }

  private buildLeadsUrl(apiBaseUrl: string): string {
    const normalizedBaseUrl = apiBaseUrl.replace(/\/+$/, "");
    return `${normalizedBaseUrl}/api/leads`;
  }
}
