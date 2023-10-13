import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IQuestion } from 'src/app/interfaces/questions.interfaces';
import { CreateQuestionComponent } from 'src/app/shared/modals/create-question/create-question.component';
import { selectQuestionsList } from 'src/app/store/questions/questions.selectors';
import { createAnswersAction } from 'src/app/store/questions/questions.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly store: Store = inject(Store);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public questionsForm: FormGroup = this.fb.group({
    questions: this.fb.array([]),
  });

  public questions$: Observable<IQuestion[]> =
    this.store.select(selectQuestionsList);

  get optionsArray(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  ngOnInit(): void {
    this.questions$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.generateFormArray(data);
      });
  }

  public openCreateDialog(): void {
    this.dialog.open(CreateQuestionComponent, {
      data: {},
      width: '360px',
    });
  }

  public generateFormArray(questions: IQuestion[]): void {
    this.questionsForm.setControl(
      'questions',
      this.fb.array(questions.map((data) => this.fb.control(data)))
    );
  }

  public showAnswers(): void {
    this.store.dispatch(
      createAnswersAction({
        questions: this.questionsForm.value.questions,
      })
    );

    this.router.navigate(['review']);
  }
}
