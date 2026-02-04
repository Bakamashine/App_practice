export default class Api {
  protected CheckStatus(status: number): boolean {
    return status <= 400;
  }
}
