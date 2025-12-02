import { Injectable } from '@angular/core';

export type Tipo = 'Cajero' | 'Barrera entrada' | 'Barrera salida';
export type Estado = 'Abierto' | 'En progreso' | 'Cerrado';

export interface Incidente {
  id: string;
  tipo: Tipo;
  equipo: string;
  prioridad: 'Baja' | 'Media' | 'Alta';
  fecha: string; // ISO
  descripcion: string;
  estado: Estado;
}

const KEY = 'INCIDENTES_DB';

@Injectable({ providedIn: 'root' })
export class IncidentesService {

  private data: Incidente[] = [];

  constructor() {
    const raw = localStorage.getItem(KEY);
    this.data = raw ? JSON.parse(raw) : [];
  }

  private persist() {
    localStorage.setItem(KEY, JSON.stringify(this.data));
  }

  all() {
    return [...this.data].sort((a, b) => b.fecha.localeCompare(a.fecha));
  }

  get(id: string) {
    return this.data.find(i => i.id === id) || null;
  }

  add(i: Omit<Incidente, 'id'>) {
    const it: Incidente = {
      id: crypto.randomUUID(),
      ...i
    };
    this.data.push(it);
    this.persist();
    return it.id;
  }

  update(id: string, patch: Partial<Incidente>) {
    const ix = this.data.findIndex(i => i.id === id);
    if (ix < 0) return false;
    this.data[ix] = { ...this.data[ix], ...patch };
    this.persist();
    return true;
  }

  seedDemoIfEmpty() {
    if (this.data.length) return;

    this.add({
      tipo: 'Cajero',
      equipo: 'Cajero N2',
      prioridad: 'Alta',
      fecha: new Date().toISOString(),
      descripcion: 'Error módulo magnético',
      estado: 'Abierto'
    });

    this.add({
      tipo: 'Barrera entrada',
      equipo: 'Norte-03',
      prioridad: 'Media',
      fecha: new Date().toISOString(),
      descripcion: 'No levanta barrera',
      estado: 'En progreso'
    });
  }
}
