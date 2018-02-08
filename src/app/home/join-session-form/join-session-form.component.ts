import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneratorService } from '../../services/generator/generator.service';
import { UserGeneratorResponse } from '../../models/UserGeneratorResponse';

@Component({
  selector: 'app-join-session-form',
  templateUrl: './join-session-form.component.html',
  styleUrls: ['./join-session-form.component.scss']
})
export class JoinSessionFormComponent implements OnInit {

  @Output()
  public joinSessionEvent = new EventEmitter<string>();

  public isLoading: boolean;
  public isGeneratingUsername: boolean;

  public joiningForm: FormGroup;

  public formProp = {
    username: {
      maxLength: 30
    }
  };

  constructor(
    private _fb: FormBuilder,
    private _genSrvc: GeneratorService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.joiningForm = this._fb.group({
      sessionId: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, Validators.maxLength(this.formProp.username.maxLength)])]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.joiningForm.valid) {
      this.joinSessionEvent.emit(this.joiningForm.value);
    }
  }

  setRandomUsername() {
    this.isGeneratingUsername = true;
    this._genSrvc.genUsername().
      subscribe(
        (resp: UserGeneratorResponse) => {
          const username = resp.login.username;
          this.joiningForm.get('username').setValue(username);
        },
        (err) => alert('Can t generate a username'),
        () => this.isGeneratingUsername = false
      );
  }
}
