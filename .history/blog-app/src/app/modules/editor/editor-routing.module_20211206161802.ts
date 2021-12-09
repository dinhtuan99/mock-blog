import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';

const editorRoutes: Routes = [
    
];

@NgModule({
    imports: [
        RouterModule.forChild(editorRoutes)
    ],
    exports: [RouterModule]
})
export class EditorRoutingModule { }
