import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css'],
})
export class RemoveDialogComponent implements OnInit {
  companyForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      companyId: ['', Validators.required],
      companyName: ['', Validators.required],
    });

    this.companyForm.controls['companyName'].setValue(
      this.data.companyName
    );
    this.companyForm.controls['companyId'].setValue(this.data.companyId);
  }

  removeCompany() {
    let id = this.data.id;
    this.api.removeCompany(id).subscribe({
      next: (res) => {
        alert('deletado');
      },
      error: () => {
        alert('erro');
      },
    });
  }
}
