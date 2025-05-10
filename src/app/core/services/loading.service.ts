import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingService {
  loading = signal(false);
  private _count = 0;

  show() {
    this._count++;
    if (!this.loading()) this.loading.set(true);
  }

  hide() {
    if (this._count > 0) this._count--;
    if (this._count === 0) this.loading.set(false);
  }
}
