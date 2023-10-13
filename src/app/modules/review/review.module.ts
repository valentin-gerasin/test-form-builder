import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';

@NgModule({
  declarations: [ReviewComponent],
  imports: [CommonModule, ReviewRoutingModule, MatButtonModule],
})
export class ReviewModule {}
