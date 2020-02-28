import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] Selected',
  AddProject = '[Projects] Add Data',
  UpdateProject = '[Projects] Update Data',
  DeleteProject = '[Projects] Delete Data'
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(private payload: Project) {}
}
