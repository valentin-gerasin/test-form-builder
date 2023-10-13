import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor, NgIf } from '@angular/common';

import { EQuestionType } from 'src/app/enums/question-type.enums';
import { Store } from '@ngrx/store';
import { createQuestionAction } from 'src/app/store/questions/questions.actions';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    NgIf,
    NgFor,
  ],
})
export class CreateQuestionComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly dialogRef: MatDialogRef<CreateQuestionComponent> =
    inject(MatDialogRef);
  private readonly store: Store = inject(Store);

  public EQuestionType = EQuestionType;

  public questionForm: FormGroup = this.fb.group({
    type: [EQuestionType.PARAGRAPH],
    question: ['', Validators.required],
    options: this.fb.array([]),
    required: [false],
    custom: [false],
  });

  get questionType(): EQuestionType {
    return this.questionForm.get('type')?.value;
  }

  get optionsArray(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  public addOption(): void {
    this.optionsArray.push(new FormControl('', Validators.required));
  }

  public createQuestion(): void {
    this.store.dispatch(
      createQuestionAction({ question: this.questionForm.value })
    );

    this.dialogRef.close();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
