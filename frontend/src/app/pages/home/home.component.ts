import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
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

  submitLead(): void {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.http.post("/api/leads", this.leadForm.getRawValue()).subscribe({
      next: () => {
        this.submitStatus = "Solicitud enviada correctamente.";
        this.leadForm.reset();
      },
      error: () => {
        this.submitStatus = "No se pudo enviar. Intentalo de nuevo.";
      }
    });
  }
}

