import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-template2',
  imports: [],
  templateUrl: './template2.component.html',
  styleUrl: './template2.component.scss'
})
export class Template2Component {
  @Input() data: any;
  ngOnInit() {
    this.fixData();
    console.log(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.fixData();
      this.getSkillNames();
      this.getInterestNames()
    }
  }

  fixData() {
    // Summary fix (already correct)
    if (!this.data.summary && this.data.Summary) {
      this.data.summary = this.data.Summary;
    }

    // Experience fix — your JSON format is:
    // experience: [ { company, role, year, responsibilities, achievements }... ]
    if (this.data.experience && Array.isArray(this.data.experience)) {
      this.data.experience = this.data.experience.map((item: any) => ({
        company: item.company,
        role: item.role,
        year: item.year,
        details: [
          ...(item.responsibilities || []),
          ...(item.achievements || [])
        ]
      }));
    }

    // Education fix — already correct in your JSON
    if (!Array.isArray(this.data.education)) {
      this.data.education = [];
    }

    // Skills fix — your template expects: data.skills.join(', ')
    if (Array.isArray(this.data.skills)) {
      this.data.skills = this.data.skills.map((s: any) => s.name);
    }
  }
  getSkillNames(): string {
    if (!this.data?.skills) return "";

    // CASE 1: Array of strings → ["Angular", "React"]
    if (typeof this.data.skills[0] === "string") {
      return this.data.skills.join(", ");
    }

    // CASE 2: Array of objects → [{name: "Angular", level: "Expert"}]
    if (typeof this.data.skills[0] === "object") {
      return this.data.skills.map((s: any) => s.name).join(", ");
    }

    return "";
  }
  getLanguagesNames() {
    if (!this.data?.languages) return "";

    // CASE 1: Array of strings → ["Angular", "React"]
    if (typeof this.data.languages[0] === "string") {
      return this.data.languages.join(", ");
    }

    // CASE 2: Array of objects → [{name: "Angular", level: "Expert"}]
    if (typeof this.data.languages[0] === "object") {
      return this.data.languages.map((s: any) => s.name).join(", ");
    }

    return "";
  }
  getInterestNames() {
    if (!this.data?.skills) return "";

    // CASE 1: Array of strings → ["Angular", "React"]
    if (typeof this.data.skills[0] === "string") {
      return this.data.skills.join(", ");
    }

    // CASE 2: Array of objects → [{name: "Angular", level: "Expert"}]
    if (typeof this.data.skills[0] === "object") {
      return this.data.skills.map((s: any) => s.name).join(", ");
    }

    return "";
  }
}
