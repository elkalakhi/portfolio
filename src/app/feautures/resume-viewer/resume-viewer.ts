import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // ← pour *ngIf

@Component({
  selector: 'app-resume-viewer',
  imports: [CommonModule],
  templateUrl: './resume-viewer.html',
  styleUrl: './resume-viewer.scss',
})
export class ResumeViewer implements OnInit {
  @Input() cvUrl: string =
    'https://drive.google.com/file/d/1NK_aYdeOA8ACGormS7B4h2w3yCPTrqSy/preview';

  safeUrl!: SafeResourceUrl;
  isLoading = true;
  hasError = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cvUrl);
  }

  onLoad(): void {
    this.isLoading = false;
  }

  onError(): void {
    this.isLoading = false;
    this.hasError = true;
  }
}
