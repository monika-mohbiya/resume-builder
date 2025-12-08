import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { TemplateComponent } from '../template-component.interface';
import { RESUME_TEMPLATES } from '../Resume-Templates/templates';
import { CommonModule } from '@angular/common';
import { VariableService } from '../../../services/variable.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { MatIconModule } from '@angular/material/icon';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-resume-builder',
  imports: [CommonModule, MatIconModule],
  templateUrl: './resume-builder.component.html',
  styleUrl: './resume-builder.component.scss'
})

export class ResumeBuilderComponent {
  @ViewChild('imgPopup') imgPopupTemplate: any;
  commonService = inject(VariableService);
  dialogRef!: MatDialogRef<any>;
  service = inject(MainService);
  templates = RESUME_TEMPLATES;
  resumeData: any;
  // resumeData = {
  //   // Basic Info
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


  //   // Summary / Objective
  //   summary: "Experienced frontend developer specializing in Angular and React with 4+ years of experience building scalable web applications.",
  //   objective: "To contribute to innovative web projects and grow as a lead frontend engineer in a dynamic team.",

  //   // Skills
  //   skills: [
  //     { name: "Angular", level: "Expert" },
  //     { name: "React", level: "Intermediate" },
  //     { name: "Node.js", level: "Intermediate" },
  //     { name: "HTML", level: "Expert" },
  //     { name: "CSS", level: "Expert" },
  //     { name: "TypeScript", level: "Expert" },
  //     { name: "JavaScript", level: "Expert" }
  //   ],
  //   // Experience
  //   experience: [
  //     {
  //       company: "Google",
  //       role: "Frontend Developer",
  //       year: "2020-2022",
  //       responsibilities: [
  //         "Developed responsive web applications using Angular",
  //         "Collaborated with design and backend teams to improve user experience",
  //         "Optimized web performance and reduced load time by 25%"
  //       ],
  //       achievements: [
  //         "Employee of the Month (March 2021)",
  //         "Reduced page load time by 25%"
  //       ]
  //     },
  //     {
  //       company: "Meta",
  //       role: "Senior Frontend Developer",
  //       year: "2022-2024",
  //       responsibilities: [
  //         "Led a team of 5 developers for enterprise projects",
  //         "Implemented reusable component libraries using React and Angular",
  //         "Integrated REST and GraphQL APIs for scalable applications"
  //       ],
  //       achievements: [
  //         "Promoted to Senior Frontend Developer in 6 months",
  //         "Awarded 'Best Team Leadership' in 2023"
  //       ]
  //     }
  //   ],

  //   // Education
  //   education: [
  //     {
  //       degree: "B.Tech in Computer Science",
  //       university: "ABC University",
  //       year: "2016-2020",
  //       gpa: "8.5/10",
  //       projects: ["E-commerce website development", "Personal portfolio application"]
  //     }
  //   ],

  //   // Certifications
  //   certifications: [
  //     { name: "Angular Advanced", year: "2021", issuer: "Udemy" },
  //     { name: "React Professional", year: "2022", issuer: "Coursera" }
  //   ],

  //   // Languages
  //   languages: [
  //     { name: "English", level: "Fluent" },
  //     { name: "Hindi", level: "Native" },
  //     { name: "Marathi", level: "Fluent" },
  //     { name: "Tamil", level: "Fluent" },
  //     { name: "Gujrati", level: "Fluent" },
  //     { name: "Bengoli", level: "Fluent" },

  //   ],

  //   // Interests / Hobbies
  //   interests: ["Traveling", "Photography", "Open Source Contribution", "UI/UX Design"],

  //   // References
  //   references: [
  //     { name: "Jane Doe", role: "Manager at Google", contact: "jane@email.com" },
  //     { name: "Mark Lee", role: "Team Lead at Meta", contact: "mark@email.com" }
  //   ]
  // };


  @ViewChild('preview', { read: ViewContainerRef, static: false })
  preview!: ViewContainerRef;

  constructor(private dialog: MatDialog) { }


  exportPDF() {

    const element: any = document.querySelector('.template-screen');

    const A4_WIDTH_PT = 595.28;     // A4 width in PDF points
    const A4_HEIGHT_PT = 841.89;    // A4 height in PDF points

    html2canvas(element, {
      scale: 3,          // high quality
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY
    }).then(canvas => {

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'pt', 'a4');

      const imgWidth = A4_WIDTH_PT;
      const imgHeight = canvas.height * (imgWidth / canvas.width);

      let heightLeft = imgHeight;
      let startY = 0;

      // First page
      pdf.addImage(imgData, 'PNG', 0, startY, imgWidth, imgHeight);

      heightLeft -= A4_HEIGHT_PT;

      // Additional pages
      while (heightLeft > 0) {
        startY = heightLeft - imgHeight;

        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, startY, imgWidth, imgHeight);

        heightLeft -= A4_HEIGHT_PT;
      }

      pdf.save("resume.pdf");
    });
  }
  openImage(data: any) {
    this.service.show();

    const rdata: any = localStorage.getItem('Resume Data');
    this.resumeData = rdata ? JSON.parse(rdata) : null;

    this.dialogRef = this.dialog.open(this.imgPopupTemplate, {
      width: '80%',
      data: data.preview
    });

    this.dialogRef.afterOpened().subscribe(() => {
      this.service.hide();

      if (this.resumeData) {
        setTimeout(() => {
          if (this.preview) {
            this.preview.clear();

            const compRef =
              this.preview.createComponent<TemplateComponent>(data.component);
            compRef.instance.data = { ...this.resumeData };
            compRef.changeDetectorRef.detectChanges();
          }
        }, 0);
      }
    });
  }




  closePopup() {
    this.dialogRef.close();
  }

}
