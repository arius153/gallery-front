import { Component, OnInit } from '@angular/core';
import { ImageResponseDTO } from '../_models/image-response-dto';
import { AutheticationService } from '../_services/authetication.service';
import { ImageService } from '../_services/image.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: ImageResponseDTO[] = [];

  constructor(private imageService: ImageService, public authService: AutheticationService) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    this.imageService.getImages().subscribe(images => this.images = images.reverse());
    this.imageService.getCount().subscribe(count => this.length = count);
  }

  onClick(image: ImageResponseDTO): void {
    console.log(`clicked image with id: ${image.id}`);
  }

  delete(image: ImageResponseDTO): void {
    this.images = this.images.filter(i => i !== image);
    this.imageService.deleteImage(image.id).subscribe();
  }

  // MatPaginator Inputs
  length = 100;
  pageSize = 12;


  // MatPaginator Output
  pageEvent?: PageEvent;

  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.imageService.getImages(event.pageIndex).subscribe(images => this.images = images.reverse());
  }

}
