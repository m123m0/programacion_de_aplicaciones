import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Incidente, Estado, IncidentesService } from '../services/incidentes';

@Component({
  standalone: true,
  selector: 'app-detalle',
  imports: [IonicModule, CommonModule, DatePipe, RouterLink],
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss']
})
export class DetallePage {

  it: Incidente | null = null;

  constructor(
    private route: ActivatedRoute,
    private srv: IncidentesService,
    private alert: AlertController,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.it = this.srv.get(id);
    }
  }

  async cambiarEstado() {
    if (!this.it) return;

    const alert = await this.alert.create({
      header: 'Estado',
      inputs: [
        { label: 'Abierto',      type: 'radio', value: 'Abierto',      checked: this.it.estado === 'Abierto' },
        { label: 'En progreso',  type: 'radio', value: 'En progreso',  checked: this.it.estado === 'En progreso' },
        { label: 'Cerrado',      type: 'radio', value: 'Cerrado',      checked: this.it.estado === 'Cerrado' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'OK',       role: 'confirm' }
      ]
    });

    await alert.present();

    const result = await alert.onDidDismiss();
    if (result.role === 'confirm' && result.data?.values) {
      this.srv.update(this.it.id, { estado: result.data.values as Estado });
      this.it = this.srv.get(this.it.id);
    }
  }

  volver() {
    this.router.navigate(['/tabs/incidentes']);
  }

}
