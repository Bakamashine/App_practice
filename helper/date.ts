class ParseDate {
  static DefaultParse(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}

export default ParseDate