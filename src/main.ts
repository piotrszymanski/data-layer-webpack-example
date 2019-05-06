import 'rxjs/Rx';
import 'zone.js';
import 'core-js/es7/reflect';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { ExampleService } from './example.service';

platformBrowserDynamic().bootstrapModule(AppModule).then(function(ng2ModuleInjector){
  console.log(ng2ModuleInjector);

  const exampleService = ng2ModuleInjector.injector.get(ExampleService);
  exampleService.run();
});
