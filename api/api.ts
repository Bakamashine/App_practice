export default class Api {
  protected CheckStatus(status: number): boolean {
    return status <= 400;
  }

  protected LogResponse(description: string, response: any): void {
    console.log(`${description} response: `, response);
    console.log(`${description}: `, response?.data)
  }
}
