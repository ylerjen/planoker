import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  public joinSessionForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _genSrvc: GeneratorService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.joinSessionForm = this._fb.group({
      text: ['', Validators.required],
      username: ['', Validators.maxLength(12)]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.joinSessionForm.valid) {
      this.joinSessionEvent.emit();
    }
  }

  setRandomUsername() {
    this._genSrvc.genUsername().
      subscribe(
        (resp: UserGeneratorResponse) => this.joinSessionForm.controls.username.setValue(resp.login.username),
        (err) => alert('Can t generate a username')
      );
  }
}
