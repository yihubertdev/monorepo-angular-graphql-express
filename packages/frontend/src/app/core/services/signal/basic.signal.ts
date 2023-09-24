import { Signal, computed, signal } from "@angular/core";

export class SignalsSimpleStoreService<T> {
  readonly state = signal({} as T);

  constructor() {}

  /**
   * Returns a reactive value for a property on the state.
   * This is used when the consumer needs the signal for
   * specific part of the state.
   *
   * @param {K} key the key of the property to be retrieved
   * @returns {Signal<T[K]>} select signal
   */
  public select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key]);
  }

  /**
   * This is used to set a new value for a property
   *
   * @param {K} key the key of the property to be retrieved
   * @param {T[K]} data the key of the property to be retrieved
   * @returns {void} select signal
   */
  public set<K extends keyof T>(key: K, data: T[K]): void {
    this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  /**
   * Sets values for multiple properties on the store
   * This is used when there is a need to update multiple
   * properties in the store
   *
   * @param {Partial<T>} partialState the partial state that include the new value to be saved
   * @returns {void} select signal
   */
  public setState(partialState: T): void {
    this.state.set(partialState);
  }
}
