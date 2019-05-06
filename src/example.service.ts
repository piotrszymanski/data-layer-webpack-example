import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SingleContainerFactoryService } from 'data-layer/single-container/v2/index';

@Injectable()
export class ExampleService {
  constructor(private readonly factory: SingleContainerFactoryService) {}

  run(): void {
    console.log('** Example Service **');
    this.asyncRun()
      .then(() => console.log('** Example Completed **'));
  }

  async asyncRun(): Promise<void> {
    // Create an "single container" for the "employees" container.
    const employees = this.factory.getContainer('employees');

    // Read records from a filter.
    const filterResponse = await employees.readFilter({}).toPromise();
    console.log('filter response', filterResponse);

    // Create a new container instance.
    const destroy$ = new Subject<any>();
    const instance = await employees.createContainerInstance(destroy$).toPromise();

    // Open the first filter record in the container instance.
    const cardTableResponse1 = await filterResponse.panes.filter.select(instance, filterResponse.panes.filter.records[0]).toPromise();
    const cardRecord1 = cardTableResponse1.panes.card.records[0];
    console.log('card-table data (1)', cardRecord1.data);

    // Update the card record's "remark1" field with the current date.
    const cardTableResponse2 = await cardTableResponse1.panes.card.update(cardRecord1, { 'remark1': new Date().toString() }).toPromise();
    const cardRecord2 = cardTableResponse2.panes.card.records[0];
    console.log('card-table data (2)', cardRecord2.data);

    // Destroy the container instance.
    destroy$.next();
  }
}
