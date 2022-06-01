import { Controller } from "@hotwired/stimulus"
import "form-request-submit-polyfill"

export default class SearchController extends Controller {
  static targets = ["form", "input", "results"]
  formTarget: HTMLFormElement
  inputTarget: HTMLInputElement
  resultsTarget: HTMLElement

  submit(): void {
    this.debounce(this.basicSubmit.bind(this))()
  }

  resetOnOutsideClick(event: Event): void {
    if (!this.element.contains(event.target as HTMLElement)) {
      this.reset()
    }
  }

  private

  debounce(functionToDebounce: (...args: any[]) => any, wait = 300) {
    let timeOutId = null

    return (...args: any[]) => {
      clearTimeout(timeOutId)
      timeOutId = setTimeout(() => {
        timeOutId = null
        functionToDebounce(...args)
      }, wait)
    }
  }

  basicSubmit(): void {
    if (this.inputTarget.value === "") {
      this.reset()
    } else {
      this.formTarget.requestSubmit()
    }
  }

  reset(): void {
    this.resultsTarget.classList.add("hidden")
    this.resultsTarget.innerText = ""
    this.inputTarget.value = ""
  }
}
