import { Component, OnInit, AfterViewInit } from '@angular/core';

import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('bannerTrigger', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class BannerComponent implements OnInit {

  isNameActive = true;
  isTitleActive = false;
  audio = new Audio();
  constructor(
    public analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {

    this.audio.src = 'assets/audio/arselene-belhayej.mp3'; // Update with your file's path
    this.audio.load();

    setInterval(() => {
      this.isNameActive = !this.isNameActive;
      this.isTitleActive = !this.isTitleActive;
    }, 4000); // Switch every 6 seconds (slightly longer interval)
  }

 playAudio(): void {
    this.audio.play();
  }
  }



