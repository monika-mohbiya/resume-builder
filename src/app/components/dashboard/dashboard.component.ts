import { Component } from '@angular/core';
import { ResumeBuilderComponent } from '../TempResume/resume-builder/resume-builder.component';

@Component({
  selector: 'app-dashboard',
  imports: [ResumeBuilderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
