import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-template1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss']
})
export class Template1Component implements OnInit, OnChanges {
  @Input() data: any;

  ngOnInit() {
    this.fixData();
    console.log(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.fixData();
    }
  }

  fixData() {
    // Summary fix
    if (this.data.Summary) {
      this.data.summary = this.data.Summary;
    }

    // Experience fix
    if (this.data.Experience && Array.isArray(this.data.Experience)) {
      this.data.experience = this.data.Experience.slice(1).map((row: any) => ({
        company: row[0],
        role: row[1],
        year: row[2],
        details: []
      }));
    }

    // Ensure education exists
    if (!this.data.education) {
      this.data.education = [];
    }
  }
}
