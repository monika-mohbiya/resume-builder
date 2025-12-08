import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-form',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.scss'
})
export class ResumeFormComponent {

  resumeForm!: FormGroup;

  // 👉 FINAL DATA
  // resumeData: any = {
  //   name: "John Smith",
  //   title: "Senior Frontend Developer",
  //   email: "john@email.com",
  //   phone: "+91 99999",
  //   address: "123, Main Street, Indore, India",
  //   linkedin: "https://linkedin.com/in/johnsmith",
  //   github: "https://github.com/johnsmith",
  //   website: "https://johnsmith.dev",
  //   dob: "1990-01-01",
  //   profilePicture: "https://picsum.photos/id/1/800/1200",

  //   summary: "Experienced frontend developer specializing in Angular and React with 4+ years of experience building scalable web applications.",
  //   objective: "To contribute to innovative web projects and grow as a lead frontend engineer in a dynamic team.",

  //   skills: [
  //     { name: "Angular", level: "Expert" },
  //     { name: "React", level: "Intermediate" }
  //   ],

  //   experience: [
  //     {
  //       company: "Google",
  //       role: "Frontend Developer",
  //       year: "2020-2022",
  //       responsibilities: [
  //         "Developed responsive web applications using Angular",
  //         "Collaborated with design and backend teams"
  //       ],
  //       achievements: [
  //         "Employee of the Month (2021)"
  //       ]
  //     }
  //   ],

  //   education: [
  //     {
  //       degree: "B.Tech in Computer Science",
  //       university: "ABC University",
  //       year: "2016-2020",
  //       gpa: "8.5/10",
  //       projects: ["E-commerce website", "Portfolio app"]
  //     }
  //   ],

  //   certifications: [
  //     { name: "Angular Advanced", year: "2021", issuer: "Udemy" }
  //   ],

  //   languages: [
  //     { name: "English", level: "Fluent" },
  //     { name: "Hindi", level: "Native" }
  //   ],

  //   interests: ["Traveling", "Photography"],

  //   references: [
  //     { name: "Jane Doe", role: "Manager at Google", contact: "jane@email.com" }
  //   ]
  // };

