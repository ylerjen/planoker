import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneratorService } from '../../services/generator/generator.service';
import { UserGeneratorResponse } from '../../models/UserGeneratorResponse';

@Component({
  selector: 'app-create-session-form',
  templateUrl: './create-session-form.component.html',
  styleUrls: ['./create-session-form.component.scss']
})
export class CreateSessionFormComponent implements OnInit {
  @Output() public createSessionEvent = new EventEmitter<string>();

  @Input() public isLoading: boolean;

  public createSessionForm: FormGroup;

  public isGeneratingUsername: boolean;

  public formProp = {
    username: {
      maxLength: 30
    }
  };

  constructor(
    private _fb: FormBuilder,
    private _genSrvc: GeneratorService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.createSessionForm = this._fb.group({
      sessionId: ['', Validators.required],
      username: ['', Validators.required]
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
    this.createSessionForm
      .get('sessionId')
      .setValue(this._genSrvc.genSessionId());
  }

  setRandomUsername() {
    this.isGeneratingUsername = true;
    this._genSrvc.genUsername().subscribe(
      (resp: UserGeneratorResponse) => {
        const username = resp.login.username;
        this.createSessionForm.get('username').setValue(username);
      },
      err => alert('Can t generate a username'),
      () => (this.isGeneratingUsername = false)
    );
  }
}
