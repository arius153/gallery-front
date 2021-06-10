import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ImageResponseDTO } from '../_models/image-response-dto';
import { ImageService } from '../_services/image.service';
import { ImageAddDTO } from '../_models/image-add-dto';
import { NgForm } from '@angular/forms';
 
@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  @Input() image?: ImageResponseDTO;

  model = new ImageAddDTO;
  selectedFile?: File;
  image64 = '';


  isModifyEnabled = false;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getImage();
  }

  getImage(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.imageService.getImage(id).subscribe(image =>  {
      this.image = image;
      this.model.name =image.name;
      this.model.date = image.date;
      this.model.description = image.description;
      this.model.tags = image.tags.map(x => x.text);
    });
    
  }

  goBack(): void {
    this.location.back();
  }

  enableModify() {
    if (this.isModifyEnabled) {
      this.isModifyEnabled = false;

    }
    else {
      this.isModifyEnabled = true;
    }
  }

  
  slice(tags: string): void {
    this.model.tags = tags.split(/[ ,]+/);


  }

  onSubmit(form: NgForm) {
    


    if (form.valid && this.image) {
      this.imageService.updateImage(this.image.id,this.selectedFile, this.model)
      .subscribe(() => {
        this.isModifyEnabled = false;
        this.getImage();
      });
    }
    
  }
  imageChoice(imageInput: any) {
    this.selectedFile = imageInput.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageInput.target.files[0]);
    reader.onload = () => {

      this.image64 = reader.result as string;
    }
  }


  title = 'angulartoastr';
  showModal: boolean = false;
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
}
