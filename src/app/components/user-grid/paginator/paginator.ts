import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-paginator',
  templateUrl: './paginator.html',
})
export class PaginatorComponent {

  @Input() url: string = '';
  @Input() paginator: any;
}