  // resumeData: any = null;
  resumeLocalStg: any = localStorage.getItem('Resume Data');
  resumeData: any = JSON.parse(this.resumeLocalStg);
  router = inject(Router);
  profilePreview: string | null = null;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.setFormData();
  }

  /*--------------------------------
      BUILD FORM
  --------------------------------*/
  buildForm() {
    this.resumeForm = this.fb.group({
      name: [''],
      title: [''],
      email: [''],
      phone: [''],
      address: [''],
      linkedin: [''],
      github: [''],
      website: [''],
      dob: [''],
      profilePicture: [''],

      summary: [''],
      objective: [''],

      skills: this.fb.array([]),
      experience: this.fb.array([]),
      education: this.fb.array([]),
      certifications: this.fb.array([]),
      languages: this.fb.array([]),
      interests: this.fb.array([]),
      references: this.fb.array([])
    });
  }

  /*--------------------------------
      GETTERS
  --------------------------------*/
  get skillsArray() { return this.resumeForm.get('skills') as FormArray; }
  get experienceArray() { return this.resumeForm.get('experience') as FormArray; }
  get educationArray() { return this.resumeForm.get('education') as FormArray; }
  get certificationsArray() { return this.resumeForm.get('certifications') as FormArray; }
  get languagesArray() { return this.resumeForm.get('languages') as FormArray; }
  get interestsArray() { return this.resumeForm.get('interests') as FormArray; }
  get referencesArray() { return this.resumeForm.get('references') as FormArray; }

  /*--------------------------------
      FORM ITEM STRUCTURES
  --------------------------------*/
  skillItem(s: any) {
    return this.fb.group({
      name: [s?.name ?? ''],
      level: [s?.level ?? ''],
    });
  }

  experienceItem(e: any) {
    return this.fb.group({
      company: [e?.company ?? ''],
      role: [e?.role ?? ''],
      year: [e?.year ?? ''],
      responsibilities: this.fb.array((e?.responsibilities ?? []).map((r: any) => this.fb.control(r))),
      achievements: this.fb.array((e?.achievements ?? []).map((a: any) => this.fb.control(a)))
    });
  }

  educationItem(ed: any) {
    return this.fb.group({
      degree: [ed?.degree ?? ''],
      university: [ed?.university ?? ''],
      year: [ed?.year ?? ''],
      gpa: [ed?.gpa ?? ''],
      projects: this.fb.array((ed?.projects ?? []).map((p: any) => this.fb.control(p)))
    });
  }

  certificationItem(c: any) {
    return this.fb.group({
      name: [c?.name ?? ''],
      year: [c?.year ?? ''],
      issuer: [c?.issuer ?? '']
    });
  }

  languageItem(l: any) {
    return this.fb.group({
      name: [l?.name ?? ''],
      level: [l?.level ?? '']
    });
  }

  referenceItem(r: any) {
    return this.fb.group({
      name: [r?.name ?? ''],
      role: [r?.role ?? ''],
      contact: [r?.contact ?? '']
    });
  }

  /*--------------------------------
      SET DATA (NULL SAFE)
  --------------------------------*/
  setFormData() {
    if (!this.resumeData) return;

    // Basic data patch
    this.resumeForm.patchValue(this.resumeData);

    if (this.resumeData.profilePicture) {
      this.profilePreview = this.resumeData.profilePicture;
    }

    // ARRAY DATA
    (this.resumeData.skills ?? []).forEach((s: any) => this.skillsArray.push(this.skillItem(s)));

    (this.resumeData.experience ?? []).forEach((e: any) => this.experienceArray.push(this.experienceItem(e)));

    (this.resumeData.education ?? []).forEach((ed: any) => this.educationArray.push(this.educationItem(ed)));

    (this.resumeData.certifications ?? []).forEach((c: any) => this.certificationsArray.push(this.certificationItem(c)));

    (this.resumeData.languages ?? []).forEach((l: any) => this.languagesArray.push(this.languageItem(l)));

    (this.resumeData.interests ?? []).forEach((i: any) => this.interestsArray.push(this.fb.control(i)));

    (this.resumeData.references ?? []).forEach((r: any) => this.referencesArray.push(this.referenceItem(r)));
  }

  /*--------------------------------
      ADD / REMOVE Functions
  --------------------------------*/
  addSkill() {
    this.skillsArray.push(this.skillItem({}));
  }
  removeSkill(i: number) { this.skillsArray.removeAt(i); }

  addExperience() {
    this.experienceArray.push(this.experienceItem({ responsibilities: [], achievements: [] }));
  }
  removeExperience(i: number) { this.experienceArray.removeAt(i); }

  /*--------------------------------
      RESPONSIBILITIES FUNCTIONS
  --------------------------------*/
  addResponsibility(expIndex: number) {
    const exp = this.experienceArray.at(expIndex);
    const responsibilities = exp.get('responsibilities') as FormArray;
    responsibilities.push(this.fb.control('')); // add empty responsibility
  }

  removeResponsibility(expIndex: number, resIndex: number) {
    const exp = this.experienceArray.at(expIndex);
    const responsibilities = exp.get('responsibilities') as FormArray;
    responsibilities.removeAt(resIndex);
  }

  /*--------------------------------
      ACHIEVEMENTS FUNCTIONS
  --------------------------------*/
  addAchievement(expIndex: number) {
    const exp = this.experienceArray.at(expIndex);
    const achievements = exp.get('achievements') as FormArray;
    achievements.push(this.fb.control('')); // add empty achievement
  }

  removeAchievement(expIndex: number, achIndex: number) {
    const exp = this.experienceArray.at(expIndex);
    const achievements = exp.get('achievements') as FormArray;
    achievements.removeAt(achIndex);
  }

  /*--------------------------------
      HELPER GETTERS
  --------------------------------*/
  getResponsibilities(expIndex: number): FormArray {
    return this.experienceArray.at(expIndex).get('responsibilities') as FormArray;
  }

  getAchievements(expIndex: number): FormArray {
    return this.experienceArray.at(expIndex).get('achievements') as FormArray;
  }
  addEducation() {
    this.educationArray.push(this.educationItem({ projects: [] }));
  }

  removeEducation(i: number) {
    this.educationArray.removeAt(i);
  }

  // Projects inside education
  addProject(eduIndex: number) {
    const edu = this.educationArray.at(eduIndex);
    const projects = edu.get('projects') as FormArray;
    projects.push(this.fb.control(''));
  }

  removeProject(eduIndex: number, projIndex: number) {
    const edu = this.educationArray.at(eduIndex);
    const projects = edu.get('projects') as FormArray;
    projects.removeAt(projIndex);
  }

  getProjects(eduIndex: number): FormArray {
    return this.educationArray.at(eduIndex).get('projects') as FormArray;
  }

  addCertification() {
    this.certificationsArray.push(this.certificationItem({}));
  }

  removeCertification(i: number) {
    this.certificationsArray.removeAt(i);
  }
  addLanguage() {
    this.languagesArray.push(this.languageItem({}));
  }

  removeLanguage(i: number) {
    this.languagesArray.removeAt(i);
  }
  addInterest() {
    this.interestsArray.push(this.fb.control(''));
  }

  removeInterest(i: number) {
    this.interestsArray.removeAt(i);
  }

  addReference() {
    this.referencesArray.push(this.referenceItem({}));
  }

  removeReference(i: number) {
    this.referencesArray.removeAt(i);
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result as string;

      this.profilePreview = base64Image;

      // ✅ Update form control value here
      this.resumeForm.get('profilePicture')?.setValue(base64Image);
    };

    reader.readAsDataURL(file);
  }


  submitForm() {
    if (this.resumeForm.invalid) {
      this.resumeForm.markAllAsTouched();
      return;
    }

    console.log("FINAL FORM DATA:", this.resumeForm.value);
    if (this.resumeForm.valid) {
      // Get the old value from localStorage
      const oldValueRaw = localStorage.getItem('Resume Data');
      const oldValue = oldValueRaw ? JSON.parse(oldValueRaw) : null;


      // Function to compare objects deeply
      function isEqual(a: any, b: any): boolean {
        return JSON.stringify(a) === JSON.stringify(b);
      }

      if (isEqual(oldValue, this.resumeForm.value)) {
        // If both are deeply equal
        console.log('⚠️ Values are same. No update needed.');
      } else {
        // If there's any difference: missing key, extra key, value change
        localStorage.setItem('Resume Data', JSON.stringify(this.resumeForm.value));
        this.router.navigateByUrl('/dashboard');
        console.log('✅ Values were different. LocalStorage updated.');
      }
      this.resumeForm.reset();

    } else {
      alert()
    }
    // yahi data API me send kar sakte ho
    // this.apiService.saveResume(this.resumeForm.value).subscribe(...)
  }


}
