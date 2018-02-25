import { UserGeneratorResponse } from "../../models/UserGeneratorResponse";
import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { GeneratorService } from "../../services/generator/generator.service";
import { JoinSessionCommand } from "../../models/FirebaseCommand";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IGlobalState } from "../../stores/app.state";
import { initSessionStore } from "../../actions/session.action";

@Component({
  selector: "app-user-join",
  templateUrl: "./user-join.component.html",
  styleUrls: ["./user-join.component.scss"]
})
export class UserJoinComponent implements OnInit {
  public compId: string;

  public sessionId: string;

  public userJoinForm: FormGroup;

  public isGeneratingUsername: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _genSrvc: GeneratorService,
    private _store: Store<IGlobalState>
  ) {}

  ngOnInit() {
    this.compId = this._genSrvc.genUUID();
    this._route.params.subscribe(
      (routeData: Params) => (this.sessionId = routeData.sid)
    );
    this.createForm();
  }

  createForm() {
    this.userJoinForm = this._fb.group({
      username: ['', Validators.required]
    });
  }

  setRandomUsername(evt: Event) {
    evt.preventDefault();
    this.isGeneratingUsername = true;
    this._genSrvc.genUsername().subscribe(
      (resp: UserGeneratorResponse) => {
        const username = resp.login.username;
        this.userJoinForm.get('username').setValue(username);
      },
      err => alert('Can t generate a username'),
      () => (this.isGeneratingUsername = false)
    );
  }

  onSubmit(evt: Event) {
    evt.preventDefault();

    const sessionState: JoinSessionCommand = {
      sessionId: this.sessionId,
      username: this.userJoinForm.value.username
    };
    this._store.dispatch(initSessionStore(sessionState.sessionId)); // FIXME this should be a joinSessionAction
    this._router.navigate([
      `/session/${sessionState.sessionId}/user/${sessionState.username}`
    ]);
  }
}
