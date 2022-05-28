import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="css"
export default class CssController extends Controller {
  static targets = ["elementToChange"]
  elementToChangeTarget: HTMLElement

  static values = {
    status: Boolean,
  }
  statusValue: boolean

  static classes = ["css"]
  cssClasses: string[]

  statusValueChanged(): void {
    this.updateCssClass()
  }

  toggle() {
    this.flipState();
  }

  private

  flipState(): void {
    this.statusValue = !this.statusValue;
  }

  updateCssClass(): void {
    for (const oneCssClass of this.cssClasses) {
      this.elementToChangeTarget.classList.toggle(oneCssClass, this.statusValue)
    }
  }
}
