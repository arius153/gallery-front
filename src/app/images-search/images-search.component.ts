import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ImageResponseDTO } from '../_models/image-response-dto';
import { AutheticationService } from '../_services/authetication.service';
import { ImageService } from '../_services/image.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-images-search',
  templateUrl: './images-search.component.html',
  styleUrls: ['./images-search.component.css']
})
export class ImagesSearchComponent implements OnInit {

  images$!: Observable<ImageResponseDTO[]>;
  private searchTerms = new Subject<string>();
  term?:string; 
  
  constructor(private imageService: ImageService, public authService: AutheticationService, private route: ActivatedRoute,
    private location: Location) { }



  search(term: string): void {
    this.term = term;
    this.searchTerms.next(term);
    this.imageService.getCount(term).subscribe(x => this.length = x);
  }

  ngOnInit(): void {
    

    this.images$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.imageService.searchImages(term))
    );

    const searchParam = String(this.route.snapshot.paramMap.get('searchParam'));
    if (searchParam != "null")
    {
      setTimeout(() => this.search(searchParam), 0);
    }
  }

  delete(image: ImageResponseDTO): void {
    this.imageService.deleteImage(image.id).subscribe();
  }

  // MatPaginator Inputs
  length = 0;
  pageSize = 12;
 

  // MatPaginator Output
  pageEvent?: PageEvent;


  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.images$ = this.imageService.getImages(event.pageIndex, this.term);
  }

}
