Store Devtools Switcher
==============

Enable/disable store entries to display in Redux DevTools on the fly from the Chrome DevTools console.

![2020-08-05_17-41-55 (1)](https://user-images.githubusercontent.com/1006426/89434006-4fcf7c80-d743-11ea-94eb-56057fcd2f93.gif)

# Install
```shell
npm install --save-dev store-devtools-switcher 
```

# Usage
Just import and use the provided state sanitizer as parameter of the StoreDevtools instrument.
````ts
import { stateSanitizer } from 'store-devtools-switcher'

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      stateSanitizer
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
````

## With a custom sanitizer
If you already uses a custom sanitizer, just wrap it with the store-devtools-switcher one.
````ts
import { stateSanitizer as switcherSanitizer } from 'store-devtools-switcher'

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      stateSanitizer: switcherSanitizer(myCustomSanitizer)
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
````

## Try it out
Checkout the example from [Github](https://github.com/yannickglt/store-devtools-switcher/tree/example) or watch it on [Stackblitz](https://stackblitz.com/github/yannickglt/store-devtools-switcher/tree/example).