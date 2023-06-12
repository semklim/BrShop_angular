import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() searchChange = new EventEmitter();

  searchValue!: string;

  timeoutId?: ReturnType<typeof setTimeout>;

  onSearch(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.searchChange.emit(this.searchValue), 300);
  }
}
