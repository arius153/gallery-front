import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImageAddDTO } from '../_models/image-add-dto';
import { ImageService } from '../_services/image.service';
import { Location } from '@angular/common'

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File){}
}

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent   {

  model = new ImageAddDTO;

  selectedFile?: File;
  image64?: string;

  constructor(
    private imageService: ImageService,
    private location: Location){};

  onSubmit(form: NgForm) {
  
    if (form.valid) {
      if (this.selectedFile)
      {
        this.imageService.uploadImage(this.model, this.selectedFile).subscribe(
          x => {
            this.location.back();
          }
        );
      }
      
    }
  }

  slice(tags: string): void {
    this.model.tags = Array.from(new Set(tags.split(/[ ,]+/)))

  }

  imageChoice(imageInput: any) {
    this.selectedFile = imageInput.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageInput.target.files[0]);
    reader.onload = () => {
     
      this.image64 = reader.result as string;
    }
  }

}
