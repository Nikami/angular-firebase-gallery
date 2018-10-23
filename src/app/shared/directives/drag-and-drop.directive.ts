import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';

export interface IDragAndDropOptions {
  [key: string]: any;
}

@Directive({
  selector: '[afgDnD]'
})
export class DragAndDropDirective {
  private options: IDragAndDropOptions = {};

  constructor() { }

  @Input()
  set afgDnD(options: Object) {
    if (options) {
      this.options = options;
    }
  }

  @Output() dropped: EventEmitter<IDragAndDropOptions[]> = new EventEmitter();
  @Output() dragging: EventEmitter<boolean> = new EventEmitter();

  @HostBinding('class.hovered')
  private isHovered: boolean = false;

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    event.stopPropagation();
    event.dataTransfer.setData('text', JSON.stringify(this.options));
    this.isHovered = false;
    this.dragging.next(true);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isHovered = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isHovered = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isHovered = false;
    const data: string = event.dataTransfer.getData('text');
    const images = [];
    images.push(this.options, JSON.parse(data));
    this.dropped.next(images);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    this.dragging.next(false);
  }
}
