import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="favorite-toggle"
export default class FavoriteToggleController extends Controller {
  static targets = ["elementToHide", "hideButton"]
  elementToHideTarget: HTMLElement
  hideButtonTarget: HTMLElement

  static values = { visible: Boolean }
  visibleValue: boolean;

  static classes = ["hidden"]
  hiddenClass: string

  toggle(): void {
    this.visibleValue = !this.visibleValue;
  }
  visibleValueChanged(): void {
    this.elementToHideTarget.classList.toggle(this.hiddenClass, !this.visibleValue);
    this.hideButtonTarget.textContent = this.visibleValue ? 'Hide' : 'Show';
  }
}
