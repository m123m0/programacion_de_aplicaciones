import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, createAnimation, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  @ViewChild('btnIngresar', { read: ElementRef }) btn?: ElementRef;

  form = this.fb.group({
    usuario: ['', Validators.required],
    clave: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastController
  ) {}

  async ingresar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.form.value.usuario;
    const clave = this.form.value.clave;

    if (usuario === 'operador' && clave === '1234') {

      if (this.btn?.nativeElement) {
        await createAnimation()
          .addElement(this.btn.nativeElement)
          .duration(180)
          .keyframes([
            { offset: 0, transform: 'scale(1)' },
            { offset: 0.5, transform: 'scale(0.97)' },
            { offset: 1, transform: 'scale(1)' },
          ])
          .play();
      }

      localStorage.setItem('auth_token', 'OK');

      this.router.navigateByUrl('/tabs/incidentes');
      return;
    }

    (await this.toast.create({
      message: 'Credenciales inválidas',
      duration: 1600,
      position: 'top'
    })).present();
  }
}
