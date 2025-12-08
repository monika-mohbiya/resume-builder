import { Component, Input, type SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-template9',
  imports: [],
  templateUrl: './template9.component.html',
  styleUrl: './template9.component.scss'
})
export class Template9Component {
  @Input() data: any;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      this.data = { ...this.data }; // fresh clone (important)
      this.fixData();
    }
  }

  fixData() {
    // Summary fix (already correct)
    if (!this.data.summary && this.data.Summary) {
      this.data.summary = this.data.Summary;
    }
    this.data.experience = this.data.experience.map((item: any) => ({
      ...item,
      details: [
        ...(item.responsibilities || []),
        ...(item.achievements || [])
      ]
    }));

    // Education fix — already correct in your JSON
    if (!Array.isArray(this.data.education)) {
      this.data.education = [];
    }

    // Skills fix — your template expects: data.skills.join(', ')
    if (Array.isArray(this.data.skills)) {
      this.data.skills = this.data.skills.map((s: any) => s.name);
    }
  }
}
