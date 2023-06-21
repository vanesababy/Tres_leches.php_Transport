import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExtendModalComponent } from 'src/app/Modules/Components/extend-modal/extend-modal.component';
import { CompetenciaModel } from 'src/app/shared/models/competencia.model';
import { ExtendModalFiller } from 'src/app/shared/models/extend-modal-content';
import { CompetenciaService } from 'src/app/shared/services/competencia.service';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { CompetenciasModalComponent } from '../competencias-modal/competencias-modal.component';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css']
})
export class CompetenciasComponent {
  private showModalCompetencia = false;

   competencias: CompetenciaModel | any;
   competencia: CompetenciaModel[] = [];


   filler: ExtendModalFiller[] = [];



   @Output() update: EventEmitter<CompetenciaModel> = new EventEmitter();
   @Output() delete: EventEmitter<number> = new EventEmitter();
   @Output() create: EventEmitter<void> = new EventEmitter();


  constructor(

    private _CompetenciaService: CompetenciaService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private modal: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCompetencia();
  }

  getCompetencia() {
    this._CompetenciaService.traerCompetencias()
      .subscribe(competencia => {
        this.competencia = competencia;
      }, error => {
        // this._uiNotificationService.error("Error de conexión");
      });
  }



  actualizarCompetencia(Competencia: CompetenciaModel) {
    this.competencias = Competencia;
    this.showModalCompetencia = true;
  }

  createCompetencia(){
    this.competencias = null;
    this.showModalCompetencia = true;
  }

  guardarCompetencia(Competencia: CompetenciaModel) {
    if (Competencia.id) {
      this._CompetenciaService.actualizarCompetencia(Competencia).subscribe(Competencia => {
        this.getCompetencia();
        this.reset();
      });
    } else {
      this._CompetenciaService.crearCompetencia(Competencia).subscribe(Competencia => {
        this.getCompetencia();
        this.reset();
      })
    }
  }

  reset() {
    this.competencias = null;
    this.showModalCompetencia = false;
  }

  actualizar(Competencia: CompetenciaModel) {
    this.update.emit(Competencia);
  }


  deleteCompetencia(event: number) {
    const confirmarBorrado = confirm("¿Estás seguro de que deseas eliminar esta competencia?");
    if (confirmarBorrado) {
      this._CompetenciaService.eliminarCompetencia(event).subscribe(() => {
        // Notificar eliminación exitosa
        this.notificationService.showNotification({ message: "Se ha eliminado la competencia", type: "fail" });
        this.getCompetencia();
        window.location.reload();
      });
    }
  }



  openModalCreate() {
    const dialogRef = this.modal.open(CompetenciasModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.competencias = {} as CompetenciaModel;
      // Recargar la página
      window.location.reload();
    });
  }




  agregar() {
    this.create.emit();
  }


}




