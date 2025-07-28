import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: [ './confirmacion.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmacionComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}