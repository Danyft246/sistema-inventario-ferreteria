import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  currentRole: 'ADMINISTRADOR' | 'EMPLEADO' = 'ADMINISTRADOR';
  currentUser = 'administrador';
  currentName = 'Administrador principal';
  userInitials = 'AD';

  usuario = 'administrador';
  password = 'prototipo';
  showPassword = false;

  currentView = 'dashboard';
  sidebarOpen = false;

  showProductModal = false;
  showUserModal = false;

  toastMessage = '';
  toastVisible = false;
  private toastTimer: any;

  movementType = 'Entrada';
  movementProduct = '';
  movementQty = 0;
  movementReason = 'Compra de mercadería';

  titles: { [key: string]: string } = {
    dashboard: 'Panel principal',
    productos: 'Productos',
    categorias: 'Categorías',
    proveedores: 'Proveedores',
    usuarios: 'Usuarios',
    movimientos: 'Registrar movimiento',
    historial: 'Historial',
    respaldos: 'Copias de seguridad'
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  triggerToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastVisible = false;
    }, 2600);
  }

  enterDemoSession(userType: 'administrador' | 'empleado') {
    if (userType === 'empleado') {
      this.currentUser = 'jperez';
      this.currentRole = 'EMPLEADO';
      this.currentName = 'Juan Pérez';
      this.userInitials = 'JP';
    } else {
      this.currentUser = 'administrador';
      this.currentRole = 'ADMINISTRADOR';
      this.currentName = 'Administrador principal';
      this.userInitials = 'AD';
    }
    this.isLoggedIn = true;
    this.currentView = 'dashboard';
  }

  loginSubmit() {
    this.enterDemoSession(this.usuario === 'jperez' ? 'empleado' : 'administrador');
  }

  logout() {
    this.isLoggedIn = false;
    this.usuario = 'administrador';
  }

  showView(viewName: string) {
    if (this.currentRole !== 'ADMINISTRADOR' && ['categorias', 'proveedores', 'usuarios', 'respaldos'].includes(viewName)) {
      this.triggerToast('Esta sección requiere permisos de administrador');
      return;
    }
    this.currentView = viewName;
    this.sidebarOpen = false;
  }

  openProductModal() {
    this.showProductModal = true;
  }

  openUserModal() {
    this.showUserModal = true;
  }

  registerMovement() {
    if (!this.movementProduct || !this.movementQty) {
      this.triggerToast('Selecciona un producto e ingresa una cantidad');
      return;
    }
    this.triggerToast(`${this.movementType} registrada correctamente — demostración`);
  }
}