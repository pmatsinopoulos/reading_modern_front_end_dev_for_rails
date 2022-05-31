import { Controller } from "@hotwired/stimulus"
import "form-request-submit-polyfill"

export default class SearchController extends Controller {
  static targets = ["form", "input"]
  formTarget: HTMLFormElement
  inputTarget: HTMLInputElement

  submit(): void {
    this.formTarget.requestSubmit()
  }
}
