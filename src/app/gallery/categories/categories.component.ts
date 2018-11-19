import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { IFGalleryCategory, IFGalleryItem } from '../../shared/shared.models';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddCategoryComponent } from './add-category/add-category.component';
import {
  MessageDialogActions,
  MessageDialogComponent
} from '../../shared/components/message-dialog/message-dialog.component';
import { RenameCategoryComponent } from './rename-category/rename-category.component';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'afg-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @HostBinding('class') classList: string = 'd-flex flex-column w-100';

  public ctgs: IFGalleryCategory[];
  public filteredCtgs: IFGalleryCategory[] = [];
  public editMode: boolean = false;
  public searchControl: FormControl = new FormControl();

  private categoriesSubscription: Subscription;
  private searchControlSubscription: Subscription;

  constructor(
    private categories: CategoriesService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscribeToCategories();
    this.subscribeToSearch();
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
    this.searchControlSubscription.unsubscribe();
  }

  openAddCategoryDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(AddCategoryComponent, {
      maxWidth: '450px',
      panelClass: 'dialog-primary'
    });
  }

  openRemoveDialog(category: IFGalleryCategory): void {
    this.dialog.closeAll();
    const dialogRef: MatDialogRef<MessageDialogComponent> = this.dialog.open(
      MessageDialogComponent,
      {
        maxWidth: '350px',
        panelClass: 'dialog-accent',
        data: {
          message: 'DIALOG.REMOVE_CATEGORY',
          translateParams: {
            name: category.name
          },
          actions: [MessageDialogActions.OK, MessageDialogActions.CANCEL]
        }
      }
    );

    dialogRef.afterClosed().subscribe((isRemovalAccepted: boolean) => {
      if (isRemovalAccepted) {
        this.categories.remove(category).subscribe();
      }
    });
  }

  openRenameDialog(category: IFGalleryCategory): void {
    this.dialog.closeAll();
    this.dialog.open(RenameCategoryComponent, {
      maxWidth: '450px',
      panelClass: 'dialog-primary',
      data: { category }
    });
  }

  private subscribeToCategories(): void {
    this.categoriesSubscription = this.categories
      .get()
      .subscribe((categories: IFGalleryCategory[]) => {
        this.ctgs = categories;
        this.searchControl.patchValue(this.searchControl.value || '');
      });
  }

  private subscribeToSearch(): void {
    this.searchControlSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        map((title: string) =>
          title ? this.filterCtgs(title) : this.ctgs.slice()
        )
      )
      .subscribe((ctgs: IFGalleryCategory[]) => {
        this.filteredCtgs = ctgs;
        this.cdRef.detectChanges();
      });
  }

  private filterCtgs(value: string): IFGalleryItem[] {
    const filterValue = value.toLowerCase();
    return this.ctgs.filter(
      (ct: IFGalleryCategory) =>
        ct.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
