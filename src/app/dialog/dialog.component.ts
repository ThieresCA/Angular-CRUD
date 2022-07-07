import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  companyForm!: FormGroup;
  actionBtn: string = 'SALVAR';
  titleModal: string = 'NOVA EMPRESA';
  actionBtnNo: string = 'CANCELAR';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      companyId: ['', Validators.required],
      companyName: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'EDITAR';
      this.titleModal = 'EDITAR EMPRESA';
      this.companyForm.controls['companyName'].setValue(
        this.editData.companyName
      );
      this.companyForm.controls['companyId'].setValue(this.editData.companyId);
    }
  }

  addCompany() {
    if (!this.editData) {
      if (this.companyForm.valid) {
        this.api.postCompany(this.companyForm.value).subscribe({
          next: (res) => {
            alert('Empresa adicionada com sucesso');
            this.companyForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Algum erro ocorreu ao tentar adicionar a empresa');
          },
        });
      }
    } else {
      this.updateCompany();
    }
  }

  updateCompany() {
    this.api.putCompany(this.companyForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Empresa editada com sucesso');
        this.companyForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Houve um erro durante a edição');
      },
    });
  }
}
