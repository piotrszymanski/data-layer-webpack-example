import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SingleContainerConfigurationService, InstanceMonitorService, SingleContainerFactoryService } from 'data-layer/single-container/v2/index';
import { EndpointService, ShortnameService } from 'data-layer/single-container/index';
import { TestAuthInterceptor } from 'data-layer/single-container/v2/util/interceptor.mock';
import { ExampleService } from './example.service';

@NgModule({
  imports: [ BrowserModule, HttpClientModule ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TestAuthInterceptor, multi: true },
    {
      provide: ShortnameService,
      useFactory: () => new ShortnameService('w200ccss')
    },
    EndpointService,
    SingleContainerConfigurationService,
    InstanceMonitorService,
    SingleContainerFactoryService,
    ExampleService
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}
