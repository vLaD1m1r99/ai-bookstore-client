import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-backend-error-message',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
})
export class BackendErrorMessages {
  @Input() backendErrors: string = '';
}
