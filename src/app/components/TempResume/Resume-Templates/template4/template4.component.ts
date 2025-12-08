import { Component, Input, type SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-template4',
  imports: [],
  templateUrl: './template4.component.html',
  styleUrl: './template4.component.scss'
})
export class Template4Component {
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

    // Experience fix — your JSON format is:
    // experience: [ { company, role, year, responsibilities, achievements }... ]
    // if (this.data.experience && Array.isArray(this.data.experience)) {
    //   this.data.experience = this.data.experience.map((item: any) => ({
    //     company: item.company,
    //     role: item.role,
    //     year: item.year,
    //     details: [
    //       ...(item.responsibilities || []),
    //       ...(item.achievements || [])
    //     ]
    //   }));
    // }
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
