import { ProjectsState } from './projects.reducer';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { ProjectsService } from '../../projects/projects.service';
import {
  ProjectsActionTypes,
  LoadProjects,
  ProjectsLoaded,
  AddProject,
  ProjectAdded
} from './projects.actions';
import { Project } from '../../projects/project.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectsEffects {
  @Effect() loadProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.LoadProjects,
    {
      run: (action: LoadProjects, state: ProjectsState) => {
        return this.projectsService
          .all()
          .pipe(map((res: Project[]) => new ProjectsLoaded(res)));
      },
      onError: () => {}
    }
  );

  @Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.AddProject,
    {
      run: (action: AddProject, state: ProjectsState) => {
        return this.projectsService
          .create(action.payload)
          .pipe(map((res: Project) => new ProjectAdded(res)));
      },
      onError: () => {}
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
