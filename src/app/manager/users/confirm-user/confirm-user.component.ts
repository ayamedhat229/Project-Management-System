import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.scss']
})
export class ConfirmUserComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onNoClick(){
    this.dialogRef.close();
  }
  ngOnInit(): void {
    
  }
}
