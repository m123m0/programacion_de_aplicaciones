import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IncidentesService } from '../services/incidentes';

@Component({
  standalone: true,
  selector: 'app-tab2',
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page {

  form = this.fb.group({
    tipo: ['', Validators.required],
    equipo: ['', Validators.required],
    descripcion: ['', Validators.required],
    prioridad: ['Media', Validators.required],
    estado: ['Abierto', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private srv: IncidentesService,
    private router: Router,
    private toast: ToastController
  ) {}

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.srv.add({
      tipo: this.form.value.tipo! as any,
      equipo: this.form.value.equipo!,
      descripcion: this.form.value.descripcion!,
      prioridad: this.form.value.prioridad! as any,
      estado: this.form.value.estado! as any,
      fecha: new Date().toISOString()
    });

    (await this.toast.create({
      message: 'Incidente registrado',
      duration: 1500,
      position: 'top'
    })).present();

    this.router.navigate(['/tabs/incidentes']);
  }
}
