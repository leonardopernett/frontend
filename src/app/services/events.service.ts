import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllowedLines } from '../api/user-api.service';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    public newSearchSource: BehaviorSubject<string> = new BehaviorSubject('');
    public newQuerySource: BehaviorSubject<string> = new BehaviorSubject('');
    public newSelectedLineSource: BehaviorSubject<{ line: AllowedLines[0], subLine: AllowedLines[0]['sublines'][0] }> = new BehaviorSubject({ line: null, subLine: null });
    public onNewSearch$ = this.newSearchSource.asObservable();
    public onNewQuery$ = this.newQuerySource.asObservable();
    public onNewSelectedLine$ = this.newSelectedLineSource.asObservable();

    constructor() { }

    newSearch(input: string): void {
        this.newSearchSource.next(input);
    }
    newQuery(input: string): void {
        this.newQuerySource.next(input);
    }
    newSelectedLine(newLine: { line: AllowedLines[0], subLine: AllowedLines[0]['sublines'][0] }): void {
        this.newSelectedLineSource.next(newLine)
    }
}