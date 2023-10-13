import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  forwardRef,
  inject,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { EQuestionType } from 'src/app/enums/question-type.enums';
import { IQuestion } from 'src/app/interfaces/questions.interfaces';
import { ControlValueAccessor } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [
    MatInputModule,
    NgIf,
    NgFor,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionComponent),
      multi: true,
    },
  ],
})
export class QuestionComponent implements OnInit, ControlValueAccessor {
  @Input() question: IQuestion;

  private destroyRef = inject(DestroyRef);
  private readonly fb: FormBuilder = inject(FormBuilder);

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public questionForm: FormGroup = this.fb.group({
    input: [''],
    checkBoxes: this.fb.array([]),
  });

  public value: IQuestion | null = null;

  public EQuestionType = EQuestionType;

  ngOnInit(): void {
    this.generateFormArray();

    this.questionForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.questionValueChange(data);
      });
  }

  get optionsArray(): FormArray {
    return this.questionForm.get('checkBoxes') as FormArray;
  }

  public questionValueChange(data: {
    input: string;
    checkBoxes: { name: string; state: boolean }[];
  }): void {
    const answers = [
      ...(data.input ? [data.input] : []),
      ...data.checkBoxes.filter((v) => v.state).map((v) => v.name),
    ];

    this.onChange({
      ...this.question,
      answers,
    });
  }

  public writeValue(value: IQuestion | null): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public generateFormArray(): void {
    this.questionForm.setControl(
      'checkBoxes',
      this.fb.array(
        this.question.options.map((data) =>
          this.fb.group({
            name: data,
            state: false,
          })
        )
      )
    );
  }
}
