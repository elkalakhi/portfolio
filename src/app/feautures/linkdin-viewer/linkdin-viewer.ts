import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // ← pour *ngIf
@Component({
  selector: 'app-linkdin-viewer',
  imports: [CommonModule],
  templateUrl: './linkdin-viewer.html',
  styleUrl: './linkdin-viewer.scss',
})
export class LinkdinViewer  implements OnInit {
  @Input() linkdinUrl: string =
    'https://www.linkedin.com/in/elmehdi-el-kalakhi-98aab5203/';

  safeUrl!: SafeResourceUrl;
  isLoading = true;
  hasError = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.linkdinUrl);
  }

  onLoad(): void {
    this.isLoading = false;
  }

  onError(): void {
    this.isLoading = false;
    this.hasError = true;
  }
}

