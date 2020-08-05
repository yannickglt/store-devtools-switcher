import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppComponent } from './app.component'
import { HelloComponent } from './hello.component'
import { StoreModule } from '@ngrx/store'
import { reducer } from './scoreboard/scoreboard.reducer'
import { initialState } from './scoreboard/scoreboard.state'
import { stateSanitizer } from 'store-devtools-switcher'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('scoreboard1', reducer, { initialState }),
    StoreModule.forFeature('scoreboard2', reducer, { initialState }),
    StoreModule.forFeature('scoreboard3', reducer, { initialState }),
    StoreDevtoolsModule.instrument({ stateSanitizer })
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
