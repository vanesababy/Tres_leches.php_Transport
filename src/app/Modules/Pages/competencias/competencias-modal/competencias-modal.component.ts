import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { ActividadProyectoModel } from 'src/app/shared/models/actividad-proyecto.model';
import { CompetenciaModel } from 'src/app/shared/models/competencia.model';
import { ActividadProyectoService } from 'src/app/shared/services/actividad-proyecto.service';
import { CompetenciaService } from 'src/app/shared/services/competencia.service';
import { NotificationService } from 'src/app/shared/services/notification-service';

@Component({
  selector: 'app-competencias-modal',
  templateUrl: './competencias-modal.component.html',
  styleUrls: ['./competencias-modal.component.css']
})
export class CompetenciasModalComponent {
  @Input() competencia: CompetenciaModel;

  @Output() store: EventEmitter<CompetenciaModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formCompetencia: UntypedFormGroup | any;
  actividadProyecto: ActividadProyectoModel[] = [];

  competenciasss: CompetenciaModel | any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private actividadProyectos: ActividadProyectoService,
    private _CompetenciaService: CompetenciaService,
    public dialogRef: MatDialogRef<CompetenciasModalComponent>
  ) {
    this.competencia = {
      id: 0,
      nombreCompetencia: '',
      codigoCompetencia: '',
      idActividadProyecto: 0,
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerActividadProyecto();
    this.setCompetencia();
  }

  traerActividadProyecto() {
    this.actividadProyectos.traerActividadProyecto().subscribe(
      (proceso: ActividadProyectoModel[]) => {
        this.actividadProyecto = proceso;
      },
      (error) => {
        // this._uiNotificationService.error('Error de conexión');
      }
    );
  }

  get nombreCompetenciaField() {
    return this.formCompetencia.get('nombreCompetencia');
  }

  get codigoCompetenciaField() {
    return this.formCompetencia.get('codigoCompetencia');
  }

  get idActividadProyecto() {
    return this.formCompetencia.get('idActividadProyecto');
  }

  setCompetencia() {
    if (this.competencia) {
      this.formCompetencia.patchValue({
        nombreCompetencia: this.competencia.nombreCompetencia,
        codigoCompetencia: this.competencia.codigoCompetencia,
        idActividadProyecto: this.competencia.idActividadProyecto,
      });
    }
  }

  private buildForm() {
    this.formCompetencia = this.formBuilder.group({
      id: [0],
      nombreCompetencia: ['', [Validators.required]],
      codigoCompetencia: ['', [Validators.required]],
      idActividadProyecto: ['', [Validators.required]],
    });

    this.formCompetencia.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe((data: any) => {});
  }

  guardarCompetencia(competencia: CompetenciaModel) {
    if (competencia.id) {
      this._CompetenciaService.actualizarCompetencia(competencia).subscribe((competencia) => {
        this.getCompetencia();
        this.reset();
        this.closeModal();
      });
    } else {
      this._CompetenciaService.crearCompetencia(competencia).subscribe((competencia) => {
        this.getCompetencia();
        this.reset();
        this.closeModal();
      });
    }
  }

  reset() {
    this.competenciasss = null;
  }



  closeModal() {
    this.dialogRef.close();
  }



  getCompetencia(): CompetenciaModel {
    return {
      id: this.competencia?.id,
      nombreCompetencia: this.nombreCompetenciaField.value,
      codigoCompetencia: this.codigoCompetenciaField.value,
      idActividadProyecto: this.idActividadProyecto.value,
    };
  }
}
