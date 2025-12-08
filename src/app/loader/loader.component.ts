import { Component, computed } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading = computed(() => this.loader.loading());

  constructor(private loader: MainService) { }

}
