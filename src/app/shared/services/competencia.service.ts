import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { CompetenciaModel } from '../models/competencia.model';
import { CompetenciasComponent } from 'src/app/Modules/Pages/competencias/competencias/competencias.component';


@Injectable({
  providedIn: 'root'
})

export class CompetenciaService {
  open(CompetenciaComponent: CompetenciasComponent ) {
    throw new Error('Method not implemented.');
  }
  competencia: CompetenciaModel |any;
  permisos: number |any ;
  constructor(
    private _coreService: CoreService
  ) { }


  public traerCompetencias() {
    return this._coreService.get<CompetenciaModel[]>('competencias');
  }



  public competencias() {
    return this._coreService.get<CompetenciaModel[]>('competencias');
  }

  crearCompetencia (competencia: CompetenciaModel) {
    competencia.nombreCompetencia=competencia.nombreCompetencia.toUpperCase();
    competencia.codigoCompetencia=competencia.codigoCompetencia.toUpperCase();
    competencia.idActividadProyecto=competencia.idActividadProyecto;

    return this._coreService.post<CompetenciaModel[]>('competencias', competencia);
  }
  eliminarCompetencia(competenciaId: number) {
    return this._coreService.delete('competencias/' + competenciaId);
  }
  actualizarCompetencia(competencia: CompetenciaModel) {
    return this._coreService.put('competencias/' + competencia.id, competencia);
  }

}
