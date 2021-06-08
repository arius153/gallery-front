import { identifierModuleUrl } from "@angular/compiler"
import { Tag } from './tag';

export interface ImageResponseDTO {
    id: number,
    name: string,
    date: Date,
    description: string,
    content: string,
    tags: Tag[]
}
