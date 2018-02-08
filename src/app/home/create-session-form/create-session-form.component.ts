import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneratorService } from '../../services/generator/generator.service';

@Component({
  selector: 'app-create-session-form',
  templateUrl: './create-session-form.component.html',
  styleUrls: ['./create-session-form.component.scss']
})
export class CreateSessionFormComponent implements OnInit {

  @Output()
  public createSessionEvent = new EventEmitter<string>();

  @Input()
  public isLoading: boolean;

  public createSessionForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _genSrvc: GeneratorService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.createSessionForm = this._fb.group({
      sessionId: ['', Validators.required],
      nbPlayers: ['2', Validators.required]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.createSessionForm.valid) {
      this.createSessionEvent.emit(this.createSessionForm.value);
    }
  }

  onClickGenerateId(event: Event) {
    event.preventDefault();
    this.setRandomId();
  }

  setRandomId() {
    this.createSessionForm.get('sessionId').setValue(this._genSrvc.genSessionId());
  }

}
