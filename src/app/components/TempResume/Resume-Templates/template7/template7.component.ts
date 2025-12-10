import { Component, Input, type SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-template7',
  imports: [],
  templateUrl: './template7.component.html',
  styleUrl: './template7.component.scss'
})
export class Template7Component {
  @Input() data: any;
  normalizedSkills: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.normalizeData();
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


}
