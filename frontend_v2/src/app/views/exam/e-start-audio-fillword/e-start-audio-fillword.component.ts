import { Component } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { s3urlShinkanzenN3 } from 'src/app/const';

@Component({
  selector: 'app-e-start-audio-fillword',
  templateUrl: './e-start-audio-fillword.component.html',
  styleUrls: ['./e-start-audio-fillword.component.scss']
})
export class EStartAudioFillwordComponent {


  s3urlShinkanzenN3 = s3urlShinkanzenN3;

// Material Style Advance Audio Player Playlist
msaapPlaylist: Track[] = [
  {
    title: 'Track 10',
    link: this.s3urlShinkanzenN3 +'Track10.mp3',
    artist: 'Shinkanzen N3',
    duration: 1
  },
];
    triggerOnEnded(event :any) {
    console.log('ended');
  }
}
