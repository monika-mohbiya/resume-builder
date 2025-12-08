import { Component, Input, type SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-template8',
  imports: [],
  templateUrl: './template8.component.html',
  styleUrl: './template8.component.scss'
})
export class Template8Component {
  @Input() data: any;
  normalizedSkills: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.normalizeData();
    }
  }

  // Normalize skills to an array of strings
  private normalizeData() {
    // Skills could be ['Angular','React'] or [{name:'Angular',level:'Expert'}]
    const s = this.data?.skills;
    if (!s) {
      this.normalizedSkills = [];
    } else if (Array.isArray(s) && typeof s[0] === 'string') {
      this.normalizedSkills = s.filter(x => x && x.toString().trim()).map(x => x.toString());
    } else if (Array.isArray(s) && typeof s[0] === 'object') {
      this.normalizedSkills = s.map((it: any) => it.name || it.skill || '').filter((x: string) => x && x.trim());
    } else {
      this.normalizedSkills = [];
    }
  }

  // Normalize experience item details — support multiple shapes
  normalizeExperienceDetails(exp: any): string[] {
    if (!exp) return [];

    // If 'details' exists, use it
    if (Array.isArray(exp.details)) {
      return exp.details;
    }

    // If responsibilities/achievements exist, combine
    const resp = Array.isArray(exp.responsibilities) ? exp.responsibilities : [];
    const ach = Array.isArray(exp.achievements) ? exp.achievements : [];
    return [...resp, ...ach];
  }
}
