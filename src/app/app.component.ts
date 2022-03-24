import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, delay, filter, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { dictionary } from './dictionary/polish/words';
import { filterContainsLetters, filterDistincLetters, filterLetterAtPosition, filterLetterNotAtPosition, filterNotLetters } from './literalnie'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  regexAlpha = new RegExp(/^[a-z\u0104-\u0107\u0141-\u0144\u015a\u015b\u0179-\u017c\u0118\u0119\u00d3\u00f3]+$/);
  regexPair = new RegExp(/^([a-z\u0104-\u0107\u0141-\u0144\u015a\u015b\u0179-\u017c\u0118\u0119\u00d3\u00f3][1-5])+$/);

  containsLetters = new FormControl('', Validators.pattern(this.regexAlpha));
  doesNotContainLetters = new FormControl('', Validators.pattern(this.regexAlpha));
  lettersAtPosition = new FormControl('', Validators.pattern(this.regexPair));
  lettersNotAtPosition = new FormControl('', Validators.pattern(this.regexPair));
  distinctLetters = new FormControl(true);
  wordCount = new FormControl('0');
  words = new FormControl('');

  result$: Observable<boolean> = combineLatest([
    this.containsLetters.valueChanges.pipe(startWith(''), filter(item => item === '' ? true : this.regexAlpha.test(item))),
    this.doesNotContainLetters.valueChanges.pipe(startWith(''), filter(item => item === '' ? true : this.regexAlpha.test(item))),
    this.lettersAtPosition.valueChanges.pipe(startWith(''), filter(item => item.length % 2 === 0), filter(item => item === '' ? true : this.regexPair.test(item))),
    this.lettersNotAtPosition.valueChanges.pipe(startWith(''), filter(item => item.length % 2 === 0), filter(item => item === '' ? true : this.regexPair.test(item))),
    this.distinctLetters.valueChanges.pipe(startWith(true))
  ]).pipe(
    tap(_ => this.loading.next(true)),
    switchMap(([containsSearch, doesNotContainLettersSearch, lettersAtPositionSearch, lettersNotAtPositionSearch, distinctLettersSearch]) => {
      return dictionary().pipe(
        delay(300),
        filterContainsLetters(containsSearch),
        filterNotLetters(doesNotContainLettersSearch),
        filterLetterAtPosition(lettersAtPositionSearch),
        filterLetterNotAtPosition(lettersNotAtPositionSearch),
        filterDistincLetters(distinctLettersSearch),
        tap(words => { 
          this.wordCount.setValue(words.length);
          this.words.setValue(words.slice(0,10));
        }),
        map(_ => true ),
        tap(_ => this.loading.next(false))
        );
    }),
    finalize(() => this.loading.next(false))
  );

  private loading = new BehaviorSubject(false);
  loading$ = this.loading.asObservable()

}
