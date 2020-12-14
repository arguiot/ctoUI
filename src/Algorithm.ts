/**
 * The cipher algorithm, defined as 1 or 2 simple methods.
 */
export interface Algorithm {
  /**
   * Bindings for the views, as defined in the Configuration
   */
  bindings: any;
  /**
   * Encode method that should set the output like:
   * ```js
   * this.bindings.output.value = "whatever"
   * ```
   */
  encode(): void;
  /**
   * Decode method that should set the input like:
   * ```js
   * this.bindings.input.value = "whatever"
   * ```
   */
  decode?(): void;
}
