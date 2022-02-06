import { Observable } from 'rxjs';

function filterAtPosition(letter: string, position: number) {
  return function(source: Observable<string[]>): Observable<string[]> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(value) {
          const result = value.filter(element => element.toLowerCase().charAt(position) === letter.toLowerCase())
          subscriber.next(result);
          },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });
      return () => subscription.unsubscribe();
    });
  }
}

function filterNotAtPosition(letter: string, position: number) {
  return function(source: Observable<string[]>): Observable<string[]> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(value) {
          const result: string[] = value.filter(element => !(element.toLowerCase().charAt(position) === letter.toLowerCase()))
          subscriber.next(result);
          },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });
      return () => subscription.unsubscribe();
    });
  }
}

function filterHasLetter(letter: string) {
  return function(source: Observable<string[]>): Observable<string[]> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(value) {
          const result = value.filter(element => element.toLowerCase().includes(letter.toLowerCase()))
          subscriber.next(result);
          },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });
      return () => subscription.unsubscribe();
    });
  }
}

function filterNotLetter(letter: string) {
  return function(source: Observable<string[]>): Observable<string[]> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(value) {
          const result = value.filter(element => !element.toLowerCase().includes(letter.toLowerCase()))
          subscriber.next(result);
          },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });
      return () => subscription.unsubscribe();
    });
  }
}

export function filterNotLetters(search: string): (source: Observable<string[]>) => Observable<string[]> {
  return (source) => {
    if (search) {
      search.split('').forEach(element => {
        source = source.pipe(filterNotLetter(element))
      });
    }
    return source
  }
}

export function filterContainsLetters(search: string): (source: Observable<string[]>) => Observable<string[]> {
  return (source) => {
    if (search) {
      search.split('').forEach(element => {
        source = source.pipe(filterHasLetter(element))
      });
    }
    return source
  }
}

export function filterLetterAtPosition(search: string): (source: Observable<string[]>) => Observable<string[]> {
  return (source) => {
    if (search) {
      search.split((/(.{2})/)).filter(x => x.length == 2).forEach(element => {
        source = source.pipe(filterAtPosition(element[0],(+element[1]-1)))
      });
    }
    return source
  }
}

export function filterLetterNotAtPosition(search: string): (source: Observable<string[]>) => Observable<string[]> {
  return (source) => {

    if (search) {
      search.split((/(.{2})/)).filter(x => x.length == 2).forEach(element => {
        source = source.pipe(filterNotAtPosition(element[0],(+element[1]-1)))
      });
    }
    return source
  }
} 

export function filterDistincLetters(distinct: boolean): (source: Observable<string[]>) => Observable<string[]> {
  return function(source: Observable<string[]>): Observable<string[]> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(value) {
          let result = value;
          if (distinct) {
            result = value.filter(element => (new Set(element.slice())).size === element.length )
          } 
          subscriber.next(result);
          },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });
      return () => subscription.unsubscribe();
    });
  }
}