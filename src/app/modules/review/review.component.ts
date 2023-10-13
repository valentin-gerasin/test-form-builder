import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IQuestion } from 'src/app/interfaces/questions.interfaces';
import { selectQuestionsList } from 'src/app/store/questions/questions.selectors';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);

  public questions$: Observable<IQuestion[]> =
    this.store.select(selectQuestionsList);

  public navigateToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
