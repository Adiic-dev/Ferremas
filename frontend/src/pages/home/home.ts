import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home {
  videos = [
    'assets/videos/videostockFerreteria.mp4',
    'assets/videos/videostockGalletaFerremas.mp4',
    'assets/videos/videostockTaladro.mp4'
  ];
  currentVideo = 0;

  nextVideo() {
    this.currentVideo = (this.currentVideo + 1) % this.videos.length;
  }

  
}