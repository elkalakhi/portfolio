import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatus } from '../../core/models';


@Pipe({
  name: 'statusLabelPipe',
})
export class StatusLabelPipePipe implements PipeTransform {
   transform(status: ProjectStatus): string {
    const map: Record<ProjectStatus, string> = {
      live: 'Live',
      beta: 'Beta',
      'open-source': 'Open Source',
      archived: 'Archived',
      intern: 'Intern',
      client: 'Client',
    };
    return map[status] ?? status;
  }
}
